const SHELL = "ting-shell-v1";
const WORDS = "ting-words-2026-11-7";
const routes = new Set(["/", "/learn", "/study", "/library", "/review", "/practice", "/exams", "/settings", "/guide", "/privacy", "/terms"]);

async function readCache(name, key) {
  try {
    return await caches.match(key, { cacheName: name });
  } catch (error) {
    console.warn("Offline cache could not be read:", error.name);
  }
}

async function remember(key, response) {
  if (response.ok) {
    try {
      const cache = await caches.open(SHELL);
      await cache.put(key, response.clone());
    } catch (error) {
      console.warn("Offline cache could not be updated:", error.name);
    }
  }
  return response;
}

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || url.pathname.startsWith("/api/") || url.pathname.startsWith("/auth/")) return;
  if (/^\/curriculum\/level-[1-9]\.json$/.test(url.pathname)) {
    event.respondWith((async () => {
      const saved = request.cache !== "reload" && await readCache(WORDS, url.pathname);
      if (saved) return saved;
      return fetch(request);
    })());
    return;
  }
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith((async () => {
      const saved = await readCache(SHELL, request);
      if (saved) return saved;
      return remember(request, await fetch(request));
    })());
    return;
  }
  if (request.mode === "navigate" && routes.has(url.pathname)) {
    event.respondWith((async () => {
      try {
        return await remember(url.pathname, await fetch(request));
      } catch {
        const saved = await readCache(SHELL, url.pathname);
        if (saved) return saved;
        return new Response("This screen is not downloaded yet. Reconnect and save a level offline in Ting Settings.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
      }
    })());
  }
});
