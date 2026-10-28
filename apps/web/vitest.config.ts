/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

// The site's own Astro config (astro.config.ts) — its integrations, the
// theme's `theme:config` module and the `~` alias — so .astro components
// render in tests through Astro's container API exactly as they build.
export default getViteConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
});
