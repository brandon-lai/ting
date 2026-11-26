const SHELL = "ting-shell-v1";
const WORDS = "ting-words-2026-11-7";
const routes = new Set(["/", "/learn", "/study", "/library", "/review", "/practice", "/exams", "/settings", "/guide", "/privacy", "/terms"]);

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || url.pathname.startsWith("/api/") || url.pathname.startsWith("/auth/")) return;
  if (/^\/curriculum\/level-[1-9]\.json$/.test(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(WORDS);
      const saved = await cache.match(url.pathname);
      if (saved) return saved;
      return fetch(request);
    })());
    return;
  }
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith((async () => {
      const cache = await caches.open(SHELL);
      const saved = await cache.match(request);
      if (saved) return saved;
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    })());
    return;
  }
  if (request.mode === "navigate" && routes.has(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(SHELL);
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(url.pathname, response.clone());
        return response;
      } catch {
        const saved = await cache.match(url.pathname);
        if (saved) return saved;
        return new Response("This screen is not downloaded yet. Reconnect and save a level offline in Ting Settings.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
      }
    })());
  }
});
