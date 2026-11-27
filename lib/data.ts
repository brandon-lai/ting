import { z } from "zod"
import { levels } from "./curriculum"
import type { Level, Word } from "./types"

const wordSchema = z.object({
  id: z.string().regex(/^hsk3-\d{5}$/),
  hanzi: z.string().min(1),
  pinyin: z.string().min(1),
  en: z.string().min(1),
  exampleZh: z.string().min(1),
  examplePinyin: z.string(),
  exampleEn: z.string().min(1),
  cloze: z.string(),
  topics: z.array(z.string()),
  level: z.literal([1, 2, 3, 4, 5, 6, 7, 8, 9]),
  officialLevel: z.union([z.number(), z.literal("7-9")]),
})
const cache = new Map<Level, Promise<Word[]>>()

export function parseWordPack(level: Level, input: unknown): Word[] {
  const { count, cumulative } = levels[level - 1]
  const result = z.array(wordSchema).length(count).safeParse(input)
  if (result.success) {
    const ids = new Set<string>()
    const valid = result.data.every((word) => {
      const n = Number(word.id.slice(5))
      ids.add(word.id)
      return (
        word.level === level &&
        word.officialLevel === (level <= 6 ? level : "7-9") &&
        n > cumulative - count &&
        n <= cumulative
      )
    })
    if (valid && ids.size === count) return result.data
  }
  throw new Error(
    `The stage ${level} word download is incomplete or damaged. Remove its offline download in Settings and retry online.`
  )
}

export function loadWords(level: Level): Promise<Word[]> {
  const existing = cache.get(level)
  if (existing) return existing
  const request = fetch(`/curriculum/level-${level}.json`)
    .then(async (response) => {
      if (!response.ok)
        throw new Error(
          `Could not load HSK ${level} (HTTP ${response.status}). Connect to the internet and try again.`
        )
      return parseWordPack(level, await response.json())
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
