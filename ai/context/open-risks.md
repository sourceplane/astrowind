# astrowind — open risks

What is not yet proven or not yet decided. The full write-up of every risk,
including the accepted and resolved ones, is
`specs/epics/astrowind/risks-and-open-questions.md`; this page lists
only what is still live, so it should be short.

| ID | Risk | State | What closes it |
|---|---|---|---|
| AW-A | `baseline-v1` is not yet proven live; it is proven offline in Baseline CI (the offline bootstrap, the stage lane's own steps, the site served and smoke-tested) | OPEN | One console bootstrap from `baseline-v1` |

Accepted, and worth knowing before you change them: AW-B (a Worker in front
of a static site), AW-C (absolute links are built in, per environment), AW-D
(the tests live in the app), AW-E (the build fetches its font over the
network), AW-F (stack-tectonic 0.19.0), AW-G (the slug is the template's
name).
