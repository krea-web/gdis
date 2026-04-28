const SUPABASE_BASE = "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1";

const stripBase = (url: string): string => {
  return url
    .replace(`${SUPABASE_BASE}/object/public/`, "")
    .replace(`${SUPABASE_BASE}/render/image/public/`, "");
};

export const supabaseImg = (
  pathOrUrl: string,
  opts: { width?: number; height?: number; quality?: number; resize?: "cover" | "contain" | "fill"; raw?: boolean } = {},
): string => {
  const path = pathOrUrl.startsWith("http") ? stripBase(pathOrUrl) : pathOrUrl.replace(/^\//, "");
  if (opts.raw) return `${SUPABASE_BASE}/object/public/${path}`;
  const params = new URLSearchParams();
  if (opts.width) params.set("width", String(opts.width));
  if (opts.height) params.set("height", String(opts.height));
  if (opts.quality) params.set("quality", String(opts.quality));
  if (opts.resize) params.set("resize", opts.resize);

  const qs = params.toString();
  if (!qs) return `${SUPABASE_BASE}/object/public/${path}`;
  return `${SUPABASE_BASE}/render/image/public/${path}?${qs}`;
};

export const SUPABASE_OBJECT = `${SUPABASE_BASE}/object/public`;
