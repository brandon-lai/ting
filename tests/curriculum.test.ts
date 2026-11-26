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
} from "../lib/curriculum"
import { freshProgress } from "../lib/progress"
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
