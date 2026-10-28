# astrowind — risks and open questions

| ID | Risk | State | Notes |
|---|---|---|---|
| AW-A | `baseline-v1` is not yet proven live | OPEN | Proven offline in Baseline CI: the offline bootstrap with the blueprint's own hooks, the stage lane's own steps in a staged job tree, the site served by `wrangler dev` and smoke-tested with the component's own command. A console bootstrap closes it |
| AW-B | A Worker in front of a static site | ACCEPTED | The composition deploys a Worker with its assets; this one only hands unmatched requests back to the assets. It costs nothing a request that matches a file pays: those are served without reaching it |
| AW-C | Absolute links are built in, per environment | ACCEPTED | Canonical links, the sitemap and the RSS feed carry the origin the deploy built for: the environment's `SITE_URL` (a custom domain), else its workers.dev URL. Attaching a domain is setting `SITE_URL` and merging; a local build uses `src/config.yaml`'s `site:` |
| AW-D | The tests live in the app | ACCEPTED | Astro components render only under Astro's Vite config (the container API); a `tests/web` package would need it anyway |
| AW-E | The build fetches its font over the network | ACCEPTED | Astro's Fonts API downloads Inter from Fontsource at build time, as upstream; every lane has the network |
| AW-F | stack-tectonic 0.19.0, not 0.20.0 | ACCEPTED | 0.20.0's lane-shared install links each job's `node_modules` out of its tree; the siblings pin 0.19.0 for it and the site would save nothing |
| AW-G | The slug is the template's own name | RESOLVED | The theme's module and integration are `theme`; the template's credit (its repository, two post URLs) is masked from the rename and allowed in the leftover sweep. `testing/rebrand.test.sh` holds both |
