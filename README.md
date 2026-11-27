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

## Finding your place again

**Today → lesson → checkpoint → spaced review → level mock.** A running mock comes first because its deadline keeps counting down. Otherwise Today shows the saved lesson, including its actual stage, words and sentence. With no draft it recommends the first unfinished session. After all sessions in a stage, take its mock; reaching Ting’s 80% practice target leads to the next course, or back to review after stage nine. These are suggestions, not locks or HSK certifications.

Adding a library word makes it due without erasing past recall or recording a failure. An early successful replay is practice, not another spaced repetition. Leave Review open and newly due words appear without refreshing. If one stage is unavailable offline, cards from downloaded stages still work.

If Ting cannot read a save, **do not clear browser storage**. Settings → **Export progress** downloads the original file unchanged, even if it is malformed. A normal lesson or preference change cannot overwrite it. To recover, confirm an import of a known-good backup, load a known-good account copy if available, or explicitly clear local progress. Export any unsynced work before loading cloud progress or signing out; an empty cloud account is never a replacement for local work.

## Architecture

| Area | Where it lives |
| --- | --- |
| Course and Today | `lib/curriculum.ts` plans stages, sessions and mocks; `components/home.tsx`, `course.tsx` and `lesson.tsx` present the study path. |
| Study material | `public/curriculum/` contains licensed stage packs; `lib/data.ts` checks count, identity, level and word fields before use. `lib/content.ts` holds original exercises; `lib/videos.ts` holds supplementary links. |
| Memory and assessment | `lib/progress.ts` validates schema 1, schedules recall and scores each timed mock once. Lesson, review and exam screens use those same rules. |
| Device and account saves | `lib/device-progress.ts` owns the shipped `ting:guest:v1` and `ting:account:<id>:v1` keys. `components/learning-provider.tsx` scopes writes to the active profile. `lib/cloud-copy.ts`, `/api/progress` and the Supabase migration validate restores and versioned account saves. |
| Mobile, media and offline | Existing shadcn/Base UI controls are themed in `app/globals.css`. `lib/offline.ts` and `public/sw.js` cache screens and stage packs; media practice keeps recording local and recognition and video opt-in. |

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

Run `npm test`, `npm run lint`, `npm run build` and `npm run test:e2e` (installed Google Chrome). The browser suite starts a production server on port 4317; `TING_SHOT_DIR` chooses where to put captures. For `npm run test:database`, set `DATABASE_TEST_URL` to a **new isolated PostgreSQL cluster** with a database named `ting_test`. The test creates roles and a mock auth schema; never use a hosted or shared database.

Version 0.0.2 covers 22 unit/content tests and 14 Chrome flow/layout tests. `tests/fixtures/shipped-v1.json` is local-only study data actually produced by release `b11c119` in a throwaway profile. Tests open it directly, preserve its cards/preferences/draft, export damaged bytes unchanged, recover by confirmed import, and exercise stage completion through the mock into the next course. The isolated database exercise covers two-account ownership, anonymous denial, JSON round-trips and stale versions. Local mock responses exercised empty cloud loads, save/reload versions, sign-out and late account responses; they are not a hosted Google login.

On macOS 26.3, Chrome 158 rendered every public screen at 390 and 1440 CSS pixels, with 320px overflow checks, tablet and dark captures. WebKit 27.2 also rendered all 12 routes at iPhone size and resumed a saved word after reload. Axe found no A/AA violations on the phone tour or dark home; 20 real Tab stops on desktop and phone had names and visible rings. Browser automation used synthetic microphone input, not a physical microphone. These checks do not substitute for VoiceOver, real phone installation or listening to device voices.

## Owner launch checklist

- [ ] To enable accounts, provide a dedicated Supabase slot, apply the migration, and configure Google OAuth and Vercel production variables as described above. No other project needs to be paused by Ting. Set up a private owner contact for account deletion before inviting account users; GitHub issue reports are public.
- [ ] After the GitHub deployment, sign in with two real accounts on two devices. Verify restore, conflict handling, sign-out and deletion before announcing cloud sync.
- [ ] On a real iPhone and Android phone, install the PWA, download a level, reopen in airplane mode, check VoiceOver/TalkBack and try a Mandarin voice and microphone. Browser emulation does not validate physical audio or operating-system installation prompts.
