import { test, expect, type Page } from "@playwright/test"
import { mkdir } from "node:fs/promises"
import { join } from "node:path"
import { freshProgress } from "../../lib/progress"
import axe from "axe-core"

declare global {
  interface Window {
    axe?: typeof axe
  }
}

const directory =
  process.env.TING_SHOT_DIR ?? join(process.cwd(), "test-results", "captures")
test.use({ serviceWorkers: "block" })

async function capture(page: Page, name: string, fullPage = true) {
  await page.evaluate(() => {
    scrollTo(0, 0)
    return document.fonts.ready
  })
  await page.screenshot({
    path: join(directory, `${name}.png`),
    fullPage,
  })
}

async function audit(page: Page) {
  await page.addScriptTag({ content: axe.source })
  const violations = await page.evaluate(async () => {
    if (!window.axe)
      throw new Error("The accessibility audit engine did not load.")
    const report = await window.axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
      },
    })
    return report.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      targets: v.nodes.map((node) => node.target),
    }))
  })
  expect(violations, `Accessibility audit for ${page.url()}`).toEqual([])
}

test("all screens hold their reading order without horizontal spill at phone and desktop widths", async ({
  page,
}) => {
  test.setTimeout(120000)
  await mkdir(directory, { recursive: true })
  await page.emulateMedia({ reducedMotion: "reduce" })
  const routes = [
    "",
    "learn",
    "library",
    "review",
    "practice",
    "exams",
    "settings",
    "guide",
    "privacy",
    "terms",
    "study?level=1&lesson=0",
    "missing-page",
  ]
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 })
    for (const route of routes) {
      await page.goto(`/${route}`)
      await expect(page.locator("main h1")).toHaveCount(1)
      await expect(page.locator(".loading-line")).toHaveCount(0)
      const spill = await page.evaluate(() =>
        [...document.querySelectorAll("main *")]
          .filter((e) => {
            const rect = e.getBoundingClientRect()
            return (
              rect.width > 0 && (rect.right > innerWidth + 1 || rect.left < -1)
            )
          })
          .map((e) => `${e.tagName}.${e.className}`)
      )
      expect(spill, `Spill on /${route} at ${width}px`).toEqual([])
      if (width === 390) await audit(page)
      if (width !== 320)
        await capture(page, `${route.split("?")[0] || "today"}-${width}`)
    }
  }
  for (const width of [1024, 768]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto("/")
    await expect(page.locator(".loading-line")).toHaveCount(0)
    await capture(page, `today-${width}`)
  }
  await page.emulateMedia({ colorScheme: "dark" })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/")
  await expect(page.locator(".loading-line")).toHaveCount(0)
  await capture(page, "today-dark-1440")
  await audit(page)
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/practice")
  await capture(page, "practice-dark-390")
})

test("lesson, dialog, empty, error and advanced-content states remain visible", async ({
  page,
}) => {
  test.setTimeout(90000)
  await mkdir(directory, { recursive: true })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/")
  await page
    .getByRole("button", { name: "Choose your level", exact: true })
    .click()
  await capture(page, "level-dialog-1440")
  await page.keyboard.press("Escape")
  await expect(
    page.getByRole("button", { name: "Choose your level", exact: true })
  ).toBeFocused()
  await page.getByRole("button", { name: "Sign in and sync progress" }).click()
  await capture(page, "account-unavailable-1440", false)
  await page.keyboard.press("Escape")
  await expect(
    page.getByRole("button", { name: "Sign in and sync progress" })
  ).toBeFocused()
  await page.goto("/learn")
  await page.getByRole("combobox", { name: "Study level" }).click()
  await expect(page.getByRole("listbox")).toBeVisible()
  await capture(page, "level-menu-1440", false)
  await page.keyboard.press("Escape")
  await page.goto("/library")
  await page.getByRole("button", { name: "Study 你好", exact: true }).click()
  await capture(page, "word-dialog-1440", false)
  await page.keyboard.press("Escape")
  await page.getByRole("searchbox").fill("zzzz-no-match")
  await capture(page, "library-empty-1440")
  let release: () => void = () => {}
  const held = new Promise<void>((resolve) => {
    release = resolve
  })
  await page.route("**/curriculum/level-1.json", async (route) => {
    await held
    await route.continue()
  })
  await page.goto("/")
  await expect(
    page
      .getByRole("status", { name: "" })
      .filter({ hasText: "Loading your Chinese lesson" })
  ).toBeVisible()
  await capture(page, "lesson-loading-1440", false)
  release()
  await expect(page.locator(".loading-line")).toHaveCount(0)
  await page.unroute("**/curriculum/level-1.json")
  await page.route("**/curriculum/level-8.json", (route) => route.abort())
  await page.goto("/")
  await page.evaluate(
    (p) =>
      localStorage.setItem(
        "ting:guest:v1",
        JSON.stringify({ ...p, level: 8, onboarded: true })
      ),
    freshProgress()
  )
  await page.reload()
  await expect(
    page.getByRole("heading", { name: "The words couldn’t load" })
  ).toBeVisible()
  await capture(page, "load-error-1440")
  await page.unroute("**/curriculum/level-8.json")
  await page.evaluate(
    (p) => localStorage.setItem("ting:guest:v1", JSON.stringify(p)),
    freshProgress()
  )
  await page.goto("/study?level=1&lesson=0")
  await page.getByRole("button", { name: "Begin 30-minute lesson" }).click()
  await capture(page, "lesson-remember-1440")
  await page.getByRole("button", { name: "Learn today’s words" }).click()
  await capture(page, "lesson-word-1440")
  for (let i = 0; i < 7; i++)
    await page.getByRole("button", { name: "Next word", exact: true }).click()
  await page.getByRole("button", { name: "Build a sentence" }).click()
  await capture(page, "lesson-build-1440")
  await page.getByRole("button", { name: "Show model order" }).click()
  await page
    .getByRole("button", { name: "Practice listening", exact: true })
    .click()
  await capture(page, "lesson-listen-1440")
  await page.locator(".option").first().click()
  await page.getByRole("button", { name: "Check listening answer" }).click()
  await capture(page, "lesson-listening-feedback-1440")
  await page.getByRole("button", { name: "Say it yourself" }).click()
  await page.getByRole("button", { name: "Show a model answer" }).click()
  await capture(page, "lesson-speak-1440")
  await page.getByRole("button", { name: "I practiced this aloud" }).click()
  await page.getByRole("button", { name: "Check what stayed" }).click()
  await capture(page, "lesson-checkpoint-1440")
  await page.setViewportSize({ width: 390, height: 844 })
  await capture(page, "lesson-checkpoint-390")
  await page.goto("/exams?level=9")
  await page.getByRole("button", { name: "Start timed mock" }).click()
  await expect(
    page.getByText("Question 1 / 100", { exact: true })
  ).toBeVisible()
  await capture(page, "advanced-mock-390")
  await page.getByRole("button", { name: "Finish mock", exact: true }).click()
  await capture(page, "mock-finish-dialog-390")
  await page.getByRole("button", { name: "Finish and see feedback" }).click()
  await expect(
    page.getByRole("heading", { name: "Your next steps, in focus." })
  ).toBeVisible()
  await capture(page, "mock-result-390", false)
  await expect(page.getByText("Page 1 of 20", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: "Next mistakes" }).click()
  await expect(page.getByText("Page 2 of 20", { exact: true })).toBeVisible()
})
