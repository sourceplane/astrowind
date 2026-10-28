# astrowind — implementation plan

Three milestones, each one reviewed pull request (AW0 is the repository's
first commit), each green before it merges.

## AW0 — the spec (AW-1)

The repository is born: `intent.yaml` with the placeholder workspace
`ws_CHANGE_ME`, `ci.yml` (byte for byte turso-starter's, which plans nothing
until the workspace is set), the shared TypeScript and ESLint configuration,
the spec index, this doc set and the task contracts.

## AW1 — the site on Workers (AW-2)

- The template's `src/`, `public/`, `vendor/`, `astro.config.ts`, ESLint and
  Prettier configuration in `apps/web`, its dependencies in
  `apps/web/package.json`, its npm `overrides` as pnpm `overrides`.
- `worker/index.ts` and `wrangler.jsonc`: the Worker in front of `dist/`,
  clean URLs, the 404 page.
- The site's name in `src/site.ts`, read by the theme's config builder; the
  theme's virtual module and integration renamed `theme`.
- `component.yaml`: the deploy contract and its smoke.
- Tests (`src/test`): the name seam, the header, the Worker.
- The README's "How it maps to Vercel".

## AW2 — a baseline (AW-3)

astro-boilerplate's machinery, renamed: `blueprint.yaml`,
`repo-blueprint.yaml`, `.baseline/` (identity, product README, task
contracts), `tooling/rebrand` (with the template's credit masked),
`tooling/bootstrap`, `hooks/render-deployment-docs.sh` (probing `/` and
`/blog`), `docs/phases/`, the context pack, `testing/` (the leak and
placement gates on this tree's files; the e2e tier reading every route the
site promises) and `baseline.yml` / `tag.yml`.
