# astrowind

An [AstroWind](https://github.com/arthelokyo/astrowind) site — an
[Astro](https://astro.build/) + [Tailwind CSS](https://tailwindcss.com/)
marketing site and blog: a home page, about, pricing, services and contact
pages, six landing-page and four home-page demos, and a Markdown/MDX blog
with categories, tags, an RSS feed and a sitemap — built fully static and
served from **Cloudflare Workers + Static Assets**.

## Live deployment

<!-- 03-docs:begin -->
Not recorded yet. The bootstrap's last phase writes the live URLs, the
workspace and the secrets the site uses into
[ai/context/deployment.md](ai/context/deployment.md); how the site deploys
and how to operate it is in
[ai/context/operations.md](ai/context/operations.md).
<!-- 03-docs:end -->

## What is here

| Surface | Where |
|---|---|
| The site's name (the header's logo text, every page's title template) | `apps/web/src/site.ts` |
| Site URL, metadata, blog options, analytics | `apps/web/src/config.yaml` |
| Pages (a file per route), landing and home demos | `apps/web/src/pages` |
| Blog posts (`.md` / `.mdx`) | `apps/web/src/data/post` |
| Header and footer links | `apps/web/src/navigation.ts` |
| Widgets, layouts, colours and fonts | `apps/web/src/components`, `apps/web/src/layouts`, `apps/web/src/components/CustomStyles.astro`, `apps/web/astro.config.ts` |
| The Worker in front of the assets, its config and deploy contract | `apps/web/worker/index.ts`, `apps/web/wrangler.jsonc`, `apps/web/component.yaml` |
| Cache headers for the hashed assets | `apps/web/public/_headers` |
| Tests (Astro's container API, the Worker) | `apps/web/src/test` |

## Getting started

```bash
pnpm install
pnpm typecheck        # astro check
pnpm lint             # eslint
pnpm test             # vitest over the container API
pnpm build            # astro build → apps/web/dist (every page, feed and image)
```

```bash
pnpm --filter @app/web dev        # http://localhost:4321
pnpm --filter @app/web preview    # wrangler dev over the built site and its Worker
```

Make the site yours: its name in `apps/web/src/site.ts`; its URL, metadata
and blog options in `apps/web/src/config.yaml`; its pages in
`apps/web/src/pages/` and its posts in `apps/web/src/data/post/`. A binding
the Worker needs (KV, R2, D1, a variable) goes in `apps/web/wrangler.jsonc`.

The site is static: every page is HTML in `dist/` at build time, and the
Worker (`apps/web/worker/index.ts`) only hands requests that match no file
back to the assets, which answer with the site's own 404 page. A redirect, a
header or an API route the site needs later goes in that Worker.

## How it deploys

Merges to `main` converge through [Orun](https://opencode.ai/docs):
`.github/workflows/ci.yml` plans the changed components and runs each lane
against the workspace in `intent.yaml`. The site deploys to `stage`, then to
`prod` once stage has converged on the same commit; `dev` only verifies. The
Worker is `astrowind-web-<env>` on your account's workers.dev
subdomain, and every deploy is smoke-tested over HTTP. A pull request runs
the same pipeline's verify lanes: the site built and dry-deployed for each
environment, with nothing deployed. They do not type-check, lint or run the
tests, so run `pnpm typecheck`, `pnpm lint` and `pnpm test` before you push.
(A push to `main` builds, deploys and smoke-tests.)

The pipeline holds one credential, GitHub's own `GITHUB_TOKEN`. The
Cloudflare token and account id are brokered per run from the workspace's
Cloudflare connection; nothing provider-shaped is stored in the repository
or in GitHub.

**Deploy by hand.** Orunbase's **Deploy** button on a component, or **Run
workflow** on the CI workflow in GitHub's Actions tab (on `main`), runs
`ci.yml` for the environment and components you pick, and each one deploys
exactly as a merge would deploy it. Leave the component blank to redeploy
every component in that environment, with nothing changed: after rotating a
secret, say. A component with nothing to run in that environment (a test
suite in `prod`) is left out with a notice.

## Custom domain

The site answers on workers.dev from its first deploy. To serve it on your
own domain:

1. Add the domain to the Cloudflare account the site deploys into, and attach
   it to the Worker (dashboard → Workers & Pages →
   `astrowind-web-prod` → Settings → Domains & Routes → Add →
   Custom domain). Do the same for stage with a subdomain if you want one.
2. Record the environment's public origin in `intent.yaml`: the deploy
   builds the site's canonical links, sitemap and RSS feed for it (until then
   they name the workers.dev URL), and the deployment record probes it beside
   the workers.dev URL:

   ```yaml
   environments:
     prod:
       env:
         SITE_URL: https://astrowind.example.com
   ```

   The site was born with the reserved placeholder
   `astrowind.example.com` where its domain goes: that example,
   `BASE_DOMAIN` under each environment (dev, stage and prod) in
   `intent.yaml`, and `site:` in `apps/web/src/config.yaml` — the origin a
   local build uses. Replace it with your domain in the same change, and land
   it with a change under `apps/web` so the merge rebuilds the site.

## Credits

AstroWind is © onWidget and its contributors, MIT-licensed
(`apps/web/LICENSE.md`). Its demo pages link to
[arthelokyo/astrowind](https://github.com/arthelokyo/astrowind); replace
them with your own content as you make the site yours.
