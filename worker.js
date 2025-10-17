export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Try to fetch static asset first (e.g. /assets/index.js)
    let response = await env.ASSETS.fetch(request);

    // If not found (404), serve index.html for SPA routes
    if (response.status === 404) {
      // Don’t rewrite requests for static files that are genuinely missing
      if (url.pathname.startsWith("/assets/") || url.pathname.includes(".")) {
        return response;
      }

      // Return index.html for routes like /login, /about, etc.
      return await env.ASSETS.fetch(new Request(`${url.origin}/index.html`));
    }

    return response;
  },
};
