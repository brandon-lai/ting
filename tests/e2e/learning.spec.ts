import { test, expect } from "@playwright/test"
import { readFileSync } from "node:fs"
import { checkpointQuestions, wordQuestion } from "../../lib/curriculum"
import { freshProgress } from "../../lib/progress"
import type { Word, Progress } from "../../lib/types"

const words = JSON.parse(
  readFileSync(
    new URL("../../public/curriculum/level-1.json", import.meta.url),
    "utf8"
  )
) as Word[]

test("complete a real mobile lesson, record synthetic audio, persist and open next session", async ({
  page,
}) => {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto("/study?level=1&lesson=0")
  await page
    .getByRole("button", { name: "Begin 30-minute lesson", exact: true })
    .click()
  await page.getByRole("button", { name: "Learn today’s words" }).click()
  await expect(
    page.getByRole("heading", { name: "Meet your new words" })
  ).toBeFocused()
  for (let i = 0; i < 7; i++)
    await page.getByRole("button", { name: "Next word", exact: true }).click()
  await page
    .getByRole("button", { name: "Build a sentence", exact: true })
    .click()
  await page.getByRole("button", { name: "Show model order" }).click()
  await page
    .getByRole("button", { name: "Practice listening", exact: true })
    .click()
  await page.locator(".option").first().click()
  await page.getByRole("button", { name: "Check listening answer" }).click()
  await page.getByRole("button", { name: "Say it yourself" }).click()
  await page
    .getByRole("button", { name: "Record your answer", exact: true })
    .click()
  await expect(
    page.getByRole("button", { name: "Stop recording", exact: true })
  ).toBeVisible()
  await page
    .getByRole("button", { name: "Stop recording", exact: true })
    .click()
  await expect(page.locator("audio")).toHaveAttribute("src", /^blob:/)
  await page.getByRole("button", { name: "I practiced this aloud" }).click()
  await page.getByRole("button", { name: "Check what stayed" }).click()
  const questions = checkpointQuestions(1, 0, words.slice(0, 8), words)
  for (let i = 0; i < questions.length; i++) {
    await page.locator(".option").nth(questions[i].answer).click()
    await page
      .getByRole("button", { name: "Check answer", exact: true })
      .click()
    await page
      .getByRole("button", {
        name: i + 1 === questions.length ? "Finish lesson" : "Next question",
        exact: true,
      })
      .click()
  }
  await expect(page.getByText("100%", { exact: true })).toBeVisible()
  const saved = await page.evaluate(
    () => JSON.parse(localStorage.getItem("ting:guest:v1")!) as Progress
  )
  expect(saved.lessons["1-0"].score).toBe(100)
  expect(Object.keys(saved.cards)).toHaveLength(8)
  expect(saved.session).toBeNull()
  await page.getByRole("link", { name: "Open next session" }).click()
  await expect(
    page.getByRole("button", { name: "Begin 30-minute lesson" })
  ).toBeVisible()
  await page.reload()
  await expect(
    page.getByRole("button", { name: "Begin 30-minute lesson" })
  ).toBeVisible()
  expect(errors).toEqual([])
})

test("all levels remain accessible, choices support Escape and no mobile spill", async ({
  page,
}) => {
  await page.goto("/")
  await page
    .getByRole("button", { name: "Choose your level", exact: true })
    .click()
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Stage 9", exact: true })
    .click()
  await page.getByRole("button", { name: "Set my starting level" }).click()
  await expect(
    page.getByRole("link", { name: "Start your lesson" })
  ).toBeVisible()
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("ting:guest:v1")!).level
    )
  ).toBe(9)
  await page.goto("/learn?level=9")
  await expect(
    page
      .getByRole("heading", { name: "Speak with precision", exact: true })
      .first()
  ).toBeVisible()
  await page.getByRole("combobox", { name: "Study level", exact: true }).click()
  await page.keyboard.press("Escape")
  await expect(page.getByRole("listbox")).not.toBeVisible()
  const spill = await page.evaluate(() =>
    [...document.querySelectorAll("main *")]
      .filter((e) => e.getBoundingClientRect().right > innerWidth + 1)
      .map((e) => e.className)
  )
  expect(spill).toEqual([])
})

test("word review only reports persisted recall and error states are honest", async ({
  page,
}) => {
  await page.goto("/library")
  await page.getByRole("searchbox").fill("你好")
  await page.getByRole("button", { name: "Study 你好", exact: true }).click()
  await page.getByRole("button", { name: "Add to word review" }).click()
  await page.goto("/review")
  await page.getByRole("link", { name: "Today", exact: true }).click()
  await expect(page.locator("main h1")).toBeFocused()
  await page.goto("/review")
  await page
    .getByRole("button", { name: "Reveal meaning", exact: true })
    .click()
  await page.getByRole("button", { name: /^Again/ }).click()
  await expect(
    page.getByRole("heading", { name: "You’ve finished this review" })
  ).toBeVisible()
  const value = await page.evaluate(
    () => JSON.parse(localStorage.getItem("ting:guest:v1")!) as Progress
  )
  expect(value.cards[words[0].id].repetitions).toBe(0)
  expect(value.cards[words[0].id].due - value.cards[words[0].id].last).toBe(
    600000
  )
  await page.goto("/")
  await page.getByRole("button", { name: "Sign in and sync progress" }).click()
  await expect(page.getByRole("dialog")).toContainText("not enabled yet")
  await expect(
    page
      .getByRole("dialog")
      .getByRole("button", { name: "Continue with Google" })
  ).toHaveCount(0)
  await page.keyboard.press("Escape")
  await expect(page.getByRole("dialog")).toHaveCount(0)
})

test("mock deadline persists, unanswered questions score wrong and completion is idempotent", async ({
  page,
}) => {
  await page.goto("/exams?level=1")
  await page
    .getByRole("button", { name: "Start timed mock", exact: true })
    .click()
  await expect(page.getByText("Question 1 / 40", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: "Use reading fallback" }).click()
  const fallback = await page.evaluate(
    () => JSON.parse(localStorage.getItem("ting:guest:v1")!) as Progress
  )
  expect(fallback.exam!.questions[0].skill).toBe("reading")
  expect(fallback.exam!.questions[0].audio).toBeUndefined()
  expect(fallback.exam!.questions[0].text).toBeTruthy()
  await page.locator(".option").first().click()
  await page.getByRole("button", { name: "Next question", exact: true }).click()
  const before = await page.evaluate(
    () => JSON.parse(localStorage.getItem("ting:guest:v1")!) as Progress
  )
  await page.reload()
  await expect(page.getByText("Question 2 / 40", { exact: true })).toBeVisible()
  const after = await page.evaluate(
    () => JSON.parse(localStorage.getItem("ting:guest:v1")!) as Progress
  )
  expect(after.exam!.deadline).toBe(before.exam!.deadline)
  await page.evaluate(() => {
    const p = JSON.parse(localStorage.getItem("ting:guest:v1")!)
    p.exam.deadline = Date.now() - 10
    localStorage.setItem("ting:guest:v1", JSON.stringify(p))
  })
  await page.reload()
  await expect(
    page.getByRole("heading", { name: "Your next steps, in focus." })
  ).toBeVisible()
  const result = await page.evaluate(
    () => JSON.parse(localStorage.getItem("ting:guest:v1")!) as Progress
  )
  expect(result.attempts).toHaveLength(1)
  expect(result.attempts[0].total).toBe(40)
  expect(result.attempts[0].correct).toBeLessThanOrEqual(1)
  expect(result.attempts[0].mistakes.length).toBeGreaterThanOrEqual(39)
  await page.reload()
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("ting:guest:v1")!).attempts.length
    )
  ).toBe(1)
})

test("sentence audio fallback changes the instruction and scores reading rather than listening", async ({
  page,
}) => {
  const question = wordQuestion(words[0], words, 419, true)
  const now = Date.now()
  await page.goto("/exams")
  await page.evaluate(
    (p) => localStorage.setItem("ting:guest:v1", JSON.stringify(p)),
    {
      ...freshProgress(),
      exam: {
        level: 1,
        seed: 419,
        questions: [question],
        answers: {},
        position: 0,
        started: now,
        deadline: now + 60000,
      },
    }
  )
  await page.reload()
  await page.getByRole("button", { name: "Use reading fallback" }).click()
  await expect(
    page.getByRole("heading", { name: "Read the sentence. What does it mean?" })
  ).toBeVisible()
  await page.locator(".option").nth(question.answer).click()
  await page.getByRole("button", { name: "Finish mock", exact: true }).click()
  await page.getByRole("button", { name: "Finish and see feedback" }).click()
  const result = await page.evaluate(
    () => JSON.parse(localStorage.getItem("ting:guest:v1")!) as Progress
  )
  expect(result.attempts[0].skills.reading).toEqual({ correct: 1, total: 1 })
  expect(result.attempts[0].skills.listening).toEqual({ correct: 0, total: 0 })
})

test("progress imports are validated and deletion never occurs before confirmation", async ({
  page,
}) => {
  await page.goto("/settings")
  await page.getByLabel("Import Ting progress JSON").setInputFiles({
    name: "bad.json",
    mimeType: "application/json",
    buffer: Buffer.from('{"schema":1,"level":99}'),
  })
  await expect(page.getByRole("status")).toContainText("Nothing was imported")
  const valid = { ...freshProgress(), onboarded: true, level: 4 }
  await page.getByLabel("Import Ting progress JSON").setInputFiles({
    name: "valid.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(valid)),
  })
  await page.getByRole("button", { name: "Confirm replacement" }).click()
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("ting:guest:v1")!).level
    )
  ).toBe(4)
  await page
    .getByRole("button", { name: "Clear this device’s progress" })
    .click()
  await page.getByRole("button", { name: "Keep current progress" }).click()
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("ting:guest:v1")!).level
    )
  ).toBe(4)
})

test("downloaded lesson and navigation work completely offline", async ({
  page,
  context,
}) => {
  await page.goto("/settings")
  await page.evaluate(() => navigator.serviceWorker.ready)
  await page
    .locator(".settings-row")
    .filter({ has: page.getByRole("heading", { name: "HSK 1", exact: true }) })
    .getByRole("button", { name: "Download", exact: true })
    .click()
  await expect(page.getByRole("status")).toContainText("saved offline", {
    timeout: 30000,
  })
  await context.setOffline(true)
  await page.goto("/study?level=1&lesson=0")
  await page
    .getByRole("button", { name: "Begin 30-minute lesson", exact: true })
    .click()
  await page.getByRole("button", { name: "Learn today’s words" }).click()
  await expect(page.getByText("你好", { exact: true })).toBeVisible()
  await page.getByRole("link", { name: "Back to course", exact: true }).click()
  await expect(
    page.getByRole("heading", { name: "Your Chinese, from the beginning." })
  ).toBeVisible()
})
