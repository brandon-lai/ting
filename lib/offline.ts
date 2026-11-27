export const SHELL_CACHE = "ting-shell-v1"
export const WORD_CACHE = "ting-words-2026-11-7"
export const shellRoutes = [
  "/",
  "/learn",
  "/study",
  "/library",
  "/review",
  "/practice",
  "/exams",
  "/settings",
  "/guide",
  "/privacy",
  "/terms",
]

let registration: Promise<ServiceWorkerRegistration> | undefined

export function registerOffline() {
  registration ??= navigator.serviceWorker
    .register("/sw.js", { scope: "/", updateViaCache: "none" })
    .catch((error: unknown) => {
      registration = undefined
      throw error
    })
  return registration
}

export async function cacheAppShell() {
  if (!("caches" in window) || !("serviceWorker" in navigator))
    throw new Error("Offline downloads are not supported in this browser.")
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    await Promise.race([
      registerOffline().then(() => navigator.serviceWorker.ready),
      new Promise<never>((_, reject) => {
        timer = setTimeout(
          () =>
            reject(
              new Error(
                "Offline mode did not start. Allow site storage, refresh online and retry the download."
              )
            ),
          10000
        )
      }),
    ])
  } finally {
    clearTimeout(timer)
  }
  const cache = await caches.open(SHELL_CACHE)
  const assets = new Set<string>()
  for (const route of shellRoutes) {
    const response = await fetch(route, { cache: "reload" })
    if (!response.ok)
      throw new Error(`The ${route} screen could not be saved offline.`)
    const html = await response.clone().text()
    await cache.put(route, response)
    const document = new DOMParser().parseFromString(html, "text/html")
    document.querySelectorAll("script[src],link[href]").forEach((element) => {
      const path = element.getAttribute("src") ?? element.getAttribute("href")
      if (path?.startsWith("/_next/static/")) assets.add(path)
    })
  }
  await Promise.all(
    [...assets].map(async (path) => {
      const response = await fetch(path, { cache: "reload" })
      if (!response.ok)
        throw new Error(
          "An app asset could not be saved. Retry the offline download."
        )
      await cache.put(path, response)
    })
  )
}
