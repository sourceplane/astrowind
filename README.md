# astrowind

Vercel's [AstroWind](https://github.com/arthelokyo/astrowind) template — a
free Astro + Tailwind CSS marketing site and blog: a home page, about,
pricing, services and contact pages, six landing-page and four home-page
demos, and a Markdown/MDX blog with categories, tags, an RSS feed and a
sitemap — running on **Cloudflare Workers + Static Assets**, and packaged
as an **Orun baseline**: one command takes a new site from nothing to live
on stage and prod, in its own repository, under its own name.

AstroWind builds fully static, and its own README deploys it to Cloudflare
Workers as static assets with no adapter; that is the port. `astro build`
writes every page, post, feed, sitemap and optimised image to `dist/`, and
one small Worker sits in front of the assets for what matches no file. The
pages, the widgets, the blog and the theme do not change; the site's name
moves into one module, and `vercel.json`'s clean URLs and cache header
become the Worker's asset settings and `public/_headers`. What the baseline
adds is everything needed to make a copy of it somebody else's — built the
way [cirrus-baseline](https://github.com/sourceplane/cirrus-baseline) is.
See [`specs/epics/astrowind`](specs/epics/astrowind/README.md) for the
design, the milestones and the as-built status.

## Instantiating a site

```bash
git clone --depth 1 --branch <baseline-tag> https://github.com/sourceplane/astrowind
cd astrowind
orun new --blueprint repo-blueprint.yaml --out ~/sites/acme-notes --run-hooks --resume \
  --set reponame=acme-notes --set productname="Acme Notes" \
  --set githuborg=acme-inc --set subdomain=<workers-dev-subdomain>
```

Or, once the platform's registry lists it, from the Orun console (Baselines →
`astrowind` → Build). Two phases — `01-product` (the repository
created, then the whole site in one pull request, deployed to stage and prod
and smoke-tested) and `03-docs` (the live deployment recorded) — each landing
one pull request in the new repository. **[BOOTSTRAP.md](BOOTSTRAP.md)** is the
operator guide; [docs/phases/](docs/phases/README.md) has a page per phase.

The new repository receives the **site only** — the app and its tests, its
CI, its tooling, a README of its own and its operating contract — renamed
throughout to the site's name, repository and Cloudflare Worker. None of this
repository's machinery ships.

| What makes it a baseline | Where |
|---|---|
| The console card (inputs, secrets, programme) | `blueprint.yaml` |
| The build document (modules, phases, hooks) | `repo-blueprint.yaml` |
| This tree's identity, and the bootstrap's task contracts | `.baseline/` |
| The rename engine | `tooling/rebrand/rebrand.mjs` |
| The bootstrap's helpers (deferrals, redeploy marker, work-tree strip) | `tooling/bootstrap/` |
| The deployment-record renderer | `hooks/render-deployment-docs.sh` |
| The site's README and context pack | `.baseline/product/README.md`, `ai/context/` |
| The baseline's tests: contract, leak, offline bootstrap, end to end | `testing/`, `.github/workflows/baseline.yml` |
| Cutting a `baseline-vN` tag | `.github/workflows/tag.yml` |

## What is here (the site)

| Surface | Where |
|---|---|
| The site's name (the header's logo text, every page's title template) | `apps/web/src/site.ts` |
| Site URL, metadata, blog options, analytics | `apps/web/src/config.yaml` |
| Pages, landing and home demos | `apps/web/src/pages` |
| Blog posts | `apps/web/src/data/post` |
| Widgets, layouts, theme | `apps/web/src/components`, `apps/web/src/layouts`, `apps/web/vendor/integration` |
| The Worker in front of the assets, its config, deploy contract | `apps/web/worker/index.ts`, `apps/web/wrangler.jsonc`, `apps/web/public/_headers`, `apps/web/component.yaml` |
| Tests (Astro container API, the Worker) | `apps/web/src/test` |

## Getting started

```bash
pnpm install
pnpm typecheck        # astro check
pnpm lint             # eslint
pnpm test             # vitest over the container API
pnpm build            # astro build → apps/web/dist
```

```bash
pnpm --filter @app/web dev        # http://localhost:4321
pnpm --filter @app/web preview    # wrangler dev over the built site and its Worker
```

## How it maps to Vercel

| Vercel | Here |
|---|---|
| Static output (`dist/`) on Vercel's CDN | Workers Static Assets: `dist/` uploaded with the Worker `<repo>-web-<env>` (`apps/web/wrangler.jsonc`) |
| `vercel.json` `cleanUrls` + `trailingSlash: false` | `assets.html_handling: drop-trailing-slash` — `/about` serves `about/index.html`, `/about/` redirects to it |
| `vercel.json` `/_astro/*` immutable `Cache-Control` | `public/_headers`, which the assets upload honours |
| Vercel's 404 for an unknown path | the Worker hands it to the assets, which answer `dist/404.html` with a 404 (`not_found_handling: 404-page`) |
| Image optimisation | Unchanged: `astro build` optimises local images with sharp, and remote ones go through Unpic to their CDN |
| `site: https://astrowind.vercel.app` | Each deploy builds for its own origin — the environment's `SITE_URL`, else its workers.dev URL — so canonical links, the sitemap and the RSS feed name the site where it is served; `src/config.yaml`'s `site:` is a local build's |
| Deploy on push | Orun deploys `<repo>-web-{stage,prod}` on merge to `main` (`apps/web/component.yaml`) |
| "Deploy with Vercel" (clone the template) | `orun new --blueprint repo-blueprint.yaml` — a new repository, branded, deployed |

## CI

| Workflow | What it runs | Ships to a site |
|---|---|---|
| `ci.yml` | the Orun pipeline, and the only workflow a site carries: `orun plan --changed`, then one job per lane. A pull request runs the verify lanes (the site built and dry-deployed per environment — they do not type-check, lint or run the tests; `baseline.yml`'s e2e tier runs those before each tag, and a site's README asks its developers to run them before a push), except the bootstrap's own landings (`orun/BASE-*`), which are checked in the box before they are pushed (`checks: local`) and whose PR runs `plan` alone; a merge deploys stage → prod. It plans nothing while `intent.yaml` names the placeholder workspace `ws_CHANGE_ME`, as this repository does. A manual run (Orunbase's Deploy button, or Run workflow on `main`) plans the environment and components it names under the push-to-main trigger, so they deploy as a merge deploys them | yes |
| `baseline.yml` | the baseline's own tiers: contract tests, the blueprint read by the pinned orun, the leak gate, the offline bootstrap, the site built, dry-deployed and served | no |
| `tag.yml` | cuts a `baseline-vN` tag (manual) | no |
