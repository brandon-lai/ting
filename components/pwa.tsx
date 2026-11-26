"use client"
import { useEffect } from "react"

export function PwaRegistration() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator)
    )
      return
    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .catch((error: unknown) => {
        console.error(
          "Offline registration failed:",
          error instanceof Error ? error.message : "Unknown error"
        )
        window.dispatchEvent(new CustomEvent("ting:offline-error"))
      })
    const navigateOffline = (event: MouseEvent) => {
      if (
        navigator.onLine ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return
      const target = event.target
      const link =
        target instanceof Element
          ? target.closest<HTMLAnchorElement>("a[href]")
          : null
      if (!link || link.target || link.hasAttribute("download")) return
      const url = new URL(link.href)
      if (
        url.origin !== location.origin ||
        url.pathname.startsWith("/api/") ||
        url.pathname.startsWith("/auth/")
      )
        return
      event.preventDefault()
      location.assign(url.href)
    }
    document.addEventListener("click", navigateOffline, true)
    return () => document.removeEventListener("click", navigateOffline, true)
  }, [])
  return null
}
