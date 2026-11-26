"use client"
import { useEffect, useState } from "react"
import { loadWords } from "@/lib/data"
import type { Level, Word } from "@/lib/types"

export function useWords(level: Level) {
  const [data, setData] = useState<{
    level: Level
    words: Word[]
    error: string | null
  } | null>(null)
  const [retry, setRetry] = useState(0)
  useEffect(() => {
    let active = true
    loadWords(level)
      .then((words) => {
        if (active) setData({ level, words, error: null })
      })
      .catch((error: unknown) => {
        if (active)
          setData({
            level,
            words: [],
            error:
              error instanceof Error
                ? error.message
                : "Vocabulary could not be loaded.",
          })
      })
    return () => {
      active = false
    }
  }, [level, retry])
  const current = data?.level === level ? data : null
  return {
    words: current?.words ?? [],
    loading: !current,
    error: current?.error ?? null,
    retry: () => setRetry((n) => n + 1),
  }
}
