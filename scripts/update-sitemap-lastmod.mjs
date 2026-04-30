// Aggiorna tutti i <lastmod> di public/sitemap.xml con la data odierna (UTC, YYYY-MM-DD).
// Eseguito automaticamente a ogni `npm run build` (hook `prebuild`).
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITEMAP = join(__dirname, "..", "public", "sitemap.xml");

const today = new Date().toISOString().slice(0, 10);

const xml = await readFile(SITEMAP, "utf8");
const updated = xml.replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

if (updated === xml) {
  console.log(`sitemap.xml: nessuna modifica (già a ${today})`);
} else {
  await writeFile(SITEMAP, updated, "utf8");
  console.log(`sitemap.xml: lastmod aggiornati a ${today}`);
}
