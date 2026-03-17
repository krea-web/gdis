const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const N8N_BASE_URL = "https://n8n.kreareweb.com/webhook/gdis";
const allowedEndpoints = new Set(["check-availability", "create-booking", "sign"]);

type ProxyBody = {
  endpoint?: string;
  data?: unknown;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { endpoint, data }: ProxyBody = await req.json();

    if (!endpoint || !allowedEndpoints.has(endpoint)) {
      return new Response(JSON.stringify({ error: "Invalid endpoint" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const n8nResponse = await fetch(`${N8N_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data ?? {}),
    });

    const responseText = await n8nResponse.text();

    // If n8n returns an empty body, wrap it as valid JSON so the Supabase
    // client doesn't choke trying to parse an empty string.
    const body = responseText.trim() === "" ? JSON.stringify({ ok: true }) : responseText;
    const contentType = responseText.trim() === "" ? "application/json" : (n8nResponse.headers.get("content-type") ?? "application/json");

    return new Response(body, {
      status: n8nResponse.status,
      headers: {
        ...corsHeaders,
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    console.error("n8n-proxy error", error);
    return new Response(JSON.stringify({ error: "Proxy request failed" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
