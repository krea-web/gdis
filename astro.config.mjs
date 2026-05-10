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
          en: 'en-GB',
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
        // Homepage of any locale → priority 1.0
        if (/^\/(?:en|de|fr)?\/?$/.test(path)) {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }
        // Hub & destination pages (any locale)
        if (
          /noleggio-auto-/.test(path) ||
          /car-rental-/.test(path) ||
          /autovermietung/.test(path) ||
          /location-voiture/.test(path)
        ) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }
        // Fleet pages (any locale)
        if (/\/(?:flotta|fleet|flotte)\//.test(path)) {
          return { ...item, priority: 0.8, changefreq: 'weekly' };
        }
        return { ...item, priority: 0.7, changefreq: 'monthly' };
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
