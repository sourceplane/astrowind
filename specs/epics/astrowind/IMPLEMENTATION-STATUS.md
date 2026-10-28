# astrowind — implementation status

| Milestone | State | Landed |
|---|---|---|
| AW0 — the spec | ✅ | the repository's first commit |
| AW1 — the site on Workers | ✅ | AW-2 |
| AW2 — a baseline | planned | AW-3 |

## Departures from the upstream template

Everything not listed here is the template as it is upstream at `14e1a69`.

| # | What | Why |
|---|---|---|
| 1 | The app lives in `apps/web` of a pnpm workspace; `package-lock.json`, `Dockerfile`, `docker-compose.yml`, `nginx/`, `netlify.toml`, `vercel.json`, `sandbox.config.json` and `.stackblitzrc` are not carried | Other hosts' deploy files; the workspace has one lockfile, `pnpm-lock.yaml` |
| 2 | `wrangler.jsonc` names the Worker `<repo>-web`, adds `main: ./worker/index.ts`, the `ASSETS` binding and `html_handling: drop-trailing-slash` | The composition deploys a Worker with its assets; the trailing-slash rule is `vercel.json`'s |
| 3 | `apps/web/worker/index.ts` | The Worker in front of the assets |
| 4 | `src/site.ts` (`SITE_NAME`) is the site's name; `src/config.yaml` no longer has `site.name`, `metadata.title` or `openGraph.site_name`; the config builder defaults them from `SITE_NAME` (title template `%s — <name>`) | One rename seam |
| 5 | The `astrowind:config` virtual module is `theme:config`; the integration is imported as `theme`, named `theme-integration`, and logs as `theme` | The slug is the template's name; the rename would have broken the import |
| 6 | `site:` is `https://astrowind.example.com` (the domain placeholder) and a deploy's `PUBLIC_SITE_URL` wins over it (`vendor/integration/utils/configBuilder.ts`); `googleSiteVerificationId` is empty | Upstream's own origin and Search Console id are not a product's; each deploy names its own origin |
| 7 | "Astrowind" in two home demos (startup, SaaS) is "AstroWind" | The leftover sweep fails on the slug's Pascal form; the template's own spelling elsewhere is "AstroWind" |
| 8 | npm `overrides` → pnpm `overrides` in `pnpm-workspace.yaml` | The same floors, in pnpm's form |
| 9 | `lint` is `eslint .` (the template's config, `.wrangler` ignored), `typecheck` is `astro check`; Prettier stays, as `pnpm --filter @app/web format` | The workspace's `typecheck` / `lint` / `test` contract |
| 10 | Tests: `src/test/site.test.ts`, `src/test/worker.test.ts` (vitest over Astro's container API) | The template ships none |
