import type { Metadata } from "next"
export const metadata: Metadata = { title: "Credits and study terms" }
export default function Page() {
  return (
    <article className="prose">
      <h1>Study terms and credits.</h1>
      <h2>Independent practice, not certification</h2>
      <p>
        Ting is an independent Chinese learning tool. HSK is a trademark of
        CLEC. Ting is not affiliated with CLEC, CTI, Google, YouTube or the
        creators whose videos are embedded. Its mock questions are original
        practice material, not official exam papers. Completing lessons or
        reaching a practice score does not guarantee an official examination
        result.
      </p>
      <h2>The scope of this course</h2>
      <p>
        Vocabulary covers the complete 11,000-entry November 2025 HSK 3.0 list.
        Grammar, reading and speaking tasks are curated practice foundations,
        not a replacement for a full teacher-reviewed textbook or every official
        exam task. Writing and formal translation are not taught. Automated
        voice recognition does not establish pronunciation accuracy.
      </p>
      <h2>Vocabulary attribution</h2>
      <p>
        HSK 3.0 word data:{" "}
        <a
          href="https://hanzidrill.com/open-data"
          target="_blank"
          rel="noreferrer"
        >
          hsk3-vocabulary by Yujay (Hanzidrill)
        </a>
        , data version 2026.11.7,{" "}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noreferrer"
        >
          CC BY 4.0
        </a>
        . Ting normalizes field names and reorders words into lessons. Advanced
        words are split into editorial study stages. The data is supplied
        without warranty; corrections and updates may be needed. Download the{" "}
        <a href="/curriculum/LICENSE.txt">license</a>,{" "}
        <a href="/curriculum/SOURCES.md">upstream source notices</a> and{" "}
        <a href="/curriculum/manifest.json">version manifest</a>.
      </p>
      <h2>Practice material and videos</h2>
      <p>
        Grammar explanations, speaking prompts and connected reading passages
        were authored for Ting and should be checked with a qualified Mandarin
        teacher when used for high-stakes preparation. Videos from Yoyo Chinese
        and Mandarin Corner remain on YouTube and are loaded only with your
        choice. No video is copied or redistributed. Availability and embedding
        permissions are controlled by the creator and platform.
      </p>
      <h2>Progress and availability</h2>
      <p>
        You are responsible for backing up local study data. Browser storage can
        be cleared by your browser or device. Cloud save is available only on
        properly configured deployments. Offline access requires a successful
        download first. The product is provided as-is without a promise of
        uninterrupted availability.
      </p>
      <h2>Built with</h2>
      <p>
        Next.js, React, shadcn/ui on Base UI, Tailwind CSS, Supabase and Lucide.
        Nunito Sans and Noto Sans SC are distributed under the SIL Open Font
        License through Fontsource.
      </p>
    </article>
  )
}
