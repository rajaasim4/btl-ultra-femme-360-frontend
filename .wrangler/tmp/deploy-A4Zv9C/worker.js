// worker.js
var worker_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);
    if (response.status === 404) {
      if (url.pathname.startsWith("/assets/") || url.pathname.includes(".")) {
        return response;
      }
      return await env.ASSETS.fetch(new Request(`${url.origin}/index.html`));
    }
    return response;
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
