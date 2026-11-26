import assert from "node:assert/strict"
import test from "node:test"
import { grammar, readings, speaking } from "../lib/content"

function checkChoices(
  item: { options: string[]; answer: number },
  label: string
) {
  assert.equal(item.options.length, 4, `${label}: four choices`)
  assert.equal(new Set(item.options).size, 4, `${label}: distinct choices`)
  assert.ok(
    item.options.every((option) => option.trim()),
    `${label}: no empty choice`
  )
  assert.ok(
    Number.isInteger(item.answer) &&
      item.answer >= 0 &&
      item.answer < item.options.length,
    `${label}: valid answer index`
  )
}

function checkPinyinAlignment(zh: string, pinyin: string, label: string) {
  // These sentences have no erhua or syllabic interjections: each hanzi has one vowel nucleus.
  const hanzi = zh.match(/\p{Script=Han}/gu)?.length ?? 0
  const nuclei =
    pinyin
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .match(/[aeiou]+/gi)?.length ?? 0
  assert.equal(nuclei, hanzi, `${label}: Chinese/pinyin syllable alignment`)
}

test("each editorial stage has usable grammar, reading, and speaking material", () => {
  const all = [...grammar, ...readings, ...speaking]
  assert.equal(new Set(all.map((item) => item.id)).size, all.length)
  assert.ok(
    all.every(
      (item) =>
        Number.isInteger(item.level) && item.level >= 1 && item.level <= 9
    )
  )
  for (let level = 1; level <= 9; level++) {
    assert.equal(grammar.filter((item) => item.level === level).length, 10)
    assert.equal(readings.filter((item) => item.level === level).length, 8)
    assert.equal(speaking.filter((item) => item.level === level).length, 4)
  }
})

test("sentence construction and retrieval choices retain complete content", () => {
  for (const point of grammar) {
    assert.equal(point.tokens.join(""), point.exampleZh, point.id)
    assert.ok(
      point.tokens.every((token) => token.trim()),
      point.id
    )
    assert.equal(
      point.cloze.split("＿＿").length,
      2,
      `${point.id}: one cloze gap`
    )
    checkChoices(point, point.id)
    for (const value of [
      point.title,
      point.pattern,
      point.explanation,
      point.examplePinyin,
      point.exampleEn,
      point.why,
    ]) {
      assert.ok(value.trim(), point.id)
    }
    assert.ok(!/\p{Script=Han}/u.test(point.examplePinyin), point.id)
    checkPinyinAlignment(point.exampleZh, point.examplePinyin, point.id)
  }
})

test("connected reading length progresses and every question explains its answer", () => {
  assert.equal(new Set(readings.map((item) => item.text)).size, readings.length)
  const minimumLength = [40, 75, 110, 150, 190, 240, 300, 300, 300]
  let previousMaximum = 0
  for (let level = 1; level <= 9; level++) {
    const passages = readings.filter((item) => item.level === level)
    const lengths = passages.map((passage) => {
      const length = passage.text.match(/\p{Script=Han}/gu)?.length ?? 0
      assert.ok(length >= minimumLength[level - 1], passage.id)
      if (level === 1) assert.ok(length <= 70, passage.id)
      assert.ok(passage.translation.trim(), passage.id)
      assert.equal(passage.questions.length, 3, passage.id)
      assert.equal(
        new Set(passage.questions.map((question) => question.prompt)).size,
        3,
        passage.id
      )
      for (const question of passage.questions) {
        checkChoices(question, passage.id)
        assert.ok(
          question.prompt.trim() && question.explanation.trim(),
          passage.id
        )
      }
      return length
    })
    assert.ok(
      Math.min(...lengths) > previousMaximum,
      `stage ${level}: longer connected reading`
    )
    previousMaximum = Math.max(...lengths)
  }
})

test("speaking tasks provide bilingual model support, timing, and expansion scaffolds", () => {
  assert.equal(
    new Set(speaking.map((item) => item.prompt)).size,
    speaking.length
  )
  for (const task of speaking) {
    assert.ok(
      Number.isInteger(task.seconds) &&
        task.seconds >= 20 &&
        task.seconds <= 240,
      task.id
    )
    for (const value of [
      task.title,
      task.prompt,
      task.supportZh,
      task.supportPinyin,
      task.supportEn,
    ]) {
      assert.ok(value.trim(), task.id)
    }
    assert.ok(!/\p{Script=Han}/u.test(task.supportPinyin), task.id)
    checkPinyinAlignment(task.supportZh, task.supportPinyin, task.id)
    assert.ok(
      task.tips.length >= 3 && task.tips.every((tip) => tip.trim()),
      task.id
    )
  }
})
