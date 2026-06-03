import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Resolve last git commit date for a file (or HEAD if no per-file history).
// Used by the sitemap serializer to emit real per-page lastmod instead of build-time stamps.
const GIT_LASTMOD_CACHE = new Map();
function gitLastMod(relativeFilePath) {
  const key = relativeFilePath ?? '__HEAD__';
  if (GIT_LASTMOD_CACHE.has(key)) return GIT_LASTMOD_CACHE.get(key);
  let iso;
  try {
    const args = relativeFilePath
      ? ['log', '-1', '--format=%cI', '--', relativeFilePath]
      : ['log', '-1', '--format=%cI'];
    iso = execSync(`git ${args.join(' ')}`, { cwd: __dirname, encoding: 'utf8' }).trim();
  } catch {
    iso = '';
  }
  if (!iso) iso = new Date().toISOString();
  GIT_LASTMOD_CACHE.set(key, iso);
  return iso;
}
const HEAD_LASTMOD = gitLastMod(null);

// Map an outgoing sitemap pathname to the most relevant source file(s) for lastmod.
// Returns max(git mtime) across template + per-route content file when applicable.
function lastModForPath(pathname) {
  const clean = pathname.replace(/\/$/, '') || '/';
  const candidates = [];
  const pushIfExists = (p) => {
    const abs = resolve(__dirname, p);
    if (existsSync(abs)) candidates.push(p);
  };
  // Homepages
  if (clean === '/') pushIfExists('src/pages/index.astro');
  else if (clean === '/en') pushIfExists('src/pages/en/index.astro');
  else if (clean === '/de') pushIfExists('src/pages/de/index.astro');
  else if (clean === '/fr') pushIfExists('src/pages/fr/index.astro');
  // IT location/hub pattern
  const itLocMatch = clean.match(/^\/noleggio-auto-a-(.+)$/);
  if (itLocMatch) {
    pushIfExists('src/pages/noleggio-auto-a-[slug].astro');
    pushIfExists(`src/content/locations/${itLocMatch[1]}.json`);
  }
  const enLocMatch = clean.match(/^\/en\/car-rental-in-(.+)$/);
  if (enLocMatch) {
    pushIfExists('src/pages/en/car-rental-in-[slug].astro');
    pushIfExists(`src/content/locations/${enLocMatch[1]}.json`);
  }
  const deLocMatch = clean.match(/^\/de\/autovermietung-(?!flughafen|hafen|bahnhof|costa-smeralda)(.+)$/);
  if (deLocMatch) {
    pushIfExists('src/pages/de/autovermietung-[slug].astro');
    pushIfExists(`src/content/locations/${deLocMatch[1]}.json`);
  }
  const frLocMatch = clean.match(/^\/fr\/location-voiture-a-(.+)$/);
  if (frLocMatch) {
    pushIfExists('src/pages/fr/location-voiture-a-[slug].astro');
    pushIfExists(`src/content/locations/${frLocMatch[1]}.json`);
  }
  // Fleet pages
  const fleetMatch = clean.match(/^\/(?:en\/fleet|de\/flotte|fr\/flotte|flotta)\/(.+)$/);
  if (fleetMatch) {
    pushIfExists('src/pages/flotta/[slug].astro');
    pushIfExists('src/pages/en/fleet/[slug].astro');
    pushIfExists('src/pages/de/flotte/[slug].astro');
    pushIfExists('src/pages/fr/flotte/[slug].astro');
    pushIfExists(`src/content/fleet/${fleetMatch[1]}.json`);
  }
  // Hub airport/port/station/costa pages (hardcoded files)
  const hubMap = {
    '/noleggio-auto-aeroporto-olbia': 'src/pages/noleggio-auto-aeroporto-olbia.astro',
    '/noleggio-auto-porto-olbia': 'src/pages/noleggio-auto-porto-olbia.astro',
    '/noleggio-auto-stazione-olbia': 'src/pages/noleggio-auto-stazione-olbia.astro',
    '/noleggio-auto-in-costa-smeralda': 'src/pages/noleggio-auto-in-costa-smeralda.astro',
    '/en/car-rental-olbia-airport': 'src/pages/en/car-rental-olbia-airport.astro',
    '/en/car-rental-olbia-port': 'src/pages/en/car-rental-olbia-port.astro',
    '/en/car-rental-olbia-station': 'src/pages/en/car-rental-olbia-station.astro',
    '/en/car-rental-costa-smeralda': 'src/pages/en/car-rental-costa-smeralda.astro',
    '/de/autovermietung-flughafen-olbia': 'src/pages/de/autovermietung-flughafen-olbia.astro',
    '/de/autovermietung-hafen-olbia': 'src/pages/de/autovermietung-hafen-olbia.astro',
    '/de/autovermietung-bahnhof-olbia': 'src/pages/de/autovermietung-bahnhof-olbia.astro',
    '/de/autovermietung-costa-smeralda': 'src/pages/de/autovermietung-costa-smeralda.astro',
    '/fr/location-voiture-aeroport-olbia': 'src/pages/fr/location-voiture-aeroport-olbia.astro',
    '/fr/location-voiture-port-olbia': 'src/pages/fr/location-voiture-port-olbia.astro',
    '/fr/location-voiture-gare-olbia': 'src/pages/fr/location-voiture-gare-olbia.astro',
    '/fr/location-voiture-costa-smeralda': 'src/pages/fr/location-voiture-costa-smeralda.astro',
  };
  if (hubMap[clean]) pushIfExists(hubMap[clean]);
  // Generic fallback: try direct file lookup under src/pages
  if (candidates.length === 0) {
    const guess = `src/pages${clean}.astro`;
    pushIfExists(guess);
  }
  if (candidates.length === 0) return HEAD_LASTMOD;
  const dates = candidates.map(gitLastMod).filter(Boolean);
  if (!dates.length) return HEAD_LASTMOD;
  return dates.sort().pop();
}

export default defineConfig({
  site: 'https://gdisrentservice.com',
  output: 'static',
  trailingSlash: 'never',
  adapter: vercel({ imageService: true }),
  prefetch: { defaultStrategy: 'viewport' },
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en', 'de', 'fr'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'it',
        locales: {
          it: 'it-IT',
          en: 'en',
          de: 'de-DE',
          fr: 'fr-FR',
        },
      },
      filter: (url) =>
        !url.includes('/admin') &&
        !url.includes('/login') &&
        !/\/(?:en|de|fr)?\/?404\/?$/.test(new URL(url).pathname) &&
        !/\/404\/?$/.test(new URL(url).pathname),
      serialize(item) {
        const path = new URL(item.url).pathname;

        // All hreflang clusters: locations + hubs + fleet + booking + about + contact + sitemap.
        // Slugs differ per-locale; @astrojs/sitemap can't auto-link them, so we inject `links` explicitly.
        // For every cluster the IT URL is also emitted as x-default in addXDefault().
        const CLUSTERS = [
          // 7 destination cities + Costa Smeralda hub
          { 'it-IT': '/noleggio-auto-a-olbia', en: '/en/car-rental-in-olbia', 'de-DE': '/de/autovermietung-olbia', 'fr-FR': '/fr/location-voiture-a-olbia' },
          { 'it-IT': '/noleggio-auto-a-porto-cervo', en: '/en/car-rental-in-porto-cervo', 'de-DE': '/de/autovermietung-porto-cervo', 'fr-FR': '/fr/location-voiture-a-porto-cervo' },
          { 'it-IT': '/noleggio-auto-a-porto-rotondo', en: '/en/car-rental-in-porto-rotondo', 'de-DE': '/de/autovermietung-porto-rotondo', 'fr-FR': '/fr/location-voiture-a-porto-rotondo' },
          { 'it-IT': '/noleggio-auto-a-san-pantaleo', en: '/en/car-rental-in-san-pantaleo', 'de-DE': '/de/autovermietung-san-pantaleo', 'fr-FR': '/fr/location-voiture-a-san-pantaleo' },
          { 'it-IT': '/noleggio-auto-a-san-teodoro', en: '/en/car-rental-in-san-teodoro', 'de-DE': '/de/autovermietung-san-teodoro', 'fr-FR': '/fr/location-voiture-a-san-teodoro' },
          { 'it-IT': '/noleggio-auto-a-baja-sardinia', en: '/en/car-rental-in-baja-sardinia', 'de-DE': '/de/autovermietung-baja-sardinia', 'fr-FR': '/fr/location-voiture-a-baja-sardinia' },
          { 'it-IT': '/noleggio-auto-a-golfo-aranci', en: '/en/car-rental-in-golfo-aranci', 'de-DE': '/de/autovermietung-golfo-aranci', 'fr-FR': '/fr/location-voiture-a-golfo-aranci' },
          { 'it-IT': '/noleggio-auto-in-costa-smeralda', en: '/en/car-rental-costa-smeralda', 'de-DE': '/de/autovermietung-costa-smeralda', 'fr-FR': '/fr/location-voiture-costa-smeralda' },
          { 'it-IT': '/noleggio-auto-aeroporto-olbia', en: '/en/car-rental-olbia-airport', 'de-DE': '/de/autovermietung-flughafen-olbia', 'fr-FR': '/fr/location-voiture-aeroport-olbia' },
          { 'it-IT': '/noleggio-auto-porto-olbia', en: '/en/car-rental-olbia-port', 'de-DE': '/de/autovermietung-hafen-olbia', 'fr-FR': '/fr/location-voiture-port-olbia' },
          { 'it-IT': '/noleggio-auto-stazione-olbia', en: '/en/car-rental-olbia-station', 'de-DE': '/de/autovermietung-bahnhof-olbia', 'fr-FR': '/fr/location-voiture-gare-olbia' },
          // Fleet (4 vehicles × 4 locales — slugs match across locales for IT/EN/DE/FR)
          { 'it-IT': '/flotta/fiat-panda', en: '/en/fleet/fiat-panda', 'de-DE': '/de/flotte/fiat-panda', 'fr-FR': '/fr/flotte/fiat-panda' },
          { 'it-IT': '/flotta/mercedes-classe-a180d', en: '/en/fleet/mercedes-classe-a180d', 'de-DE': '/de/flotte/mercedes-classe-a180d', 'fr-FR': '/fr/flotte/mercedes-classe-a180d' },
          { 'it-IT': '/flotta/honda-sh', en: '/en/fleet/honda-sh', 'de-DE': '/de/flotte/honda-sh', 'fr-FR': '/fr/flotte/honda-sh' },
          { 'it-IT': '/flotta/yamaha-raptor', en: '/en/fleet/yamaha-raptor', 'de-DE': '/de/flotte/yamaha-raptor', 'fr-FR': '/fr/flotte/yamaha-raptor' },
          // About / Chi siamo
          { 'it-IT': '/chisiamo', en: '/en/about-us', 'de-DE': '/de/ueber-uns', 'fr-FR': '/fr/a-propos' },
          // Contact
          { 'it-IT': '/contatti', en: '/en/contact', 'de-DE': '/de/kontakt', 'fr-FR': '/fr/contact' },
          // Booking
          { 'it-IT': '/prenotaora', en: '/en/book-now', 'de-DE': '/de/jetzt-buchen', 'fr-FR': '/fr/reserver' },
          // HTML sitemap
          { 'it-IT': '/mappa-sito', en: '/en/sitemap', 'de-DE': '/de/sitemap', 'fr-FR': '/fr/plan-du-site' },
          // Legal: privacy, cookies, terms
          { 'it-IT': '/privacy', en: '/en/privacy-policy', 'de-DE': '/de/datenschutz', 'fr-FR': '/fr/confidentialite' },
          { 'it-IT': '/cookie', en: '/en/cookie-policy', 'de-DE': '/de/cookie-richtlinie', 'fr-FR': '/fr/cookies' },
          { 'it-IT': '/termini', en: '/en/terms', 'de-DE': '/de/agb', 'fr-FR': '/fr/conditions-generales' },
        ];

        function findLinksWithXDefault(p) {
          for (const group of CLUSTERS) {
            if (Object.values(group).some((slug) => slug === p)) {
              const entries = Object.entries(group).map(([lang, slug]) => ({
                lang,
                url: `https://gdisrentservice.com${slug}`,
              }));
              // x-default points to the IT canonical for that cluster
              entries.push({ lang: 'x-default', url: `https://gdisrentservice.com${group['it-IT']}` });
              return entries;
            }
          }
          return undefined;
        }

        const lastmod = lastModForPath(path);
        const links = findLinksWithXDefault(path);

        // Homepage of any locale → priority 1.0
        if (/^\/(?:en|de|fr)?\/?$/.test(path)) {
          // Homepages: x-default → /, alternates → /, /en, /de, /fr
          const homeLinks = [
            { lang: 'it-IT', url: 'https://gdisrentservice.com/' },
            { lang: 'en', url: 'https://gdisrentservice.com/en' },
            { lang: 'de-DE', url: 'https://gdisrentservice.com/de' },
            { lang: 'fr-FR', url: 'https://gdisrentservice.com/fr' },
            { lang: 'x-default', url: 'https://gdisrentservice.com/' },
          ];
          return { ...item, priority: 1.0, changefreq: 'daily', lastmod, links: homeLinks };
        }
        // Legal pages (any locale): demote — must remain indexable for compliance but low crawl priority
        if (/(?:privacy|termini|cookie|terms|conditions|datenschutz|agb|cookie-richtlinie|cookies|confidentialite|conditions-generales|cookie-policy|privacy-policy)/i.test(path)) {
          return { ...item, priority: 0.3, changefreq: 'yearly', lastmod, ...(links ? { links } : {}) };
        }
        // HTML sitemap pages: cluster + low priority
        if (/(?:mappa-sito|\/sitemap$|plan-du-site)/i.test(path)) {
          return { ...item, priority: 0.3, changefreq: 'yearly', lastmod, ...(links ? { links } : {}) };
        }
        // Hub & destination pages (any locale) — inject cross-locale alternates
        if (
          /noleggio-auto-/.test(path) ||
          /car-rental-/.test(path) ||
          /autovermietung/.test(path) ||
          /location-voiture/.test(path)
        ) {
          return {
            ...item,
            priority: 0.9,
            changefreq: 'weekly',
            lastmod,
            ...(links ? { links } : {}),
          };
        }
        // Fleet pages (any locale)
        if (/\/(?:flotta|fleet|flotte)\//.test(path)) {
          return { ...item, priority: 0.8, changefreq: 'weekly', lastmod, ...(links ? { links } : {}) };
        }
        // About / contact / booking clusters
        if (links) {
          return { ...item, priority: 0.7, changefreq: 'monthly', lastmod, links };
        }
        return { ...item, priority: 0.7, changefreq: 'monthly', lastmod };
      },
    }),
  ],
  image: {
    domains: ['zgazhrzjgefvjxknyffy.supabase.co'],
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
