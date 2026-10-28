// The site's Worker. AstroWind builds fully static (`output: 'static'`), so
// there is no server code: every page, feed, sitemap and image is a file in
// dist/, uploaded as Workers Static Assets. A request that matches a file is
// served from the assets without reaching this Worker; one that does not is
// handed back to the assets binding, which answers with the site's own
// 404 page (`not_found_handling: "404-page"` in wrangler.jsonc).
//
// It exists because a Workers + Static Assets deploy has a Worker in front
// of the assets — the place a redirect, a header or an API route goes when
// the site needs one.
interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
  fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(request);
  },
};
