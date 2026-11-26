"use client"
import { useEffect, useState } from "react"

export function useClock() {
  const [now, setNow] = useState(0)
  useEffect(() => {
    const tick = () => setNow(Date.now())
    const initial = setTimeout(tick, 0)
    const interval = setInterval(tick, 1000)
    return () => {
      clearTimeout(initial)
      clearInterval(interval)
    }
  }, [])
  return now
}
