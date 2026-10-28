# astrowind — Vercel's AstroWind template on Cloudflare Workers

**AstroWind builds fully static, so the port is where it is served: `dist/`
as Cloudflare Workers Static Assets behind one small Worker, deployed by Orun
to stage and prod on every merge — and the baseline that makes a copy of it
somebody else's site in one landing.**

| | |
|---|---|
| Status | In progress — AW1 on main: the site runs on Workers |
| Upstream | [arthelokyo/astrowind](https://github.com/arthelokyo/astrowind) (MIT), at `14e1a69` (2026-09-12) |
| Reference | [astro-boilerplate](https://github.com/sourceplane/astro-boilerplate) — the same scaffolding, tests and bootstrap |
| Key | `AW` |

## Read in this order

1. [design.md](design.md) — the template, how each Vercel piece maps to
   Cloudflare, the repository and the build, and the alternative rejected.
2. [implementation-plan.md](implementation-plan.md) — the milestones and
   what each one lands.
3. [risks-and-open-questions.md](risks-and-open-questions.md) — what is not
   proven, and what was accepted.
4. [IMPLEMENTATION-STATUS.md](IMPLEMENTATION-STATUS.md) — what shipped, and
   every departure from the upstream template.

## Milestones

| Milestone | What it lands | Task |
|---|---|---|
| AW0 — the spec | the repository, its intent, CI, tooling and spec index; this doc set | AW-1 |
| AW1 — the site on Workers | the template in `apps/web`, built static, served as assets behind one Worker | AW-2 |
| AW2 — a baseline | the console card, the build document, the context pack and the baseline's tests | AW-3 |
