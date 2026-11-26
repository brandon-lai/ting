import type { Metadata } from "next"
import Link from "next/link"
export const metadata: Metadata = { title: "How to learn with Ting" }
export default function Page() {
  return (
    <article className="prose">
      <h1>A little Chinese that lasts.</h1>
      <p className="muted space-above">
        Ting is built around recall, not just exposure.
      </p>
      <h2>Your 30-minute session</h2>
      <p>
        Spend five minutes recalling due words, eight learning new vocabulary in
        sentences, five constructing grammar, five actively listening, five
        speaking and two checking what you remember. These timings are a pacing
        guide, not enforced waits. Eight new words is a ceiling: repeat a
        session if you need a slower pace.
      </p>
      <h2>Give memory space</h2>
      <p>
        Recall the meaning before revealing a word. Choose Again if you forgot,
        Hard if you needed help, Good if you remembered, and Easy only if it was
        immediate. Forgotten words return in ten minutes. Other words return
        after increasing intervals. A word is “retained” only after at least
        three successful spaced reviews and a seven-day interval.
      </p>
      <h2>Move from sound to meaning</h2>
      <p>
        Listen before showing the transcript. Summarize the sentence, then
        replay it with text. In a five-minute video segment, pause and shadow
        the speaker instead of watching passively. Device speech is synthetic,
        not a native-speaker recording; creators’ videos provide natural speech.
      </p>
      <h2>Speak without a score chasing you</h2>
      <p>
        Record, replay and compare rhythm with the model. Then answer the prompt
        with your own ideas. Ting’s recognition checks words, not tones or
        fluency. A qualified teacher or conversation partner is the best source
        of pronunciation feedback.
      </p>
      <h2>One syllabus, nine study stages</h2>
      <p>
        The course covers all 11,000 vocabulary entries in the November 2025 HSK
        3.0 syllabus. HSK 1–6 keep official word-level assignments. Advanced
        stages 7, 8 and 9 split the combined 5,600-word pool for pacing; the
        official advanced examination is combined, not three separate tests.
        Grammar and reading are editorial practice material, not a claim to
        reproduce every official syllabus task.
      </p>
      <h2>Use mocks to find the gaps</h2>
      <p>
        Each timed mock mixes listening, vocabulary, grammar and connected
        reading. Ting’s 80% practice target is not an official pass mark. Read
        the explanations, review missed words and work on the weakest section
        before trying again. Your original timer keeps running when you leave
        the page.
      </p>
      <h2>Before you book an exam</h2>
      <p>
        Writing was excluded by request. HSK exams may assess writing, speaking
        and advanced translation as well; completing Ting is not a guarantee of
        passing. Check the current format with your test center and complete{" "}
        <a
          href="https://www.chinesetest.cn/HSK"
          target="_blank"
          rel="noreferrer"
        >
          official sample papers
        </a>{" "}
        to prepare the omitted skills.
      </p>
      <h2>Learn on your phone</h2>
      <p>
        In <Link href="/settings">Settings</Link>, download a study level and
        add Ting to your home screen. Downloaded vocabulary and cached screens
        work offline. Videos, cloud sync and most speech recognition need the
        internet. Export progress regularly, especially before clearing browser
        storage.
      </p>
      <Link href="/learn" className="text-link">
        Open your Chinese course
      </Link>
    </article>
  )
}
