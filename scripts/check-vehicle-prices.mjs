#!/usr/bin/env node
// Verify static prices (VEHICLE_PRICE_FROM + fleet/*.json pricePerDay) match Supabase vehicles.daily_rate.
// Run via `npm run check:prices`. Exits non-zero on drift so CI/prebuild catches stale fallback values.

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// Minimal .env loader (no extra dep). Honors process.env first so Vercel build env wins.
function loadEnv(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i);
    if (!m) continue;
    const key = m[1];
    if (process.env[key]) continue;
    let val = m[2];
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
loadEnv(resolve(repoRoot, '.env'));

const url = process.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error('Missing PUBLIC_SUPABASE_URL or *_KEY env. Aborting price check.');
  process.exit(2);
}

// slug -> { make, model } mapping (page slug ↔ DB row identity).
// Honda SH page covers both 125i and 350i variants — "from" price uses the cheaper variant (125i).
const SLUG_TO_DB = {
  'fiat-panda': { make: 'Fiat', model: 'Panda Hybrid' },
  'honda-sh': { make: 'Honda', model: 'SH 125i' },
  'mercedes-classe-a180d': { make: 'Mercedes', model: 'Classe A180d' },
  'yamaha-raptor': { make: 'Yamaha', model: 'Raptor 700R' },
};

// Category mapping for VEHICLE_PRICE_FROM static export.
const CATEGORY_TO_SLUG = {
  city_car: 'fiat-panda',
  premium: 'mercedes-classe-a180d',
  scooter: 'honda-sh',
  quad: 'yamaha-raptor',
};

const supabase = createClient(url, key, { auth: { persistSession: false } });

const { data: vehicles, error } = await supabase
  .from('vehicles')
  .select('make, model, daily_rate');

if (error) {
  console.error('Supabase query failed:', error.message);
  process.exit(2);
}

const dbBySlug = {};
for (const [slug, { make, model }] of Object.entries(SLUG_TO_DB)) {
  const row = vehicles.find((v) => v.make === make && v.model === model);
  if (!row || row.daily_rate == null) {
    console.error(`[FAIL] DB row missing for ${slug} (${make} ${model}).`);
    process.exit(1);
  }
  dbBySlug[slug] = row.daily_rate;
}

let drift = 0;

// 1. Check fleet/*.json pricePerDay
for (const slug of Object.keys(SLUG_TO_DB)) {
  const json = JSON.parse(readFileSync(resolve(repoRoot, `src/content/fleet/${slug}.json`), 'utf8'));
  if (json.pricePerDay !== dbBySlug[slug]) {
    console.error(`[DRIFT] src/content/fleet/${slug}.json pricePerDay=${json.pricePerDay} but DB daily_rate=${dbBySlug[slug]}.`);
    drift++;
  }
}

// 2. Check VEHICLE_PRICE_FROM static export
const pricingSrc = readFileSync(resolve(repoRoot, 'src/lib/vehiclePricing.ts'), 'utf8');
for (const [category, slug] of Object.entries(CATEGORY_TO_SLUG)) {
  const re = new RegExp(`${category}:\\s*(\\d+)`);
  const match = pricingSrc.match(re);
  if (!match) {
    console.error(`[FAIL] Cannot find ${category} in vehiclePricing.ts.`);
    drift++;
    continue;
  }
  const staticPrice = Number(match[1]);
  if (staticPrice !== dbBySlug[slug]) {
    console.error(`[DRIFT] vehiclePricing.ts ${category}=${staticPrice} but DB ${slug} daily_rate=${dbBySlug[slug]}.`);
    drift++;
  }
}

if (drift > 0) {
  console.error(`\n${drift} price drift(s) detected. Sync src/lib/vehiclePricing.ts and src/content/fleet/*.json to DB values above.`);
  process.exit(1);
}

console.log('[OK] All static prices match Supabase vehicles.daily_rate.');
for (const [slug, price] of Object.entries(dbBySlug)) {
  console.log(`  ${slug}: €${price}/day`);
}
