import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import {
  levels,
  lessonCount,
  lessonWords,
  buildExam,
  examSpec,
  nextLesson,
  lessonKey,
  dailyRecommendation,
} from "../lib/curriculum"
import { freshProgress, scoreExam } from "../lib/progress"
import { parseWordPack } from "../lib/data"
import type { Word } from "../lib/types"

const data = levels.map(
  (l) =>
    JSON.parse(
      readFileSync(
        new URL(`../public/curriculum/level-${l.level}.json`, import.meta.url),
        "utf8"
      )
    ) as Word[]
)
const all = data.flat()

test("every syllabus entry belongs to exactly one complete lesson sequence", () => {
  assert.equal(all.length, 11000)
  assert.equal(new Set(all.map((w) => w.id)).size, 11000)
  const assigned: string[] = []
  for (const l of levels) {
    assert.equal(data[l.level - 1].length, l.count)
    for (let i = 0; i < lessonCount(l.level); i++) {
      const words = lessonWords(data[l.level - 1], i)
      assert.ok(words.length >= 1 && words.length <= 8)
      assigned.push(...words.map((w) => w.id))
      words.forEach((w) =>
        assert.ok(w.hanzi && w.pinyin && w.en && w.exampleZh && w.exampleEn)
      )
    }
  }
  assert.deepEqual(assigned.sort(), all.map((w) => w.id).sort())
})

test("next recommendation follows actual completion, not a fabricated lock", () => {
  const p = freshProgress()
  assert.equal(nextLesson(p), 0)
  p.lessons[lessonKey(1, 0)] = { completed: 1, score: 50 }
  p.lessons[lessonKey(1, 2)] = { completed: 2, score: 100 }
  assert.equal(nextLesson(p), 1)
  for (let i = 0; i < lessonCount(1); i++)
    p.lessons[lessonKey(1, i)] = { completed: 3, score: 80 }
  assert.equal(nextLesson(p), null)
})

test("stage packs reject incomplete, repeated or misplaced words before lesson rendering", () => {
  for (const { level, count } of levels)
    assert.equal(parseWordPack(level, data[level - 1]).length, count)
  const one = data[0]
  for (const pack of [
    [],
    one.slice(1),
    [one[1], ...one.slice(1)],
    [data[1][0], ...one.slice(1)],
    [{ ...one[0], id: "hsk3-01500" }, ...one.slice(1)],
  ])
    assert.throws(() => parseWordPack(1, pack), /incomplete or damaged/)
})

test("completed stages lead to a mock, the next stage or final maintenance; active mocks take priority", () => {
  for (const level of [1, 9] as const) {
    const p = freshProgress()
    p.level = level
    for (let i = 0; i < lessonCount(level); i++)
      p.lessons[lessonKey(level, i)] = { completed: 4, score: 80 }
    assert.deepEqual(dailyRecommendation(p), {
      kind: "mock",
      level,
      resume: false,
    })
    const questions = buildExam(level, all, 7)
    p.exam = {
      level,
      seed: 7,
      questions,
      started: 5,
      deadline: 25,
      position: 0,
      answers: {},
    }
    assert.deepEqual(dailyRecommendation(p), {
      kind: "mock",
      level,
      resume: true,
    })
    p.attempts = [scoreExam(p.exam, 10)]
    p.exam.answers = Object.fromEntries(questions.map((q) => [q.id, q.answer]))
    const pass = scoreExam(p.exam, 20)
    p.exam = null
    assert.equal(dailyRecommendation(p).kind, "mock")
    p.attempts.unshift(pass)
    assert.deepEqual(
      dailyRecommendation(p),
      level === 1
        ? { kind: "next-stage", level: 2 }
        : { kind: "review", level: 9 }
    )
  }
})

test("all nine mocks have deterministic, distinct choices and connected reading", () => {
  for (const level of levels) {
    const exam = buildExam(level.level, all, 147)
    assert.equal(exam.length, examSpec(level.level).questions)
    assert.equal(new Set(exam.map((q) => q.id)).size, exam.length)
    assert.deepEqual(exam, buildExam(level.level, all, 147))
    assert.notDeepEqual(exam, buildExam(level.level, all, 148))
    for (const q of exam) {
      assert.equal(new Set(q.options).size, 4)
      assert.ok(q.options[q.answer])
      assert.ok(q.explanation)
    }
    for (const skill of ["listening", "vocabulary", "grammar", "reading"])
      assert.ok(exam.some((q) => q.skill === skill))
    assert.ok(
      exam.some((q) => q.skill === "reading" && (q.text?.length ?? 0) >= 40)
    )
    const connectedListening = exam.filter((q) => q.audio && !q.wordId)
    assert.ok(connectedListening.length >= 3)
    const readingTexts = new Set(
      exam.filter((q) => q.skill === "reading").map((q) => q.text)
    )
    assert.ok(connectedListening.every((q) => !readingTexts.has(q.audio)))
    assert.equal(
      exam.filter((q) => q.skill === "vocabulary").length,
      Math.round(exam.length * 0.3)
    )
    const wordItems = exam.filter((q) => q.wordId)
    const currentIds = new Set(data[level.level - 1].map((w) => w.id))
    assert.ok(
      wordItems.filter((q) => currentIds.has(q.wordId!)).length >=
        Math.ceil(wordItems.length * 0.75)
    )
  }
})
