import { z } from "zod"
import { asLevel, lessonCount, levels } from "./curriculum"
import type {
  ExamAttempt,
  ExamDraft,
  Progress,
  Rating,
  ReviewCard,
  Skill,
} from "./types"

const timestamp = z.number().finite().min(0).max(8640000000000000)
const level = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
  z.literal(8),
  z.literal(9),
])
const answer = z.number().int().min(0).max(3)
const skill = z.enum(["vocabulary", "grammar", "listening", "reading"])
const wordKeys = z
  .string()
  .regex(/^hsk3-\d{5}$/)
  .refine((id) => Number(id.slice(5)) >= 1 && Number(id.slice(5)) <= 11000)
const question = z.object({
  id: z.string().min(1).max(120),
  skill,
  prompt: z.string().max(1000),
  text: z.string().max(8000).optional(),
  audio: z.string().max(8000).optional(),
  options: z.array(z.string().max(2000)).length(4),
  answer,
  explanation: z.string().max(8000),
  wordId: wordKeys.optional(),
})
const answers = z.record(z.string().max(120), answer)
const stat = z.object({
  correct: z.number().int().min(0).max(100),
  total: z.number().int().min(0).max(100),
})
const attempt = z
  .object({
    id: z.string().max(100),
    level,
    timestamp,
    percent: z.number().min(0).max(100),
    correct: z.number().int().min(0).max(100),
    total: z.number().int().min(1).max(100),
    skills: z.object({
      vocabulary: stat,
      grammar: stat,
      listening: stat,
      reading: stat,
    }),
    mistakes: z
      .array(z.object({ question, selected: answer.nullable() }))
      .max(100),
  })
  .refine(
    (item) =>
      item.correct <= item.total &&
      item.percent === Math.round((item.correct * 100) / item.total) &&
      Object.values(item.skills).every((s) => s.correct <= s.total) &&
      Object.values(item.skills).reduce((sum, s) => sum + s.total, 0) ===
        item.total &&
      Object.values(item.skills).reduce((sum, s) => sum + s.correct, 0) ===
        item.correct &&
      item.mistakes.length === item.total - item.correct,
    "The mock result totals do not agree."
  )

function hasUnsafeKeys(value: unknown) {
  const pending = [value]
  const seen = new WeakSet<object>()
  while (pending.length) {
    const item = pending.pop()
    if (!item || typeof item !== "object" || seen.has(item)) continue
    seen.add(item)
    for (const [key, child] of Object.entries(item)) {
      if (key === "__proto__" || key === "prototype" || key === "constructor")
        return true
      if (child && typeof child === "object") pending.push(child)
    }
  }
  return false
}

export const progressSchema = z
  .unknown()
  .refine(
    (value) => !hasUnsafeKeys(value),
    "Unsafe keys are not valid study data."
  )
  .pipe(
    z.object({
      schema: z.literal(1),
      level,
      onboarded: z.boolean(),
      pinyin: z.boolean(),
      speechRate: z.number().min(0.5).max(1.2),
      lessons: z
        .record(
          z.string().regex(/^[1-9]-(0|[1-9]\d{0,2})$/),
          z.object({ completed: timestamp, score: z.number().min(0).max(100) })
        )
        .refine(
          (entries) => Object.keys(entries).length <= 1376,
          "Too many lesson records."
        ),
      cards: z
        .record(
          wordKeys,
          z.object({
            due: timestamp,
            interval: z.number().min(0).max(36500),
            ease: z.number().min(1.3).max(3),
            repetitions: z.number().int().min(0).max(100000),
            lapses: z.number().int().min(0).max(100000),
            last: timestamp,
          })
        )
        .refine(
          (entries) => Object.keys(entries).length <= 11000,
          "Too many review cards."
        ),
      attempts: z.array(attempt).max(50),
      activity: z.record(
        z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        z.number().int().min(0).max(100000)
      ),
      session: z
        .object({
          level,
          lesson: z.number().int().min(0).max(233),
          step: z.number().int().min(0).max(5),
          wordIndex: z.number().int().min(0).max(7),
          checkpoint: z.number().int().min(0).max(5),
          answers,
          reviewIds: z.array(wordKeys).max(4),
          started: timestamp,
        })
        .nullable(),
      exam: z
        .object({
          level,
          seed: z.number().int().min(0).max(4294967295),
          questions: z.array(question).min(1).max(100),
          answers,
          position: z.number().int().min(0).max(99),
          started: timestamp,
          deadline: timestamp,
        })
        .nullable(),
      updated: timestamp,
    })
  )
  .superRefine((p, context) => {
    const invalid = (path: (string | number)[], message: string) =>
      context.addIssue({ code: "custom", path, message })
    for (const key of Object.keys(p.lessons)) {
      const [l, index] = key.split("-").map(Number)
      if (index >= lessonCount(asLevel(l)))
        invalid(["lessons", key], "This lesson does not exist.")
    }
    if (p.session) {
      const s = p.session
      const wordCount = Math.min(8, levels[s.level - 1].count - s.lesson * 8)
      if (
        s.lesson >= lessonCount(s.level) ||
        (s.step === 1 && s.wordIndex >= wordCount) ||
        (s.step === 0 && s.wordIndex > s.reviewIds.length)
      )
        invalid(
          ["session"],
          "The saved lesson or word position does not exist."
        )
      if (s.checkpoint >= Math.min(4, wordCount) + 1)
        invalid(
          ["session", "checkpoint"],
          "The checkpoint position does not exist."
        )
      if (new Set(s.reviewIds).size !== s.reviewIds.length)
        invalid(["session", "reviewIds"], "Review words must be distinct.")
    }
    if (p.exam) {
      const e = p.exam
      const ids = new Set(e.questions.map((q) => q.id))
      if (e.position >= e.questions.length || ids.size !== e.questions.length)
        invalid(
          ["exam"],
          "The mock question position or identifiers are invalid."
        )
      if (Object.keys(e.answers).some((id) => !ids.has(id)))
        invalid(["exam", "answers"], "An answer refers to an unknown question.")
      if (e.deadline < e.started)
        invalid(
          ["exam", "deadline"],
          "The deadline must follow the start time."
        )
    }
  })

export function freshProgress(): Progress {
  return {
    schema: 1,
    level: 1,
    onboarded: false,
    pinyin: true,
    speechRate: 0.8,
    lessons: {},
    cards: {},
    attempts: [],
    activity: {},
    session: null,
    exam: null,
    updated: 0,
  }
}

const DAY = 86400000
export function schedule(
  card: ReviewCard | undefined,
  rating: Rating,
  now: number
): ReviewCard {
  const previous = card ?? {
    due: now,
    interval: 0,
    ease: 2.5,
    repetitions: 0,
    lapses: 0,
    last: 0,
  }
  if (rating === "again")
    return {
      ...previous,
      due: now + 600000,
      interval: 0,
      ease: Math.max(1.3, previous.ease - 0.2),
      repetitions: 0,
      lapses: previous.lapses + 1,
      last: now,
    }
  const ease = Math.min(
    3,
    Math.max(
      1.3,
      previous.ease + (rating === "easy" ? 0.15 : rating === "hard" ? -0.15 : 0)
    )
  )
  const interval =
    previous.repetitions === 0
      ? rating === "easy"
        ? 4
        : rating === "hard"
          ? 0.5
          : 1
      : previous.repetitions === 1
        ? rating === "hard"
          ? Math.max(1, previous.interval * 1.2)
          : rating === "easy"
            ? 8
            : 3
        : Math.min(
            36500,
            Math.max(
              previous.interval + 1,
              Math.round(
                previous.interval *
                  (rating === "hard"
                    ? 1.2
                    : rating === "easy"
                      ? ease * 1.3
                      : ease)
              )
            )
          )
  return {
    due: now + interval * DAY,
    interval,
    ease,
    repetitions: previous.repetitions + 1,
    lapses: previous.lapses,
    last: now,
  }
}

export function dueIds(progress: Progress, now: number) {
  return Object.entries(progress.cards)
    .filter(([, c]) => c.due <= now)
    .sort((a, b) => a[1].due - b[1].due)
    .map(([id]) => id)
}

export function isMastered(card: ReviewCard | undefined) {
  return Boolean(card && card.repetitions >= 3 && card.interval >= 7)
}

export function activityDay(now: number) {
  const date = new Date(now)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

export function streak(progress: Progress, now: number) {
  const date = new Date(now)
  if (!progress.activity[activityDay(date.getTime())])
    date.setDate(date.getDate() - 1)
  let count = 0
  while (progress.activity[activityDay(date.getTime())]) {
    count++
    date.setDate(date.getDate() - 1)
  }
  return count
}

export function scoreExam(exam: ExamDraft, now: number): ExamAttempt {
  const skills: Record<Skill, { correct: number; total: number }> = {
    vocabulary: { correct: 0, total: 0 },
    grammar: { correct: 0, total: 0 },
    listening: { correct: 0, total: 0 },
    reading: { correct: 0, total: 0 },
  }
  const mistakes: ExamAttempt["mistakes"] = []
  let correct = 0
  for (const q of exam.questions) {
    const selected = exam.answers[q.id] ?? null
    skills[q.skill].total++
    if (selected === q.answer) {
      correct++
      skills[q.skill].correct++
    } else mistakes.push({ question: q, selected })
  }
  return {
    id: `exam-${exam.seed}-${exam.started}`,
    level: exam.level,
    timestamp: now,
    percent: Math.round((correct * 100) / exam.questions.length),
    correct,
    total: exam.questions.length,
    skills,
    mistakes,
  }
}

export function repairPlan(attempt: ExamAttempt) {
  const suggestions = {
    vocabulary:
      "Review the missed words without pinyin. Recall meaning before revealing.",
    grammar: "Rebuild the sentence, then explain why the missing word fits.",
    listening:
      "Listen once without text, summarize, then replay with the transcript.",
    reading: "Read a passage and point to the sentence supporting each answer.",
  }
  return (
    Object.entries(attempt.skills) as [
      Skill,
      { correct: number; total: number },
    ][]
  )
    .filter(([, s]) => s.total > 0 && s.correct / s.total < 0.8)
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
    .map(([skill]) => ({ skill, advice: suggestions[skill] }))
}
