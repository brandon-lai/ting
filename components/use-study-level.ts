"use client"

import { useSearchParams } from "next/navigation"
import { asLevel } from "@/lib/curriculum"
import { useLearning } from "./learning-provider"

export function useStudyLevel() {
  const { progress } = useLearning()
  const params = useSearchParams()
  const level = asLevel(params.get("level"), progress.level)
  function choose(value: string) {
    const url = new URL(window.location.href)
    url.searchParams.set("level", String(asLevel(value)))
    window.history.replaceState(null, "", url)
  }
  return [level, choose] as const
}
