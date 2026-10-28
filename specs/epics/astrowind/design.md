# astrowind — design

## The template

[AstroWind](https://github.com/arthelokyo/astrowind) is a free Astro 7 +
Tailwind CSS 4 template: a home page and four alternative homes (SaaS,
startup, mobile app, personal), about, pricing, services and contact pages,
six landing-page demos (sales, product, pre-launch, lead generation,
subscription, click-through), terms and privacy, and a blog from Markdown
and MDX posts in `src/data/post/` with category and tag pages, related
posts, an RSS feed and a sitemap. Its site name, URL, metadata, blog options
and analytics are `src/config.yaml`, read by a small integration in
`vendor/integration` into a virtual module the components import.

It is `output: 'static'`: every route is HTML at build time. Its README
deploys it to Vercel, Netlify, or Cloudflare Workers as static assets with
no adapter.

## How it maps to Cloudflare

| Vercel | Here | Why |
|---|---|---|
| Static output on Vercel's CDN | `dist/` as Workers Static Assets, uploaded with `<repo>-web-<env>` | The template is static; the assets are the site |
| — | One Worker, `apps/web/worker/index.ts`, hands unmatched requests to the assets | The `cloudflare-workers-assets-turbo` composition deploys a Worker with its assets; a request no file matches reaches it and gets the site's 404 |
| `vercel.json` `cleanUrls`, `trailingSlash: false` | `assets.html_handling: drop-trailing-slash` | `/about` serves `about/index.html`; `/about/` redirects |
| `vercel.json` `/_astro/*` cache header | `public/_headers` (shipped upstream for Netlify and Cloudflare) | The assets upload honours `_headers` |
| Vercel's 404 | `not_found_handling: 404-page` → `dist/404.html` with a 404 | The template's own 404 page |
| Image optimisation | Unchanged: sharp at `astro build`, Unpic for remote CDNs | Nothing is optimised at request time |
| `site: https://astrowind.vercel.app` | `PUBLIC_SITE_URL` per deploy: the environment's `SITE_URL`, else its workers.dev URL; `site:` (`<repo>.example.com`) for a local build | Canonical links, the sitemap and the RSS feed need an origin at build |

## The repository

The same as astro-boilerplate's: `apps/web` is the only component (type
`cloudflare-workers-assets-turbo`, lane `isolated`, deployed on stage and
prod on a push to `main`, verified on dev and on pull requests), its tests
live in the app because Astro components render only under Astro's Vite
config, and there is no infrastructure: no database, no bucket, no runtime
secret. The site's name is one seam, `SITE_NAME` in `src/site.ts`, which the
theme's config builder reads as the site name, the default title and the
title template, so `src/config.yaml` no longer spells it.

This baseline's slug is the template's own name, and the template spells it
in code: its virtual module was `astrowind:config` and its integration was
imported as `astrowind`, which the rename would rewrite into the product's
hyphenated slug (an invalid identifier). Both are `theme` here. Its demo
pages link to `arthelokyo/astrowind` and two of its posts are named for it;
the rename engine masks those as the template's credit.

## The build

`repo-blueprint.yaml` is astro-boilerplate's: one landing (`01-product`)
places, brands and lands the whole tree, one convergence builds and deploys
stage and prod side by side, and `03-docs` records what went live. The
smoke checks the home page is the template's, that `/blog` lists its posts,
and that an unknown path is a 404.

## Out of scope

- A CMS: the template documents Decap CMS (`public/decapcms`), which needs a
  Git gateway and an identity provider; it ships, unconfigured.
- Form handling: the contact and lead-generation forms post nowhere, as
  upstream. The Worker is where a handler would go.

## The alternative rejected

**Astro's Cloudflare adapter**, as astro-boilerplate uses. It would move the
build's prerendering into workerd through the Cloudflare Vite plugin, emit a
server entry nothing calls, generate a second wrangler config the e2e tier
would have to hold to the committed one, and take image optimisation out of
Node — all for a site with no on-demand route. A static build with a Worker
in front of it is what the template's own README describes.
