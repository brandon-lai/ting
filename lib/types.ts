export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type Skill = "vocabulary" | "grammar" | "listening" | "reading"
export type Rating = "again" | "hard" | "good" | "easy"

export interface Word {
  id: string
  hanzi: string
  pinyin: string
  en: string
  exampleZh: string
  examplePinyin: string
  exampleEn: string
  cloze: string
  topics: string[]
  level: Level
  officialLevel: number | "7-9"
}

export interface GrammarPoint {
  id: string
  level: Level
  title: string
  pattern: string
  explanation: string
  exampleZh: string
  examplePinyin: string
  exampleEn: string
  tokens: string[]
  cloze: string
  options: string[]
  answer: number
  why: string
}

export interface ReadingPassage {
  id: string
  level: Level
  title: string
  text: string
  translation: string
  questions: {
    prompt: string
    options: string[]
    answer: number
    explanation: string
  }[]
}

export interface SpeakingTask {
  id: string
  level: Level
  title: string
  prompt: string
  supportZh: string
  supportPinyin: string
  supportEn: string
  seconds: number
  tips: string[]
}

export interface Video {
  id: string
  title: string
  creator: string
  levels: Level[]
  task: string
  source: string
}

export interface Question {
  id: string
  skill: Skill
  prompt: string
  text?: string
  audio?: string
  options: string[]
  answer: number
  explanation: string
  wordId?: string
}

export interface ReviewCard {
  due: number
  interval: number
  ease: number
  repetitions: number
  lapses: number
  last: number
}

export interface ExamAttempt {
  id: string
  level: Level
  timestamp: number
  percent: number
  correct: number
  total: number
  skills: Record<Skill, { correct: number; total: number }>
  mistakes: { question: Question; selected: number | null }[]
}

export interface SessionDraft {
  level: Level
  lesson: number
  step: number
  wordIndex: number
  checkpoint: number
  answers: Record<string, number>
  reviewIds: string[]
  started: number
}

export interface ExamDraft {
  level: Level
  seed: number
  questions: Question[]
  answers: Record<string, number>
  position: number
  started: number
  deadline: number
}

export interface Progress {
  schema: 1
  level: Level
  onboarded: boolean
  pinyin: boolean
  speechRate: number
  lessons: Record<string, { completed: number; score: number }>
  cards: Record<string, ReviewCard>
  attempts: ExamAttempt[]
  activity: Record<string, number>
  session: SessionDraft | null
  exam: ExamDraft | null
  updated: number
}
