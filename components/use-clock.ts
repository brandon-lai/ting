"use client"
import { useEffect, useState } from "react"
import type { Progress } from "@/lib/types"

export function useClock(cards: Progress["cards"]) {
  const [now, setNow] = useState(0)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      clearTimeout(timer)
      const time = Date.now()
      setNow(time)
      const tomorrow = new Date(time)
      tomorrow.setHours(24, 0, 0, 0)
      const next = Object.values(cards).reduce(
        (next, card) => (card.due > time ? Math.min(card.due, next) : next),
        tomorrow.getTime()
      )
      timer = setTimeout(tick, next - time)
    }
    timer = setTimeout(tick, 0)
    document.addEventListener("visibilitychange", tick)
    window.addEventListener("pageshow", tick)
    return () => {
      clearTimeout(timer)
      document.removeEventListener("visibilitychange", tick)
      window.removeEventListener("pageshow", tick)
    }
  }, [cards])
  return now
}
