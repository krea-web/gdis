const SUPABASE_BASE = "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1";

/**
 * Supabase Image Transformations (`render/image/public/...?width=...`) is a
 * paid feature not enabled on this project. Calls return 403 FeatureNotEnabled.
 * Until the plan is upgraded, every image is served as the raw stored object
 * (`object/public/...`). The width/height/quality/resize options accepted by
 * supabaseImg / supabaseSrcset are silently ignored — the helpers keep their
 * shape so callers don't need to change, and srcset uses the same source URL
 * for every width entry (browser picks one, sizes hint is preserved).
 *
 * When the Pro plan is enabled, flip RENDER_TRANSFORMATIONS_ENABLED to true
 * and the original transformation behaviour returns automatically.
 */
const RENDER_TRANSFORMATIONS_ENABLED = false;

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
  if (opts.raw || !RENDER_TRANSFORMATIONS_ENABLED) return `${SUPABASE_BASE}/object/public/${path}`;
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

const DEFAULT_WIDTHS = [480, 768, 1280, 1920];

export type SrcsetOptions = {
  widths?: number[];
  quality?: number;
  resize?: "cover" | "contain" | "fill";
};

/** Build a width-based srcset string for Supabase Render API images. */
export const supabaseSrcset = (
  pathOrUrl: string,
  opts: SrcsetOptions = {},
): string => {
  const widths = opts.widths ?? DEFAULT_WIDTHS;
  return widths
    .map(
      (w) =>
        `${supabaseImg(pathOrUrl, {
          width: w,
          quality: opts.quality ?? 75,
          resize: opts.resize ?? "cover",
        })} ${w}w`,
    )
    .join(", ");
};

/** Convenience: returns { src, srcset, sizes } for an <img> with default presets. */
export const supabaseImgSet = (
  pathOrUrl: string,
  opts: SrcsetOptions & { sizes?: string; baseWidth?: number } = {},
) => {
  const baseWidth = opts.baseWidth ?? 1280;
  return {
    src: supabaseImg(pathOrUrl, {
      width: baseWidth,
      quality: opts.quality ?? 75,
      resize: opts.resize ?? "cover",
    }),
    srcset: supabaseSrcset(pathOrUrl, opts),
    sizes: opts.sizes ?? "(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1280px",
  };
};
