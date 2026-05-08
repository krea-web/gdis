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
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap({
      filter: (url) => !url.includes('/admin'),
      serialize(item) {
        if (item.url === 'https://gdisrentservice.com/') {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }
        if (item.url.includes('/noleggio-auto-')) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }
        if (item.url.includes('/flotta/')) {
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
