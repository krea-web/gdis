// Generate GDIS Rent brand assets: og-image, og-image-square, favicons.
// Usage: node scripts/generate-brand-assets.mjs
// Output: ./generated-assets/

import { writeFile, mkdir, readFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "generated-assets");
const CACHE = join(__dirname, ".cache");

const SUPABASE = "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public";
const URLS = {
  bgPortoCervo: `${SUPABASE}/locations/porto-cervo/gdisrent-noleggio-porto-cervo.webp`,
  logo: `${SUPABASE}/asset/GDISlogo.webp`,
  faviconSvg: `${SUPABASE}/asset/gdis-favicon.svg`,
  car: `${SUPABASE}/vehicles/gdis-fiatpandacitycar.png`,
};

// Inter static TTF fonts (variable Inter has fvar parse issues with opentype.js)
const FONTS = {
  interRegular: "https://cdn.jsdelivr.net/npm/@expo-google-fonts/inter@0.2.3/Inter_400Regular.ttf",
  interSemiBold: "https://cdn.jsdelivr.net/npm/@expo-google-fonts/inter@0.2.3/Inter_600SemiBold.ttf",
  interExtraBold: "https://cdn.jsdelivr.net/npm/@expo-google-fonts/inter@0.2.3/Inter_800ExtraBold.ttf",
};

const PRIMARY = "#1a4dff"; // hsl(225 100% 55%)
const DARK_BG = "#0a0e1a"; // hsl(225 30% 6%)

async function fetchToBuffer(url, cacheKey) {
  const cachePath = join(CACHE, cacheKey);
  try {
    await access(cachePath);
    return await readFile(cachePath);
  } catch {
    /* not cached */
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(cachePath, buf);
  return buf;
}

async function toDataUri(buf, mime = "image/jpeg") {
  return `data:${mime};base64,${buf.toString("base64")}`;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  await mkdir(CACHE, { recursive: true });

  console.log("⬇ Downloading source images and fonts...");
  const [bgRaw, logoRaw, carRaw, faviconSvg, fontReg, fontSemi, fontBold] = await Promise.all([
    fetchToBuffer(URLS.bgPortoCervo, "bg.webp"),
    fetchToBuffer(URLS.logo, "logo.webp"),
    fetchToBuffer(URLS.car, "car.png"),
    fetchToBuffer(URLS.faviconSvg, "favicon.svg"),
    fetchToBuffer(FONTS.interRegular, "inter-400.ttf"),
    fetchToBuffer(FONTS.interSemiBold, "inter-600.ttf"),
    fetchToBuffer(FONTS.interExtraBold, "inter-800.ttf"),
  ]);

  // Convert background webp -> jpeg buffer for satori (satori does not read webp)
  const bgJpegBuf = await sharp(bgRaw).jpeg({ quality: 85 }).toBuffer();
  const bgUri = await toDataUri(bgJpegBuf, "image/jpeg");

  // Logo & car: webp/png -> png buffer (preserve alpha)
  const logoPngBuf = await sharp(logoRaw).png().toBuffer();
  const carPngBuf = await sharp(carRaw).png().toBuffer();
  const logoUri = await toDataUri(logoPngBuf, "image/png");
  const carUri = await toDataUri(carPngBuf, "image/png");

  const fontConfig = [
    { name: "Inter", data: fontReg, weight: 400, style: "normal" },
    { name: "Inter", data: fontSemi, weight: 600, style: "normal" },
    { name: "Inter", data: fontBold, weight: 800, style: "normal" },
  ];

  // ============================================================
  // OG IMAGE — 1200×630
  // ============================================================
  console.log("🎨 Rendering og-image (1200×630)...");
  const ogJsx = {
    type: "div",
    props: {
      style: {
        width: 1200,
        height: 630,
        display: "flex",
        position: "relative",
        backgroundColor: DARK_BG,
        fontFamily: "Inter",
      },
      children: [
        // Background image
        {
          type: "img",
          props: {
            src: bgUri,
            width: 1200,
            height: 630,
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: 1200,
              height: 630,
              objectFit: "cover",
            },
          },
        },
        // Dark gradient overlay
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: 1200,
              height: 630,
              background:
                "linear-gradient(90deg, rgba(10,14,26,0.92) 0%, rgba(10,14,26,0.75) 55%, rgba(10,14,26,0.4) 100%)",
              display: "flex",
            },
          },
        },
        // Blue radial accent
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: -200,
              left: -150,
              width: 700,
              height: 700,
              borderRadius: 9999,
              background: `radial-gradient(circle, ${PRIMARY}55 0%, transparent 70%)`,
              display: "flex",
            },
          },
        },
        // Car on the right (aspect 1190x533 → height = 700 * 533/1190 = 313)
        {
          type: "img",
          props: {
            src: carUri,
            width: 700,
            height: 313,
            style: {
              position: "absolute",
              right: -60,
              bottom: 110,
              width: 700,
              height: 313,
              objectFit: "contain",
              filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.6))",
            },
          },
        },
        // Content stack
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: 70,
              left: 70,
              right: 480,
              bottom: 70,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            },
            children: [
              // Logo top (aspect 800x345 → 180*345/800 ≈ 78)
              {
                type: "img",
                props: {
                  src: logoUri,
                  width: 180,
                  height: 78,
                  style: { width: 180, height: 78, objectFit: "contain" },
                },
              },
              // Headline + subtitle
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column", gap: 18 },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          color: PRIMARY,
                          fontSize: 22,
                          fontWeight: 600,
                          letterSpacing: 4,
                          textTransform: "uppercase",
                          display: "flex",
                        },
                        children: "GDIS Rent · Olbia",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: "white",
                          fontSize: 64,
                          fontWeight: 800,
                          lineHeight: 1.05,
                          letterSpacing: -1.5,
                          display: "flex",
                          flexDirection: "column",
                        },
                        children: [
                          { type: "span", props: { children: "Noleggio Auto Olbia" } },
                          {
                            type: "span",
                            props: { style: { color: PRIMARY }, children: "& Costa Smeralda" },
                          },
                        ],
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: "rgba(255,255,255,0.78)",
                          fontSize: 26,
                          fontWeight: 400,
                          display: "flex",
                        },
                        children: "Consegna a domicilio in Costa Smeralda",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };

  const ogSvg = await satori(ogJsx, { width: 1200, height: 630, fonts: fontConfig });
  const ogPng = new Resvg(ogSvg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  await writeFile(join(OUT, "og-image.jpg"), await sharp(ogPng).jpeg({ quality: 88 }).toBuffer());
  console.log("✓ og-image.jpg");

  // ============================================================
  // OG SQUARE — 1080×1080
  // ============================================================
  console.log("🎨 Rendering og-image-square (1080×1080)...");
  const sqJsx = {
    type: "div",
    props: {
      style: {
        width: 1080,
        height: 1080,
        display: "flex",
        position: "relative",
        backgroundColor: DARK_BG,
        fontFamily: "Inter",
      },
      children: [
        {
          type: "img",
          props: {
            src: bgUri,
            width: 1080,
            height: 1080,
            style: { position: "absolute", top: 0, left: 0, width: 1080, height: 1080, objectFit: "cover" },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: 1080,
              height: 1080,
              background:
                "linear-gradient(180deg, rgba(10,14,26,0.85) 0%, rgba(10,14,26,0.55) 45%, rgba(10,14,26,0.95) 100%)",
              display: "flex",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: -150,
              left: -150,
              width: 700,
              height: 700,
              borderRadius: 9999,
              background: `radial-gradient(circle, ${PRIMARY}66 0%, transparent 70%)`,
              display: "flex",
            },
          },
        },
        {
          type: "img",
          props: {
            src: carUri,
            width: 900,
            height: 403,
            style: {
              position: "absolute",
              right: -50,
              bottom: 220,
              width: 900,
              height: 403,
              objectFit: "contain",
              filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6))",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: 80,
              left: 80,
              right: 80,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            },
            children: [
              {
                type: "img",
                props: {
                  src: logoUri,
                  width: 200,
                  height: 86,
                  style: { width: 200, height: 86, objectFit: "contain" },
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    color: PRIMARY,
                    fontSize: 26,
                    fontWeight: 600,
                    letterSpacing: 5,
                    textTransform: "uppercase",
                    display: "flex",
                  },
                  children: "Noleggio Costa Smeralda",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              left: 80,
              right: 80,
              bottom: 80,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    color: "white",
                    fontSize: 76,
                    fontWeight: 800,
                    lineHeight: 1.02,
                    letterSpacing: -2,
                    display: "flex",
                    flexDirection: "column",
                  },
                  children: [
                    { type: "span", props: { children: "Auto, Scooter, Quad." } },
                    { type: "span", props: { style: { color: PRIMARY }, children: "Olbia · Costa Smeralda" } },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: { color: "rgba(255,255,255,0.78)", fontSize: 30, fontWeight: 400, display: "flex" },
                  children: "Consegna a domicilio · WhatsApp H24",
                },
              },
            ],
          },
        },
      ],
    },
  };

  const sqSvg = await satori(sqJsx, { width: 1080, height: 1080, fonts: fontConfig });
  const sqPng = new Resvg(sqSvg, { fitTo: { mode: "width", value: 1080 } }).render().asPng();
  await writeFile(join(OUT, "og-image-square.jpg"), await sharp(sqPng).jpeg({ quality: 88 }).toBuffer());
  console.log("✓ og-image-square.jpg");

  // ============================================================
  // FAVICONS
  // ============================================================
  console.log("🎨 Rendering favicons from gdis-favicon.svg...");
  // The source SVG may not have explicit width/height; sharp needs density to render at target size
  const baseFavicon = (size) =>
    sharp(faviconSvg, { density: Math.round((size / 64) * 300) })
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

  const [f16, f32, f48, f180, f192, f512] = await Promise.all([
    baseFavicon(16),
    baseFavicon(32),
    baseFavicon(48),
    baseFavicon(180),
    baseFavicon(192),
    baseFavicon(512),
  ]);

  await writeFile(join(OUT, "favicon-16x16.png"), f16);
  await writeFile(join(OUT, "favicon-32x32.png"), f32);
  await writeFile(join(OUT, "apple-touch-icon.png"), f180);
  await writeFile(join(OUT, "android-chrome-192x192.png"), f192);
  await writeFile(join(OUT, "android-chrome-512x512.png"), f512);
  console.log("✓ favicon set (16, 32, 180, 192, 512)");

  // favicon.ico — multi-size PNGs packed into ICO container.
  // Minimal ICO writer (16/32/48 PNG-encoded). RFC: ICO header + dir entries + PNG payloads.
  const icoBuffer = makeIco([
    { size: 16, png: f16 },
    { size: 32, png: f32 },
    { size: 48, png: f48 },
  ]);
  await writeFile(join(OUT, "favicon.ico"), icoBuffer);
  console.log("✓ favicon.ico (multi-size)");

  console.log(`\n✅ All assets generated in: ${OUT}`);
  console.log("\nUpload to Supabase bucket 'asset/' with these exact filenames:");
  console.log("  - og-image.jpg");
  console.log("  - og-image-square.jpg");
  console.log("  - favicon-16x16.png");
  console.log("  - favicon-32x32.png");
  console.log("  - apple-touch-icon.png");
  console.log("  - android-chrome-192x192.png");
  console.log("  - android-chrome-512x512.png");
  console.log("  - favicon.ico");
}

// ICO writer — packs PNG-encoded entries (Windows accepts PNG inside ICO since Vista)
function makeIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type=icon
  header.writeUInt16LE(entries.length, 4);

  const dirs = [];
  let offset = 6 + 16 * entries.length;
  for (const e of entries) {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(e.size === 256 ? 0 : e.size, 0); // width
    dir.writeUInt8(e.size === 256 ? 0 : e.size, 1); // height
    dir.writeUInt8(0, 2); // palette
    dir.writeUInt8(0, 3); // reserved
    dir.writeUInt16LE(1, 4); // planes
    dir.writeUInt16LE(32, 6); // bpp
    dir.writeUInt32LE(e.png.length, 8); // size
    dir.writeUInt32LE(offset, 12); // offset
    dirs.push(dir);
    offset += e.png.length;
  }
  return Buffer.concat([header, ...dirs, ...entries.map((e) => e.png)]);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
