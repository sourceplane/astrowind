# astrowind — decisions

The choices that shape this repository, one line each, with where the full
reasoning lives. Superseded decisions stay listed, marked, so the history
reads in order.

| # | Decision | Why | Source |
|---|---|---|---|
| 1 | The site builds fully static (`output: 'static'`, no adapter) and deploys as Workers Static Assets | AstroWind is a static template, and its own README deploys it to Workers as assets with no adapter; an adapter would move prerendering into workerd for nothing | `specs/epics/astrowind/design.md` |
| 2 | One small Worker (`apps/web/worker/index.ts`) in front of the assets | The `cloudflare-workers-assets-turbo` composition deploys a Worker with its assets; this one hands unmatched requests back to the assets (the 404 page) and is where a redirect or an API route goes later | risk AW-B |
| 3 | Astro held at 7.3.8, the template's own dependency set otherwise, sharp at build time | Astro 7.4 refuses any Node below 22.23.4, and the Node 22 some GitHub runners carry is 22.23.3; images are optimised by `astro build` in Node, so the Worker needs no image service | IMPLEMENTATION-STATUS (departures) |
| 4 | The tests live in the app (`apps/web/src/test`), not a `tests/web` package | Astro components render only under Astro's own Vite config (the container API) | risk AW-D |
| 5 | One committed `wrangler.jsonc` is what deploys | There is no adapter to generate a second config; the lane checks the config exists before the build | `apps/web/component.yaml` |
| 6 | The site's name is one seam, `SITE_NAME` in `apps/web/src/site.ts`, read by the theme's config builder | The rename rewrites one literal; `src/config.yaml` no longer spells the name | IMPLEMENTATION-STATUS (departures) |
| 7 | The theme's virtual module is `theme:config`, its integration `theme` | This baseline's slug is the template's own name: the rename would have rewritten `import astrowind from …` into an invalid identifier | risk AW-G |
| 8 | The template's credit (`arthelokyo/astrowind`, its two posts named for it) is masked from the rename | A site keeps its demo links pointing at the template, and its posts at their URLs | `tooling/rebrand/rebrand.mjs` (UPSTREAM_CREDIT), risk AW-G |
| 9 | `html_handling: drop-trailing-slash` and `public/_headers` | They are `vercel.json`'s `cleanUrls` + `trailingSlash: false` and its `/_astro/*` immutable cache header | `apps/web/wrangler.jsonc` |
| 10 | Each deploy builds for its own origin: `PUBLIC_SITE_URL` = the environment's `SITE_URL`, else its workers.dev URL; `src/config.yaml`'s `site:` (the domain placeholder) is a local build's | The sitemap, the RSS feed and canonical links need an origin at build time, and each environment builds anyway (portfolio-starter-kit's shape) | risk AW-C |
| 11 | No custom-domain phase: a domain is the owner's step, and `SITE_URL` has the record probe it | The brokered `workers-deploy` token has no zone scope | README, "Custom domain" |
| 12 | One landing (`01-product`) then the record (`03-docs`), each checked in the build box | A landing has a fixed cost; the convergence on main builds, deploys and smoke-tests the site for real | `docs/phases/README.md` |
| 13 | `ci.yml` plans nothing while `intent.yaml` names `ws_CHANGE_ME`; no Checks workflow | A bootstrap cannot set a repository variable; a push to main must start `ci.yml` alone | `.github/workflows/ci.yml` |
| 14 | stack-tectonic 0.19.0, not 0.20.0 | The job installs in its own tree; 0.20.0's lane-shared install broke the Next.js siblings live and would save nothing here | risk AW-F |
| 15 | orun is pinned only where it runs (the `orun-action` `version:` in each workflow); no kiox | A pin nothing runs drifts | `.github/workflows/` |
| 16 | Component docs are generated from the manifests and checked in CI | A hand-written copy of the component's facts drifts silently | `tooling/catalog/gen-component-docs.py` |
| 17 | `subdomain` is read from the Cloudflare connection, never asked; the console asks for no domain | Both belong to the account or the owner, not to the build | `blueprint.yaml` |
