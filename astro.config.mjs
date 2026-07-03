// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.thegreenrooms.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/privacy-policy') && !page.includes('/terms-conditions'),
      changefreq: 'weekly',
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
