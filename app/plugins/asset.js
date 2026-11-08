// `$asset('/assets/...')` - prefixes a /public file with the app's base URL.
//
// Absolute `src="/assets/..."` paths only work when the site is served from
// the domain root. Deployed under a sub-path (GitHub Pages serves this repo at
// `/academy/`, set through NUXT_APP_BASE_URL), they must carry that prefix.
export default defineNuxtPlugin(() => {
  const { app } = useRuntimeConfig();
  const base = app.baseURL.endsWith("/") ? app.baseURL : `${app.baseURL}/`;

  return {
    provide: {
      asset: (path) => `${base}${String(path).replace(/^\/+/, "")}`,
    },
  };
});
