import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';
import { prefixDist } from './scripts/prefix-github-pages-base.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://do-ios.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/talks.json'),
    }),
    // Temporary: the GitHub Pages workflow sets GITHUB_PAGES_BASE so project-page
    // URLs work. The SSH deploy leaves this unset and ships root-absolute paths.
    {
      name: 'github-pages-base',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          const base = process.env.GITHUB_PAGES_BASE?.trim();
          if (!base || base === '/') return;
          const outputDir = dir instanceof URL ? fileURLToPath(dir) : dir;
          await prefixDist(outputDir, base);
        },
      },
    },
  ],
});
