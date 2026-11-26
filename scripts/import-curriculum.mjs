import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const revision = "cdc6b4f0d27d2c490895e25e1ed2f0320985623f";
const base = `https://raw.githubusercontent.com/itsyujay/hsk3-vocabulary/${revision}`;
const directory = new URL("../public/curriculum/", import.meta.url);
const expected = { 1: 300, 2: 200, 3: 500, 4: 1000, 5: 1600, 6: 1800, "7-9": 5600 };
const priority = ["你好", "你", "我", "是", "叫", "名字", "好", "谢谢", "不", "再见", "请", "对不起", "没关系", "中国", "人", "汉语", "学习", "说", "朋友", "认识"];

async function download(path) {
  const response = await fetch(`${base}/${path}`);
  if (!response.ok) throw new Error(`Curriculum source ${path}: HTTP ${response.status}`);
  return response.text();
}

await mkdir(directory, { recursive: true });
const [raw, license, sources] = await Promise.all([
  download("dist/hsk3_words.json"), download("LICENSE"), download("SOURCES.md"),
]);
const records = JSON.parse(raw);
if (records.length !== 11000) throw new Error("Expected exactly 11,000 syllabus entries.");
const manifest = { source: base, revision, version: "2026.11.7", sha256: createHash("sha256").update(raw).digest("hex"), total: 11000, levels: {} };
const advanced = records.filter((w) => w.level === "7-9");
for (let level = 1; level <= 9; level++) {
  let selected = level <= 6
    ? records.filter((w) => w.level === level)
    : advanced.slice((level - 7) * 1872, level === 9 ? undefined : (level - 6) * 1872);
  if (level <= 6 && selected.length !== expected[level]) throw new Error(`Wrong level ${level} count`);
  selected.sort((a, b) => {
    const ap = priority.indexOf(a.hanzi), bp = priority.indexOf(b.hanzi);
    if (level === 1 && (ap >= 0 || bp >= 0)) return (ap < 0 ? 1000 : ap) - (bp < 0 ? 1000 : bp);
    return String(a.topic_tags?.[0] ?? "").localeCompare(String(b.topic_tags?.[0] ?? "")) || a.no - b.no;
  });
  const words = selected.map((w) => {
    for (const key of ["id", "hanzi", "pinyin", "en", "example_zh", "example_en"]) {
      if (typeof w[key] !== "string" || !w[key]) throw new Error(`Missing ${key}: ${w.id}`);
    }
    return {
      id: w.id, hanzi: w.hanzi, pinyin: w.pinyin, en: w.en,
      exampleZh: w.example_zh, examplePinyin: w.example_pinyin ?? "",
      exampleEn: w.example_en, cloze: w.example_cloze ?? w.example_zh.replace(w.hanzi, "＿＿"),
      topics: w.topic_tags ?? [], level, officialLevel: w.level,
    };
  });
  await writeFile(new URL(`level-${level}.json`, directory), JSON.stringify(words));
  manifest.levels[level] = { words: words.length, sessions: Math.ceil(words.length / 8) };
}
await Promise.all([
  writeFile(new URL("LICENSE.txt", directory), license),
  writeFile(new URL("SOURCES.md", directory), sources),
  writeFile(new URL("manifest.json", directory), JSON.stringify(manifest, null, 2)),
]);
console.log(JSON.stringify(manifest, null, 2));
