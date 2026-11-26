# Ting product brief

Ting is a mobile-first Chinese learning platform that turns the HSK syllabus into 30-minute, retrieval-led lessons from beginner to advanced proficiency.

## User brief

> An interactive learning platform based on the HSK Chinese learning system tailored towards getting me to pass each level. There should be a mock test at the end of each. We can have suggested YouTube videos embedded in the platform to watch as part of lessons. Tailored towards 30 minute lessons. This should be comprehensive across all HSK levels from beginner to mastery. This should also be mobile friendly so I can do it on my phone (possibly a PWA would be nice). Account creation via sign in with Google. Swap out a Supabase project if necessary. This should be an optimal learning system, inclusive of learning vocabulary, grammar and sentence structure, speaking, and listening. Writing is not important to me at the moment. Make sure to use shadcn for a super clean design, but also make it friendly. Build out the entire learning platform for all the levels with progression, that is the end goal, and commit and push and deploy to Vercel.

## Acceptance criteria

1. Every entry in the 11,000-word November 2025 HSK 3.0 syllabus is accessible with pinyin, definition and a contextual example, with attribution.
2. HSK 1 through 6 and advanced study stages 7 through 9 each have a complete vocabulary lesson sequence, grammar instruction, sentence construction, listening and speaking practice.
3. A daily lesson is paced to 30 minutes: five minutes of review, eight of new vocabulary, five of grammar, five of listening and video, five of speaking, and two of retrieval checks. Time is a suggested allocation, not a forced wait.
4. Spaced review schedules forgotten words sooner and retained words later. Failed checkpoint items inform subsequent review; lesson completion alone never means word mastery.
5. Each study level offers a timed, resumable listening/reading/grammar mock with transparent scoring, answer explanations and a remediation plan.
6. Advanced levels are clearly described as study stages within the official combined HSK 7–9 exam, not fabricated standalone official examinations.
7. Mock results explicitly explain that writing is omitted by request, speech practice is not validated tone assessment, and these are original practice tests rather than official predictions or pass guarantees.
8. Real, attributed YouTube videos can be embedded only after the learner chooses to load them; videos have an external fallback and short active-listening instructions.
9. Learners can listen to Mandarin, record and replay themselves, and use optional browser speech recognition with a supported-device and privacy explanation. Unsupported or denied audio capabilities must have an explicit, usable fallback.
10. A learner can select a starting level, continue a session, track progress and mock attempts, export/import progress and clear local data. No invented progress is presented as real.
11. Phone layouts work at 390px and 320px; primary actions have adequate touch targets. Keyboard users can operate controls and dismiss overlays.
12. The app has a manifest, icons, installation guidance and offline access to downloaded vocabulary and previously cached learning routes. Auth and YouTube remain online-only.
13. Google OAuth and account-isolated cloud persistence are implemented. When project quota or provider credentials prevent enabling them, the UI must say so and keep local study functional. Existing unrelated live projects must not be paused without a specific project choice.
14. Tests, build, lint, real-browser lesson/mock flows, desktop/tablet/mobile captures and an independent design review precede shipping.
15. The complete app is committed to a new GitHub repository and deployed to Vercel from the matching GitHub commit.

## Out of scope

Handwriting drills, paid services, AI tutors, fabricated native-speaker audio, official certification, guarantees of exam success, social feeds and destructive changes to another app.

## Important constraints

Vocabulary coverage is not a complete exam preparation claim. HSK exams assess skills this writing-light product deliberately omits. Higher-level reading needs connected passages and inference, not just flashcards. Recognition output is not a pronunciation or tone score. Durable cloud writes must never report success when no database exists.

## Open decisions

Track, advanced grouping, starting-level placement, review algorithm, progression gates, audio privacy, offline behavior, exam scoring, video selection and cloud provisioning are resolved in README.md.
