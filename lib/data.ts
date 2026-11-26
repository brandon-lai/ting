import { z } from "zod"
import type { Level, Word } from "./types"

const wordSchema = z.object({
  id: z.string(),
  hanzi: z.string(),
  pinyin: z.string(),
  en: z.string(),
  exampleZh: z.string(),
  examplePinyin: z.string(),
  exampleEn: z.string(),
  cloze: z.string(),
  topics: z.array(z.string()),
  level: z.number().int().min(1).max(9),
  officialLevel: z.union([z.number(), z.literal("7-9")]),
})
const cache = new Map<Level, Promise<Word[]>>()

export function loadWords(level: Level): Promise<Word[]> {
  const existing = cache.get(level)
  if (existing) return existing
  const request = fetch(`/curriculum/level-${level}.json`)
    .then(async (response) => {
      if (!response.ok)
        throw new Error(
          `Could not load HSK ${level} (HTTP ${response.status}). Connect to the internet and try again.`
        )
      const result = z.array(wordSchema).safeParse(await response.json())
      if (!result.success)
        throw new Error(
          `The HSK ${level} download is damaged. Remove its offline download and retry.`
        )
      return result.data as Word[]
    })
    .catch((error: unknown) => {
      cache.delete(level)
      if (error instanceof TypeError)
        throw new Error(
          `The level ${level} download is unavailable. Connect to the internet and retry, or use a level you downloaded in Settings.`,
          { cause: error }
        )
      if (error instanceof SyntaxError)
        throw new Error(
          `The level ${level} download is damaged. Remove its offline download in Settings and retry.`,
          { cause: error }
        )
      throw error
    })
  cache.set(level, request)
  return request
}

export async function loadThrough(level: Level) {
  return (
    await Promise.all(
      Array.from({ length: level }, (_, i) => loadWords((i + 1) as Level))
    )
  ).flat()
}
