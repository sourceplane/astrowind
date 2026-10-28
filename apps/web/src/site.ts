// The site's name, written once. The header's logo text, every page's <title>
// (the title template "%s — <name>"), the Open Graph site name and the
// default title all read SITE_NAME through the theme's config builder
// (vendor/integration/utils/configBuilder.ts), so src/config.yaml does not
// spell the name. Keep it a literal, double-quoted and on one line: renaming
// the site rewrites this line whole.
export const SITE_NAME = "AstroWind";
