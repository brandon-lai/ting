import { test, expect } from "@playwright/test"
import { readFileSync } from "node:fs"
import { lessonCount } from "../../lib/curriculum"
import { freshProgress } from "../../lib/progress"

const fixture = readFileSync(
  new URL("../fixtures/shipped-v1.json", import.meta.url),
  "utf8"
)
const guest = "ting:guest:v1"
test.use({ serviceWorkers: "block" })

test("a shipped save resumes the exact words and route selectors follow the saved level", async ({
  page,
}) => {
  await page.addInitScript(
    ({ key, value }) => {
      if (!localStorage.getItem(key)) localStorage.setItem(key, value)
    },
    { key: guest, value: fixture }
  )
  await page.goto("/")
  const link = page.getByRole("link", { name: "Continue your lesson" })
  await expect(link).toHaveAttribute("href", "/study?level=2&lesson=6")
  await expect(page.locator(".daily-ticket")).toContainText("HSK 2 / Session 7")
  const pack = await (await page.request.get("/curriculum/level-2.json")).json()
  await expect(page.locator(".ticket-phrase .zh")).toHaveText(pack[48].hanzi)
  await expect(page.locator(".ticket-phrase .pinyin")).toHaveCount(0)
  await link.click()
  await expect(page.locator(".large-word")).toHaveText(pack[49].hanzi)
  for (const route of ["/learn", "/practice", "/library", "/exams"]) {
    await page.goto(route)
    await expect(
      page.getByRole("combobox", { name: "Study level" })
    ).toContainText("HSK 4")
  }
  await page.goto("/library?level=2")
  await expect(
    page.getByRole("combobox", { name: "Study level" })
  ).toContainText("HSK 2")
  await page
    .getByRole("button", { name: /^Study / })
    .first()
    .click()
  await expect(page.getByRole("dialog")).not.toContainText(
    pack[0].examplePinyin
  )
  expect(await page.evaluate((key) => localStorage.getItem(key), guest)).toBe(
    fixture
  )
})

test("an unreadable save survives normal edits, export and cancelled recovery before confirmed import", async ({
  page,
}) => {
  await page.goto("/settings")
  const original = '{"schema":1,"unreadable":'
  await page.evaluate(
    ({ key, original }) => localStorage.setItem(key, original),
    { key: guest, original }
  )
  await page.reload()
  const warning = page
    .getByRole("alert")
    .filter({ hasText: "original data is protected" })
  await expect(warning).toBeVisible()
  await page.getByRole("switch", { name: "Show pinyin hints" }).click()
  const downloading = page.waitForEvent("download")
  await page.getByRole("button", { name: "Export progress" }).click()
  const downloaded = await downloading
  expect(readFileSync((await downloaded.path())!, "utf8")).toBe(original)
  await page
    .getByRole("button", { name: "Clear this device’s progress" })
    .click()
  await page.getByRole("button", { name: "Keep current progress" }).click()
  expect(await page.evaluate((key) => localStorage.getItem(key), guest)).toBe(
    original
  )
  await page.getByLabel("Import Ting progress JSON").setInputFiles({
    name: "backup.json",
    mimeType: "application/json",
    buffer: Buffer.from(fixture),
  })
  await page.getByRole("button", { name: "Confirm replacement" }).click()
  await expect(warning).toHaveCount(0)
  await page.reload()
  await expect(
    page.getByRole("combobox", { name: "Study level" })
  ).toContainText("HSK 4")
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!).session,
      guest
    )
  ).toEqual(JSON.parse(fixture).session)
})

test("a completed level points to its mock and opens the next course after reaching the target", async ({
  page,
}) => {
  const progress = freshProgress()
  progress.onboarded = true
  for (let i = 0; i < lessonCount(1); i++)
    progress.lessons[`1-${i}`] = { completed: 10, score: 85 }
  await page.addInitScript(
    ({ key, p }) => {
      if (!localStorage.getItem(key))
        localStorage.setItem(key, JSON.stringify(p))
    },
    { key: guest, p: progress }
  )
  await page.goto("/")
  await page.getByRole("link", { name: "Open level mock", exact: true }).click()
  await page.getByRole("button", { name: "Start timed mock" }).click()
  await expect(page.getByText("Question 1 / 40", { exact: true })).toBeVisible()
  await page.goto("/")
  await page.getByRole("link", { name: "Resume your mock" }).click()
  await expect(page.getByText("Question 1 / 40", { exact: true })).toBeVisible()
  await page.evaluate((key) => {
    const p = JSON.parse(localStorage.getItem(key)!)
    p.exam.answers = Object.fromEntries(
      p.exam.questions.map((q: { id: string; answer: number }) => [
        q.id,
        q.answer,
      ])
    )
    localStorage.setItem(key, JSON.stringify(p))
  }, guest)
  await page.reload()
  await page.getByRole("button", { name: "Finish mock", exact: true }).click()
  await page.getByRole("button", { name: "Finish and see feedback" }).click()
  await expect(
    page.getByRole("link", { name: "Explore HSK 2" })
  ).toHaveAttribute("href", "/learn?level=2")
  await page.goto("/")
  await page.getByRole("link", { name: "Explore HSK 2" }).click()
  await expect(
    page.getByRole("combobox", { name: "Study level" })
  ).toContainText("HSK 2")
})

test("a card becomes available without reloading even when another stage cannot load", async ({
  page,
}) => {
  const start = new Date(2026, 7, 20, 11).getTime()
  await page.clock.install({ time: start })
  const progress = freshProgress()
  progress.cards["hsk3-00001"] = {
    interval: 1,
    due: start + 60000,
    ease: 2.5,
    last: start - 86400000 + 60000,
    repetitions: 1,
    lapses: 0,
  }
  progress.cards["hsk3-00301"] = {
    ...progress.cards["hsk3-00001"],
    due: start - 1,
  }
  await page.addInitScript(
    (p) => localStorage.setItem("ting:guest:v1", JSON.stringify(p)),
    progress
  )
  await page.route("**/curriculum/level-2.json", (route) => route.abort())
  await page.goto("/review")
  await expect(page.getByText("1 due", { exact: true })).toBeVisible()
  await expect(
    page.getByRole("button", { name: "Retry download" })
  ).toBeVisible()
  await page.clock.fastForward(61000)
  await expect(page.getByText("2 due", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: "Reveal meaning" }).click()
  await page.getByRole("button", { name: /^Good/ }).click()
  await expect(page.getByText("1 due", { exact: true })).toBeVisible()
})

test("a truncated word pack cannot start a broken lesson and retry loads the real pack", async ({
  page,
}) => {
  await page.route("**/curriculum/level-2.json", (route) =>
    route.fulfill({ json: [] })
  )
  await page.goto("/study?level=2&lesson=6")
  await expect(page.getByText(/incomplete or damaged/)).toBeVisible()
  await expect(
    page.getByRole("button", { name: "Begin 30-minute lesson" })
  ).toHaveCount(0)
  await page.unroute("**/curriculum/level-2.json")
  await page.getByRole("button", { name: "Retry download" }).click()
  await page.getByRole("button", { name: "Begin 30-minute lesson" }).click()
  await expect(
    page.getByRole("heading", { name: "Remember before you learn" })
  ).toBeVisible()
})
