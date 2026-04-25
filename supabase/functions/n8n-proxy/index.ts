// ─────────────────────────────────────────────────────────────
//  GDIS Rent — n8n-proxy edge function (hardened Apr 2026)
//
//  Responsibilities:
//   • lock CORS to the production domain(s)
//   • verify Cloudflare Turnstile token (anti-bot)
//   • rate-limit per-IP (basic in-memory ring, 5 submissions / 10 min)
//   • for `create-booking`:
//       - fetch the vehicle with service_role
//       - recompute total_price server-side (prevents client tampering)
//       - INSERT the booking with service_role (bypasses RLS)
//       - generate short-lived signed URLs for license paths
//       - forward the enriched payload to n8n
//       - return { id, total_price } to the client
//   • for `check-availability` / `sign`: simple proxy
// ─────────────────────────────────────────────────────────────

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const ALLOWED_ORIGINS = [
  "https://gdisrentservice.com",
  "https://www.gdisrentservice.com",
  // Vercel preview deploys — match the project subdomain pattern
  // Uncomment and adjust if using previews:
  // "https://gdis-*.vercel.app",
];

const N8N_BASE_URL = "https://n8n.kreareweb.com/webhook/gdis";
const ALLOWED_ENDPOINTS = new Set(["check-availability", "create-booking", "sign"]);

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY") ?? "";

type ProxyBody = {
  endpoint?: string;
  data?: Record<string, unknown>;
  turnstileToken?: string;
};

// ── CORS helpers ───────────────────────────────────────────────
function buildCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed = origin && (
    ALLOWED_ORIGINS.includes(origin) ||
    // allow localhost for dev
    /^https?:\/\/localhost(:\d+)?$/.test(origin) ||
    /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)
  );
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin! : "null",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

// ── Rate limit (per-IP, in-memory) ─────────────────────────────
const rateBuckets = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_HITS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = rateBuckets.get(ip)?.filter((t) => now - t < RATE_WINDOW_MS) ?? [];
  if (window.length >= RATE_MAX_HITS) {
    rateBuckets.set(ip, window);
    return true;
  }
  window.push(now);
  rateBuckets.set(ip, window);
  return false;
}

// ── Turnstile verification ─────────────────────────────────────
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) return true; // not configured yet (dev mode)
  try {
    const form = new URLSearchParams();
    form.append("secret", TURNSTILE_SECRET_KEY);
    form.append("response", token);
    form.append("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });
    const json = await res.json();
    return !!json.success;
  } catch {
    return false;
  }
}

// ── Monthly rate helper (server-side mirror of getMonthlyRate) ──
function getMonthlyRate(vehicle: Record<string, unknown>, month: number): number {
  const map: Record<number, number | null> = {
    3: vehicle.rate_april as number | null,
    4: vehicle.rate_may as number | null,
    5: vehicle.rate_june as number | null,
    6: vehicle.rate_july as number | null,
    7: vehicle.rate_august as number | null,
    8: vehicle.rate_september as number | null,
    9: vehicle.rate_october as number | null,
  };
  return map[month] ?? (vehicle.daily_rate as number | null) ?? 0;
}

// ── Handler ────────────────────────────────────────────────────
Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = buildCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown";

  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  let body: ProxyBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const { endpoint, data, turnstileToken } = body;

  if (!endpoint || !ALLOWED_ENDPOINTS.has(endpoint)) {
    return new Response(JSON.stringify({ error: "Invalid endpoint" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  // Anti-bot: only enforce on booking-creating endpoints
  if (endpoint === "create-booking") {
    if (!turnstileToken || !(await verifyTurnstile(turnstileToken, ip))) {
      return new Response(JSON.stringify({ error: "Captcha verification failed" }), {
        status: 403,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }
  }

  // ─── create-booking: authoritative server-side pricing + insert ───
  if (endpoint === "create-booking") {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(JSON.stringify({ error: "Server misconfigured" }), {
        status: 500,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const payload = data ?? {};
    const vehicleId = payload.vehicle_id as string | undefined;
    const startDateStr = payload.start_date as string | undefined;
    const endDateStr = payload.end_date as string | undefined;
    const email = payload.email as string | undefined;
    const phone = payload.phone as string | undefined;

    if (!vehicleId || !startDateStr || !endDateStr) {
      return new Response(JSON.stringify({ error: "Missing booking fields" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // Sanity-check contact info (client already validates — second line of defense)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+?39)?\s*[\d\s-]{8,16}$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Email non valida" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }
    if (!phone || !phoneRegex.test(phone)) {
      return new Response(JSON.stringify({ error: "Telefono non valido" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // Fetch vehicle authoritatively
    const { data: vehicle, error: vErr } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", vehicleId)
      .eq("available", true)
      .single();

    if (vErr || !vehicle) {
      return new Response(JSON.stringify({ error: "Vehicle not available" }), {
        status: 404,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    if (!(end > start)) {
      return new Response(JSON.stringify({ error: "Invalid date range" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const ratePerDay = getMonthlyRate(vehicle, start.getMonth());
    const totalPrice = Math.round(ratePerDay * days * 100) / 100;

    // Build insert payload: whitelist fields, force our computed total_price
    const insertRow = {
      vehicle_id: vehicleId,
      start_date: startDateStr,
      end_date: endDateStr,
      total_price: totalPrice,
      email: payload.email ?? null,
      phone: payload.phone ?? null,
      tax_code: payload.tax_code ?? null,
      customer_name: payload.customer_name ?? null,
      customer_surname: payload.customer_surname ?? null,
      license_front_url: payload.license_front_path ?? null,
      license_back_url: payload.license_back_path ?? null,
      has_second_driver: !!payload.has_second_driver,
      pickup_location: payload.pickup_location ?? null,
      pickup_time: payload.pickup_time ?? null,
      dropoff_location: payload.dropoff_location ?? null,
      dropoff_time: payload.dropoff_time ?? null,
      second_driver_email: payload.second_driver_email ?? null,
      second_driver_phone: payload.second_driver_phone ?? null,
      second_driver_cf: payload.second_driver_cf ?? null,
      second_driver_license_front_url: payload.second_driver_license_front_path ?? null,
      second_driver_license_back_url: payload.second_driver_license_back_path ?? null,
      status: "pending_signature",
    };

    const { data: inserted, error: iErr } = await supabase
      .from("bookings")
      .insert(insertRow)
      .select("id,total_price")
      .single();

    if (iErr || !inserted) {
      return new Response(JSON.stringify({ error: "Booking insert failed" }), {
        status: 500,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // Generate 24h signed URLs for the license photos so n8n can fetch them
    async function sign(path: string | null) {
      if (!path) return null;
      const { data: signed } = await supabase.storage
        .from("licenses")
        .createSignedUrl(path, 60 * 60 * 24);
      return signed?.signedUrl ?? null;
    }
    const licenseFrontSigned = await sign(insertRow.license_front_url);
    const licenseBackSigned = await sign(insertRow.license_back_url);
    const secondLicenseFrontSigned = await sign(insertRow.second_driver_license_front_url);
    const secondLicenseBackSigned = await sign(insertRow.second_driver_license_back_url);

    // Forward to n8n (fire-and-forget pattern, but awaited so client knows status)
    try {
      await fetch(`${N8N_BASE_URL}/create-booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...insertRow,
          id: inserted.id,
          total_price: inserted.total_price,
          license_front_signed_url: licenseFrontSigned,
          license_back_signed_url: licenseBackSigned,
          second_driver_license_front_signed_url: secondLicenseFrontSigned,
          second_driver_license_back_signed_url: secondLicenseBackSigned,
        }),
      });
    } catch (err) {
      // n8n failure should not block the booking (signature will follow)
      console.error("n8n forward failed", err);
    }

    return new Response(
      JSON.stringify({ id: inserted.id, total_price: inserted.total_price }),
      { status: 200, headers: { ...cors, "Content-Type": "application/json" } },
    );
  }

  // ─── check-availability / sign: proxy transparently ───
  try {
    const n8nResponse = await fetch(`${N8N_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data ?? {}),
    });
    const responseText = await n8nResponse.text();
    const responseBody =
      responseText.trim() === "" ? JSON.stringify({ ok: true }) : responseText;
    const contentType =
      responseText.trim() === ""
        ? "application/json"
        : (n8nResponse.headers.get("content-type") ?? "application/json");
    return new Response(responseBody, {
      status: n8nResponse.status,
      headers: { ...cors, "Content-Type": contentType },
    });
  } catch (error) {
    console.error("n8n-proxy error", error);
    return new Response(JSON.stringify({ error: "Proxy request failed" }), {
      status: 502,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
