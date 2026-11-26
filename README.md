# Ting

[Open Ting](https://ting-psi-two.vercel.app) · [GitHub repository](https://github.com/brandon-lai/ting)

Ting is a mobile-first Chinese learning platform that turns the HSK syllabus into 30-minute, retrieval-led lessons from beginner to advanced proficiency.

## Product decisions

| Question               | Shipped decision and reason                                                                                                                                                                                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Which HSK?             | November 2025 HSK 3.0 syllabus, 11,000 words. Exam formats are transitioning; confirm the version with your test center. The official [HSK page](https://www.chinesetest.cn/HSK) is linked in the app.                                                                                                           |
| Levels 7, 8 and 9?     | Three consecutive study stages of the official combined 5,600-word HSK 7–9 pool. The split is a Ting pacing choice, not an official assignment of words to three exams.                                                                                                                                          |
| Starting level?        | Learner-selected, adjustable at any time. A short diagnostic is advisory, not a fabricated placement certificate.                                                                                                                                                                                                |
| Optimal lesson?        | Retrieval before exposure, eight new words in context, grammar construction, active listening, spoken production and a checkpoint. The suggested budget totals 30 minutes; activities never lock behind a timer.                                                                                                 |
| Review scheduling?     | A deterministic SM-2-derived interval scheduler with Again/Hard/Good/Easy, a ten-minute relearning interval and capped ease. Mastery requires repeated spaced success, not merely viewing a word.                                                                                                                |
| Progression?           | Lessons remain browsable at every level. The next recommended session follows completed lessons; level readiness combines real review retention, completed lessons and skill-mock results. No paid or arbitrary locks.                                                                                           |
| What counts as a mock? | Original, timed skill mocks with vocabulary, contextual listening, grammar and connected reading. Unanswered questions count wrong. Tests are resumable and results generate a repair plan. They are not official papers or normalized HSK scores.                                                               |
| Writing?               | Excluded as requested. This prevents claiming complete exam readiness for tests with writing/translation sections. The app points to official sample tests for final preparation.                                                                                                                                |
| Speech assessment?     | Device Mandarin synthesis, local record/replay and optional browser recognition. Recognition reports text matching only, not tone accuracy. Recordings are never uploaded by Ting and are discarded when leaving the activity. Browser recognition can send audio to its provider and requires explicit consent. |
| Videos?                | Opt-in YouTube privacy-enhanced embeds, original creator links and a short active-listening task. Videos supplement, not replace, the lesson; older HSK videos are labeled supplementary rather than current syllabus coverage.                                                                                  |
| Offline?               | Download individual levels and cache the app shell. Vocabulary and saved study state work offline; browser voices depend on installed language packs, recognition and YouTube may need a network. Cloud requests are never cached.                                                                               |
| Sign-in and sync?      | Supabase Google OAuth, row-level ownership and optimistic-version cloud writes. Guest and account storage are separate. Importing guest progress into an account is explicit.                                                                                                                                    |
| Supabase quota?        | Project creation failed because both free slots are occupied. Existing live apps were left untouched. Local learning remains real and persistent; Google and cross-device sync remain unavailable until a dedicated project and Google credentials are configured.                                               |

Design direction: [DESIGN.md](DESIGN.md). Acceptance criteria: [PRD.md](PRD.md).

## What is available

All 11,000 syllabus entries are assigned once across 1,376 study sessions. The original practice foundations include 90 grammar points, 72 connected passages with 216 comprehension questions, and 36 speaking tasks. Each stage has its own timed skill mock. Mock passage selection keeps reading and listening material separate, emphasizes current-stage vocabulary, and counts transcript fallbacks as reading rather than listening.

Local lessons, spaced review, recording, history, progress import/export and downloaded offline study work without an account. Google sign-in and cross-device persistence are implemented but **not enabled on this deployment**. The interface never reports a cloud save without a configured project.

Complete vocabulary coverage is not complete official exam preparation: the grammar and production activities are curated foundations, not a teacher-reviewed textbook or validated pronunciation assessment. Writing and advanced translation remain excluded by request. Supplement Ting with official samples and a qualified Mandarin teacher for high-stakes preparation.

## Run

```sh
npm ci
npm run dev
npm run test
npm run typecheck
npm run lint
npm run build
```

Use Node 22, the same major used for verification and production. No credentials are needed to study. Local progress belongs to this browser; export it before clearing browser storage.

## Cloud configuration

After increasing the Supabase allowance, or choosing a specific project to retire yourself:

```sh
SUPABASE_DB_PASSWORD="$(openssl rand -hex 24)"
supabase projects create ting --org-id fyfeoigahrrlddchccbp \
  --db-password "$SUPABASE_DB_PASSWORD" --region us-west-1
supabase link --project-ref YOUR_PROJECT_REF --password "$SUPABASE_DB_PASSWORD"
supabase db push --password "$SUPABASE_DB_PASSWORD"
supabase projects api-keys --project-ref YOUR_PROJECT_REF
```

Save the generated database password in a password manager, then `unset SUPABASE_DB_PASSWORD`.

In the new project's Authentication settings, enable Google using a Google Cloud OAuth client ID and secret. Set the Google authorized redirect URI to `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`. Set the Supabase site URL to `https://ting-psi-two.vercel.app` and permit `https://ting-psi-two.vercel.app/auth/callback`. Google Cloud consent and credentials require the account owner; Ting never reuses another app's secrets.

```sh
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY production
vercel env add NEXT_PUBLIC_GOOGLE_AUTH_ENABLED production
# enter true for the last variable only after configuring the Google provider
git commit --allow-empty -m "Build with configured Ting cloud environment"
git push origin main
```

Use the publishable (or legacy anon) key, never the service-role key. Run the Supabase security advisor and complete a real Google login, two-account isolation test and cross-device round-trip before describing cloud sync as live.

## Data and attribution

HSK 3.0 word data: **hsk3-vocabulary by Yujay** ([hanzidrill.com/open-data](https://hanzidrill.com/open-data)), **CC BY 4.0**, data version 2026.11.7. Source revision: `cdc6b4f0d27d2c490895e25e1ed2f0320985623f`. Vocabulary, definitions, pinyin and examples are normalized and reordered for Ting. License and source notices live in `public/curriculum/`.

Grammar explanations, reading passages and speaking tasks are original Ting practice material, not official exam questions. HSK is a trademark of CLEC. Ting is independent and not affiliated with CLEC or CTI. Embedded videos remain hosted by their creators and are not downloaded or redistributed.

## Deployment

GitHub is the source of every production build. Link with `vercel link --yes --project ting` and `vercel git connect --yes`, then push `main`. Never deploy an uncommitted working directory.

## Verification

Axe reports no WCAG A/AA violations on the phone render of every route or the dark home screen. These automated checks supplement, rather than replace, assistive-technology testing.

Typecheck, ESLint, all 13 content/engine/progress tests and all nine real-Chrome flow/layout tests pass. The isolated PostgreSQL integration exercise verified anonymous denial, two-account RLS isolation, JSON round-trip, and optimistic-version replay/conflict handling; hosted Google login remains unverified until credentials exist.

Production route and asset smoke checks returned 200, the missing route returned 404, and all cloud methods correctly refused with 503 while unconfigured. The final level-menu capture verifies 44px option targets. Sentence transcript fallbacks also change the instruction to reading and record a reading score, not a listening score.

Every route was rendered at 1440px and 390px, with a 320px overflow assertion; additional 768px, 1024px and dark captures were inspected. Browser flows cover lesson completion and next-session navigation, microphone record/replay with synthetic audio, persisted mock deadlines, validated imports, confirmed deletion, and fully offline navigation. Keyboard probes found named, visible focus indicators at all 15 sampled stops on desktop and phone; overlays dismiss with Escape and restore focus. VoiceOver and physical-device microphone/tone quality were not verified.

The independent design review approved shipping in both rounds. Its refinements were implemented: distinguish session vocabulary, restore Mandarin prominence in retrieval and lesson entry, and paginate mock mistakes. Sloplint is clean and DESIGN.md has no validation errors. Browser-discovered fixes included primary link-button contrast (8.09:1 after removing the unlayered inherited color), a 320px practice-tab overflow, and next-session result state.
