import { grammar, readings, speaking } from "./content"
import type { Level, Progress, Question, Word } from "./types"

export const levels = [
  {
    level: 1,
    name: "First conversations",
    subtitle: "Meet people. Find your words.",
    count: 300,
    cumulative: 300,
  },
  {
    level: 2,
    name: "Your everyday Chinese",
    subtitle: "Make plans and get around.",
    count: 200,
    cumulative: 500,
  },
  {
    level: 3,
    name: "Tell your story",
    subtitle: "Share experiences and opinions.",
    count: 500,
    cumulative: 1000,
  },
  {
    level: 4,
    name: "Keep the conversation going",
    subtitle: "Explain, compare and connect.",
    count: 1000,
    cumulative: 2000,
  },
  {
    level: 5,
    name: "See the bigger picture",
    subtitle: "Follow stories and discuss ideas.",
    count: 1600,
    cumulative: 3600,
  },
  {
    level: 6,
    name: "Think in Chinese",
    subtitle: "Read between the lines.",
    count: 1800,
    cumulative: 5400,
  },
  {
    level: 7,
    name: "Build your argument",
    subtitle: "Advanced study stage: articulate.",
    count: 1872,
    cumulative: 7272,
  },
  {
    level: 8,
    name: "Find the nuance",
    subtitle: "Advanced study stage: evaluate.",
    count: 1872,
    cumulative: 9144,
  },
  {
    level: 9,
    name: "Speak with precision",
    subtitle: "Advanced study stage: synthesize.",
    count: 1856,
    cumulative: 11000,
  },
] satisfies {
  level: Level
  name: string
  subtitle: string
  count: number
  cumulative: number
}[]

export const itinerary = [
  { name: "Remember", minutes: 5, detail: "Bring yesterday's words back." },
  { name: "Learn", minutes: 8, detail: "Eight new words, in real sentences." },
  { name: "Build", minutes: 5, detail: "Make a sentence that works." },
  {
    name: "Listen",
    minutes: 5,
    detail: "Hear the meaning, not just the sounds.",
  },
  { name: "Say it", minutes: 5, detail: "Make the Chinese your own." },
  { name: "Check", minutes: 2, detail: "Recall it before you go." },
]

export function asLevel(
  value: string | number | null | undefined,
  fallback: Level = 1
): Level {
  const number = Number(value)
  return levels.find((l) => l.level === number)?.level ?? fallback
}

export function lessonCount(level: Level) {
  return Math.ceil(levels[level - 1].count / 8)
}

export function lessonKey(level: Level, index: number) {
  return `${level}-${index}`
}

export function nextLesson(progress: Progress, level = progress.level) {
  for (let i = 0; i < lessonCount(level); i++) {
    if (!progress.lessons[lessonKey(level, i)]) return i
  }
  return null
}

export function dailyRecommendation(progress: Progress) {
  const { level, session, exam } = progress
  if (exam) return { kind: "mock", level: exam.level, resume: true } as const
  if (session)
    return {
      kind: "lesson",
      level: session.level,
      index: session.lesson,
      resume: true,
    } as const
  const index = nextLesson(progress)
  if (index !== null)
    return { kind: "lesson", level, index, resume: false } as const
  const lastLesson = Math.max(
    ...Object.entries(progress.lessons)
      .filter(([key]) => key.startsWith(`${level}-`))
      .map(([, lesson]) => lesson.completed)
  )
  const attempt = progress.attempts.find((attempt) => attempt.level === level)
  if (
    !attempt ||
    attempt.timestamp < lastLesson ||
    attempt.percent < examSpec(level).target
  )
    return { kind: "mock", level, resume: false } as const
  const next = levels[level]
  return next
    ? ({ kind: "next-stage", level: next.level } as const)
    : ({ kind: "review", level } as const)
}

export function completedCount(progress: Progress, level: Level) {
  return Object.keys(progress.lessons).filter((key) =>
    key.startsWith(`${level}-`)
  ).length
}

export function lessonGrammar(level: Level, index: number) {
  const points = grammar.filter((g) => g.level === level)
  return points[
    Math.floor((index * points.length) / lessonCount(level)) % points.length
  ]
}

export function lessonSpeaking(level: Level, index: number) {
  const tasks = speaking.filter((s) => s.level === level)
  return tasks[index % tasks.length]
}

export function lessonWords(words: Word[], index: number) {
  return words.slice(index * 8, index * 8 + 8)
}

export function lessonTitle(level: Level, index: number) {
  if (level === 1 && index === 0) return "Hello, nice to meet you"
  return lessonGrammar(level, index).title
}

export function random(seed: number) {
  let value = seed >>> 0
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0
    return value / 4294967296
  }
}

export function shuffle<T>(items: T[], rng: () => number): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function wordQuestion(
  word: Word,
  pool: Word[],
  seed: number,
  listening = false
): Question {
  const rng = random(seed)
  const correct = listening ? word.exampleEn : word.en
  const distractors = [
    ...new Set(
      shuffle(
        pool.filter((w) => w.hanzi !== word.hanzi),
        rng
      )
        .map((w) => (listening ? w.exampleEn : w.en))
        .filter((definition) => definition !== correct)
    ),
  ].slice(0, 3)
  if (distractors.length < 3)
    throw new Error("Not enough distinct vocabulary distractors.")
  const options = shuffle([correct, ...distractors], rng)
  return {
    id: `${listening ? "listen" : "word"}-${word.id}-${seed}`,
    skill: listening ? "listening" : "vocabulary",
    prompt: listening
      ? "Listen to the sentence. What does it mean?"
      : "Recall the meaning of this word.",
    text: listening ? undefined : word.hanzi,
    audio: listening ? word.exampleZh : undefined,
    options,
    answer: options.indexOf(correct),
    explanation: `${word.hanzi} (${word.pinyin}): ${word.en}. ${word.exampleZh} ${word.exampleEn}`,
    wordId: word.id,
  }
}

export function checkpointQuestions(
  level: Level,
  index: number,
  words: Word[],
  pool: Word[]
) {
  const point = lessonGrammar(level, index)
  return [
    ...words
      .slice(0, 4)
      .map((word, i) =>
        wordQuestion(word, pool, 1000 + index * 10 + i, i === 3)
      ),
    {
      id: `grammar-${point.id}`,
      skill: "grammar" as const,
      prompt: "Choose the word that completes the sentence.",
      text: point.cloze,
      options: point.options,
      answer: point.answer,
      explanation: point.why,
    },
  ]
}

export function examSpec(level: Level) {
  return {
    questions: level <= 2 ? 40 : level <= 4 ? 60 : level <= 6 ? 80 : 100,
    minutes: level <= 2 ? 30 : level <= 4 ? 40 : level <= 6 ? 55 : 70,
    target: 80,
  }
}

export function buildExam(
  level: Level,
  words: Word[],
  seed: number
): Question[] {
  const rng = random(seed)
  const eligible = words.filter((w) => w.level <= level)
  const current = eligible.filter((w) => w.level === level)
  const { questions: count } = examSpec(level)
  const result: Question[] = []
  const passages = shuffle(
    readings.filter((r) => r.level === level),
    rng
  )
  const passageCount = Math.min(
    4,
    Math.floor(count / 20),
    Math.floor(passages.length / 2)
  )
  for (const [passageIndex, passage] of passages
    .slice(0, passageCount * 2)
    .entries()) {
    const listening = passageIndex >= passageCount
    passage.questions.forEach((q, i) => {
      result.push({
        id: `${passage.id}-${i}`,
        skill: listening ? "listening" : "reading",
        text: listening ? undefined : passage.text,
        audio: listening ? passage.text : undefined,
        prompt: q.prompt,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation,
      })
    })
  }
  for (const point of shuffle(
    grammar.filter((g) => g.level === level),
    rng
  )) {
    result.push({
      id: point.id,
      skill: "grammar",
      prompt: "Complete the sentence.",
      text: point.cloze,
      options: point.options,
      answer: point.answer,
      explanation: point.why,
    })
  }
  const remaining = count - result.length
  const earlier = eligible.filter((w) => w.level < level)
  const currentCount = earlier.length ? Math.ceil(remaining * 0.75) : remaining
  const selection = [
    ...shuffle(current, rng).slice(0, currentCount),
    ...shuffle(earlier, rng).slice(0, remaining - currentCount),
  ]
  const vocabularyCount = Math.round(count * 0.3)
  for (let i = 0; i < remaining; i++) {
    result.push(
      wordQuestion(
        selection[i % selection.length],
        eligible,
        seed + i,
        i >= vocabularyCount
      )
    )
  }
  return result.sort((a, b) => {
    const order = { listening: 0, vocabulary: 1, grammar: 2, reading: 3 }
    return order[a.skill] - order[b.skill]
  })
}
