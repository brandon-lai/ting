import test from "node:test"
import assert from "node:assert/strict"
import {
  schedule,
  isMastered,
  dueIds,
  freshProgress,
  progressSchema,
  scoreExam,
  repairPlan,
  streak,
  activityDay,
  finishExam,
  queueForReview,
} from "../lib/progress"
import type { ExamDraft, Question } from "../lib/types"
import { mandarinVoice } from "../lib/speech"

test("forgotten words relearn quickly, without keeping a mastery claim", () => {
  const now = 1700000000000
  let card = schedule(undefined, "good", now)
  card = schedule(card, "good", card.due)
  card = schedule(card, "good", card.due)
  assert.equal(isMastered(card), true)
  const failed = schedule(card, "again", card.due)
  assert.equal(failed.repetitions, 0)
  assert.equal(failed.due - failed.last, 600000)
  assert.equal(failed.lapses, 1)
  assert.equal(isMastered(failed), false)
  assert.ok(failed.ease >= 1.3)
})

test("hard and easy reflect different retention and due queues sort oldest first", () => {
  const now = 1700000000000
  const hard = schedule(undefined, "hard", now)
  const easy = schedule(undefined, "easy", now)
  assert.ok(hard.interval < easy.interval)
  const p = freshProgress()
  p.cards["hsk3-00001"] = { ...hard, due: now - 1000 }
  p.cards["hsk3-00002"] = { ...easy, due: now - 2000 }
  p.cards["hsk3-00003"] = { ...easy, due: now + 1000 }
  assert.deepEqual(dueIds(p, now), ["hsk3-00002", "hsk3-00001"])
})

test("import refuses invalid levels, unsafe keys and impossible review data", () => {
  assert.ok(progressSchema.safeParse(freshProgress()).success)
  assert.equal(
    progressSchema.safeParse({ ...freshProgress(), level: 10 }).success,
    false
  )
  assert.equal(
    progressSchema.safeParse({
      ...freshProgress(),
      cards: JSON.parse('{"__proto__":{}}'),
    }).success,
    false
  )
  assert.equal(
    progressSchema.safeParse({
      ...freshProgress(),
      cards: { "hsk3-00001": { due: -1 } },
    }).success,
    false
  )
})

test("saved drafts reject nonexistent lesson words, question positions and answer references", () => {
  const session = {
    level: 1,
    lesson: 37,
    step: 1,
    wordIndex: 3,
    checkpoint: 0,
    answers: {},
    reviewIds: [],
    started: 10,
  }
  const valid = { ...freshProgress(), session }
  assert.ok(progressSchema.safeParse(valid).success)
  for (const change of [{ lesson: 38 }, { wordIndex: 4 }, { checkpoint: 5 }])
    assert.equal(
      progressSchema.safeParse({
        ...valid,
        session: { ...session, ...change },
      }).success,
      false
    )
  assert.ok(
    progressSchema.safeParse({
      ...freshProgress(),
      session: {
        ...session,
        step: 0,
        wordIndex: 4,
        reviewIds: ["hsk3-00001", "hsk3-00002", "hsk3-00003", "hsk3-00004"],
      },
    }).success
  )
  const exam = {
    level: 1,
    seed: 7,
    questions,
    answers: {},
    position: 3,
    started: 10,
    deadline: 1000,
  }
  assert.ok(progressSchema.safeParse({ ...freshProgress(), exam }).success)
  for (const change of [
    { position: 4 },
    { answers: { missing: 1 } },
    { deadline: 9 },
    { questions: [questions[0], questions[0]] },
  ])
    assert.equal(
      progressSchema.safeParse({
        ...freshProgress(),
        exam: { ...exam, ...change },
      }).success,
      false
    )
  assert.equal(
    progressSchema.safeParse({
      ...freshProgress(),
      lessons: { "1-38": { completed: 10, score: 100 } },
    }).success,
    false
  )
})

const questions: Question[] = [
  "listening",
  "reading",
  "grammar",
  "vocabulary",
].map((skill, i) => ({
  id: `test-${i}`,
  skill: skill as Question["skill"],
  prompt: "Practice",
  options: ["A", "B", "C", "D"],
  answer: 2,
  explanation: "C has the supporting evidence.",
}))

test("mock scoring counts unanswered as wrong and repairs actual weak skills", () => {
  const exam: ExamDraft = {
    level: 1,
    seed: 7,
    questions,
    answers: { "test-0": 2, "test-1": 1 },
    position: 1,
    started: 10,
    deadline: 1000,
  }
  const result = scoreExam(exam, 500)
  assert.equal(result.percent, 25)
  assert.equal(result.correct, 1)
  assert.equal(result.total, 4)
  assert.equal(result.mistakes.length, 3)
  assert.equal(result.mistakes[1].selected, null)
  assert.deepEqual(result.skills.listening, { correct: 1, total: 1 })
  assert.deepEqual(
    repairPlan(result)
      .map((p) => p.skill)
      .sort(),
    ["grammar", "reading", "vocabulary"]
  )
})

test("streak uses local calendar days and survives crossing daylight-saving boundaries", () => {
  const now = new Date(2026, 10, 3, 8).getTime()
  const p = freshProgress()
  p.activity[activityDay(new Date(2026, 10, 2, 22).getTime())] = 1
  p.activity[activityDay(new Date(2026, 10, 1, 22).getTime())] = 1
  assert.equal(streak(p, now), 2)
  p.activity[activityDay(now)] = 1
  assert.equal(streak(p, now), 3)
})

test("adding a word and practicing early never record a lapse or manufacture spaced mastery", () => {
  const t = 1700000000000
  const fresh = queueForReview(undefined, t)
  assert.equal(fresh.lapses, 0)
  const learned = schedule(fresh, "easy", t)
  const queued = queueForReview(learned, t + 100)
  assert.deepEqual(queued, { ...learned, due: t + 100 })
  assert.deepEqual(schedule(queued, "good", t + 101), learned)
  assert.ok(schedule(queued, "good", learned.due).interval > learned.interval)
  assert.equal(schedule(queued, "again", t + 101).lapses, 1)
})

test("timer and manual submit grade the latest answers and apply missed words once per mock", () => {
  const p = freshProgress()
  const exam: ExamDraft = {
    level: 1,
    seed: 17,
    started: 5,
    deadline: 50,
    position: 0,
    answers: {},
    questions: questions.map((q) => ({ ...q, wordId: "hsk3-00001" })),
  }
  p.exam = { ...exam, answers: { "test-0": 2 } }
  assert.equal(finishExam(p, { seed: 18, started: 5 }, 40), p)
  const next = finishExam(p, exam, 50)
  assert.equal(next.attempts[0].correct, 1)
  assert.equal(next.cards["hsk3-00001"].lapses, 1)
  assert.equal(finishExam(next, exam, 51), next)
})

test("device speech does not substitute Cantonese or a network voice for local Mandarin", () => {
  const other = [
    { lang: "zh-HK", localService: true },
    { lang: "zh-yue-CN", localService: true },
    { lang: "zh-CN", localService: false },
  ]
  assert.equal(mandarinVoice(other), undefined)
  const taiwan = { lang: "zh-Hant-TW", localService: true }
  assert.equal(mandarinVoice([...other, taiwan]), taiwan)
  const mainland = { lang: "zh_CN", localService: true }
  assert.equal(mandarinVoice([taiwan, mainland]), mainland)
})
