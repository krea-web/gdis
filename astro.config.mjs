import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

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
        const buildTime = new Date().toISOString();

        // Location and hub pages: 7 standard destinations + 4 hubs (costa-smeralda, airport, port, station).
        // Slugs differ per-locale, so @astrojs/sitemap can't auto-link them — we inject `links` explicitly.
        const LOC_ALTERNATES = {
          olbia: { 'it-IT': '/noleggio-auto-a-olbia', en: '/en/car-rental-in-olbia', 'de-DE': '/de/autovermietung-olbia', 'fr-FR': '/fr/location-voiture-a-olbia' },
          'porto-cervo': { 'it-IT': '/noleggio-auto-a-porto-cervo', en: '/en/car-rental-in-porto-cervo', 'de-DE': '/de/autovermietung-porto-cervo', 'fr-FR': '/fr/location-voiture-a-porto-cervo' },
          'porto-rotondo': { 'it-IT': '/noleggio-auto-a-porto-rotondo', en: '/en/car-rental-in-porto-rotondo', 'de-DE': '/de/autovermietung-porto-rotondo', 'fr-FR': '/fr/location-voiture-a-porto-rotondo' },
          'san-pantaleo': { 'it-IT': '/noleggio-auto-a-san-pantaleo', en: '/en/car-rental-in-san-pantaleo', 'de-DE': '/de/autovermietung-san-pantaleo', 'fr-FR': '/fr/location-voiture-a-san-pantaleo' },
          'san-teodoro': { 'it-IT': '/noleggio-auto-a-san-teodoro', en: '/en/car-rental-in-san-teodoro', 'de-DE': '/de/autovermietung-san-teodoro', 'fr-FR': '/fr/location-voiture-a-san-teodoro' },
          'baja-sardinia': { 'it-IT': '/noleggio-auto-a-baja-sardinia', en: '/en/car-rental-in-baja-sardinia', 'de-DE': '/de/autovermietung-baja-sardinia', 'fr-FR': '/fr/location-voiture-a-baja-sardinia' },
          'golfo-aranci': { 'it-IT': '/noleggio-auto-a-golfo-aranci', en: '/en/car-rental-in-golfo-aranci', 'de-DE': '/de/autovermietung-golfo-aranci', 'fr-FR': '/fr/location-voiture-a-golfo-aranci' },
          'costa-smeralda': { 'it-IT': '/noleggio-auto-in-costa-smeralda', en: '/en/car-rental-costa-smeralda', 'de-DE': '/de/autovermietung-costa-smeralda', 'fr-FR': '/fr/location-voiture-costa-smeralda' },
          aeroporto: { 'it-IT': '/noleggio-auto-aeroporto-olbia', en: '/en/car-rental-olbia-airport', 'de-DE': '/de/autovermietung-flughafen-olbia', 'fr-FR': '/fr/location-voiture-aeroport-olbia' },
          porto: { 'it-IT': '/noleggio-auto-porto-olbia', en: '/en/car-rental-olbia-port', 'de-DE': '/de/autovermietung-hafen-olbia', 'fr-FR': '/fr/location-voiture-port-olbia' },
          stazione: { 'it-IT': '/noleggio-auto-stazione-olbia', en: '/en/car-rental-olbia-station', 'de-DE': '/de/autovermietung-bahnhof-olbia', 'fr-FR': '/fr/location-voiture-gare-olbia' },
        };

        function findLocationLinks(p) {
          for (const group of Object.values(LOC_ALTERNATES)) {
            if (Object.values(group).some((slug) => slug === p)) {
              return Object.entries(group).map(([lang, slug]) => ({
                lang,
                url: `https://gdisrentservice.com${slug}`,
              }));
            }
          }
          return undefined;
        }

        // Homepage of any locale → priority 1.0
        if (/^\/(?:en|de|fr)?\/?$/.test(path)) {
          return { ...item, priority: 1.0, changefreq: 'daily', lastmod: buildTime };
        }
        // Legal pages (any locale): demote — must remain indexable for compliance but low crawl priority
        if (/(?:privacy|termini|cookie|terms|conditions|datenschutz|agb|cookie-richtlinie|cookies|confidentialite|conditions-generales|cookie-policy|privacy-policy)/i.test(path) || /(?:mappa-sito|sitemap|plan-du-site)$/i.test(path)) {
          return { ...item, priority: 0.3, changefreq: 'yearly', lastmod: buildTime };
        }
        // Hub & destination pages (any locale) — inject cross-locale alternates if present
        if (
          /noleggio-auto-/.test(path) ||
          /car-rental-/.test(path) ||
          /autovermietung/.test(path) ||
          /location-voiture/.test(path)
        ) {
          const links = findLocationLinks(path);
          return {
            ...item,
            priority: 0.9,
            changefreq: 'weekly',
            lastmod: buildTime,
            ...(links ? { links } : {}),
          };
        }
        // Fleet pages (any locale)
        if (/\/(?:flotta|fleet|flotte)\//.test(path)) {
          return { ...item, priority: 0.8, changefreq: 'weekly', lastmod: buildTime };
        }
        return { ...item, priority: 0.7, changefreq: 'monthly', lastmod: buildTime };
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
