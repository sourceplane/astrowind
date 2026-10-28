# apps/web — the site

An [AstroWind](https://github.com/arthelokyo/astrowind) site (MIT) — Astro 7
and Tailwind CSS 4 — built fully static and served as Cloudflare Workers
Static Assets:

- `/`, `/about`, `/pricing`, `/services`, `/contact`, `/terms`, `/privacy`
- `/homes/*` (SaaS, startup, mobile app, personal) and `/landing/*` (six
  landing-page demos)
- the blog: `/blog`, a page per post (`src/data/post/*.md|mdx`),
  `/category/*`, `/tag/*`, `/rss.xml`; `/sitemap-index.xml`, `/robots.txt`

The site's name — the header's logo text and every page's title template — is
`src/site.ts`. Its URL, metadata, blog options and analytics are
`src/config.yaml`; header and footer links are `src/navigation.ts`; colours
and fonts are `src/components/CustomStyles.astro` and `astro.config.ts`.

```bash
pnpm dev        # astro dev on http://localhost:4321
pnpm test       # vitest over Astro's container API (src/test)
pnpm build      # astro build → dist/
pnpm preview    # wrangler dev over dist/ and the Worker
```

`wrangler.jsonc` is what deploys: the Worker (`worker/index.ts`) and `dist/`
as its assets. A request that matches a file is served from the assets; one
that does not reaches the Worker, which hands it back to the assets for the
site's 404 page. `public/_headers` sets the immutable cache on `/_astro/*`.

How it is deployed — per environment, on merge to `main` — is the
repository's README and `component.yaml` beside this file.
