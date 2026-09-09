// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ragulakrishna237.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
