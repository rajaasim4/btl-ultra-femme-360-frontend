export default {
  async fetch(request, env, ctx) {
    try {
      // Try to serve static assets first
      return await env.ASSETS.fetch(request);
    } catch (e) {
      // If file not found, return the index.html (for SPA routing like /login)
      const url = new URL(request.url);
      if (url.pathname.startsWith("/assets/") || url.pathname.includes(".")) {
        return new Response("Not found", { status: 404 });
      }
      return await env.ASSETS.fetch(new Request(`${url.origin}/index.html`));
    }
  },
};
