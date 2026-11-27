"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Check, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLearning } from "./learning-provider"
import { useWords } from "./use-words"
import { LoadState, SpeakButton, QuestionView, Empty } from "./common"
import { SpeakingPractice, VideoLesson } from "./media-practice"
import {
  asLevel,
  lessonCount,
  lessonTitle,
  lessonWords,
  lessonGrammar,
  lessonSpeaking,
  lessonKey,
  nextLesson,
  itinerary,
  checkpointQuestions,
  random,
  shuffle,
  wordQuestion,
} from "@/lib/curriculum"
import { dueIds, schedule, activityDay, queueForReview } from "@/lib/progress"
import { videos } from "@/lib/videos"
import type { Level, SessionDraft, Word, Rating } from "@/lib/types"

export function Lesson() {
  const { progress, ready, update } = useLearning()
  const params = useSearchParams()
  const level = asLevel(params.get("level") ?? progress.level)
  const requested = Number(params.get("lesson") ?? 0)
  const index =
    Number.isInteger(requested) &&
    requested >= 0 &&
    requested < lessonCount(level)
      ? requested
      : -1
  const { words, loading, error, retry } = useWords(level)
  const [result, setResult] = useState<{
    level: Level
    index: number
    score: number
  } | null>(null)
  const draft =
    progress.session?.level === level && progress.session.lesson === index
      ? progress.session
      : null
  function start() {
    const now = Date.now()
    const available = new Set(words.map((w) => w.id))
    update((p) => ({
      ...p,
      onboarded: true,
      session: {
        level,
        lesson: index,
        step: 0,
        wordIndex: 0,
        checkpoint: 0,
        answers: {},
        reviewIds: dueIds(p, now)
          .filter((id) => available.has(id))
          .slice(0, 4),
        started: now,
      },
    }))
  }
  if (index === -1)
    return (
      <Empty
        title="That lesson isn’t in the course"
        detail="Choose an existing session from your course. Your progress hasn’t changed."
        href="/learn"
        action="Open your course"
      />
    )
  if (result?.level === level && result.index === index) {
    const remaining = nextLesson(progress, level)
    return (
      <>
        <div className="page-intro">
          <div>
            <h1>You made Chinese your own.</h1>
            <p>
              Keep the words moving through review. That’s where they start to
              stay.
            </p>
          </div>
        </div>
        <section className="exercise-surface stack">
          <div className="score-line">
            <span className="score-number">{result.score}%</span>
            <span className="muted">lesson checkpoint</span>
          </div>
          <p>
            {result.score >= 80
              ? "A strong first recall. Untested words are ready for review now; remembered words return later."
              : "Some words need another encounter. Your missed and untested words are ready for review."}
          </p>
          <p className="small muted">
            This checkpoint covers recall and grammar. Speaking practice is
            self-reported, not automatically graded.
          </p>
          <div className="dialog-actions">
            <Button render={<Link href="/review" />}>
              Review your words
              <RotateCcw size={18} aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              render={
                <Link
                  href={
                    remaining !== null
                      ? `/study?level=${level}&lesson=${remaining}`
                      : `/exams?level=${level}`
                  }
                />
              }
            >
              {remaining !== null ? "Open next session" : "Open level mock"}
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </section>
      </>
    )
  }
  return (
    <>
      <div className="page-intro">
        <div>
          <h1>{lessonTitle(level, index)}</h1>
          <p>
            {level <= 6 ? `HSK ${level}` : `Advanced stage ${level}`} / Session{" "}
            {index + 1} / A 30-minute study plan
          </p>
        </div>
        <Link className="text-link" href={`/learn?level=${level}`}>
          Back to course
        </Link>
      </div>
      <LoadState loading={loading || !ready} error={error} retry={retry} />
      {ready &&
        !loading &&
        !error &&
        (!draft ? (
          <div className="exercise-surface stack">
            <h2>
              {progress.session
                ? "Another lesson is in progress"
                : "One sentence closer to a conversation"}
            </h2>
            <p className="zh reading-text" lang="zh-Hans">
              {lessonWords(words, index)[0]?.exampleZh}
            </p>
            <p className="small muted">
              {itinerary
                .map((step) => `${step.name} ${step.minutes} min`)
                .join(" / ")}
            </p>
            <p>
              {progress.session
                ? "You can resume it, or replace the saved session with this one. Completed lessons and reviewed words will stay."
                : "Recall first, learn eight words, build a sentence, listen and speak. The timings guide your pace; they never make you wait."}
            </p>
            <div className="dialog-actions">
              <Button onClick={start}>
                {progress.session
                  ? "Start this lesson instead"
                  : "Begin 30-minute lesson"}
              </Button>
              {progress.session && (
                <Button
                  variant="outline"
                  render={
                    <Link
                      href={`/study?level=${progress.session.level}&lesson=${progress.session.lesson}`}
                    />
                  }
                >
                  Resume saved lesson
                </Button>
              )}
            </div>
          </div>
        ) : (
          <LessonActivity
            key={`${level}-${index}-${draft.step}`}
            level={level}
            index={index}
            words={words}
            draft={draft}
            finish={(score) => setResult({ level, index, score })}
          />
        ))}
    </>
  )
}

function LessonActivity({
  level,
  index,
  words,
  draft,
  finish,
}: {
  level: Level
  index: number
  words: Word[]
  draft: SessionDraft
  finish: (score: number) => void
}) {
  const { progress, update } = useLearning()
  const current = lessonWords(words, index)
  const point = lessonGrammar(level, index)
  const [revealed, setRevealed] = useState(false)
  const [tokens, setTokens] = useState<number[]>([])
  const [grammarFeedback, setGrammarFeedback] = useState<string | null>(null)
  const [grammarCorrect, setGrammarCorrect] = useState(false)
  const [spoken, setSpoken] = useState(false)
  const [listenSelected, setListenSelected] = useState<number | undefined>()
  const [listenChecked, setListenChecked] = useState(false)
  const [transcript, setTranscript] = useState(false)
  const [checked, setChecked] = useState(false)
  const surface = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const heading = surface.current?.querySelector("h2")
    if (!heading) return
    heading.tabIndex = -1
    heading.focus({ preventScroll: true })
    heading.scrollIntoView({ block: "start", behavior: "instant" })
  }, [draft.step, draft.wordIndex, draft.checkpoint])
  const tokenOrder = shuffle(
    point.tokens.map((_, i) => i),
    random(index + level)
  )
  const questions = checkpointQuestions(level, index, current, words)
  const question = questions[draft.checkpoint]
  const reviewWord = words.find(
    (w) => w.id === draft.reviewIds[draft.wordIndex]
  )
  const listenQuestion = wordQuestion(
    current[index % current.length],
    words,
    index + 321,
    true
  )
  function patch(change: Partial<SessionDraft>) {
    return update((p) => ({
      ...p,
      session: p.session ? { ...p.session, ...change } : null,
    }))
  }
  function next() {
    patch({ step: draft.step + 1, wordIndex: 0 })
  }
  function rate(rating: Rating, now: number) {
    if (!reviewWord) return
    if (
      update((p) => ({
        ...p,
        cards: {
          ...p.cards,
          [reviewWord.id]: schedule(p.cards[reviewWord.id], rating, now),
        },
        session: p.session
          ? { ...p.session, wordIndex: p.session.wordIndex + 1 }
          : null,
      }))
    )
      setRevealed(false)
  }
  function complete() {
    const now = Date.now()
    const score = Math.round(
      (questions.filter((q) => draft.answers[q.id] === q.answer).length /
        questions.length) *
        100
    )
    const tested = new Map(
      questions
        .filter((q) => q.wordId)
        .map((q) => [q.wordId!, draft.answers[q.id] === q.answer])
    )
    const saved = update((p) => {
      const cards = { ...p.cards }
      current.forEach((word) => {
        if (tested.has(word.id))
          cards[word.id] = schedule(
            cards[word.id],
            tested.get(word.id) ? "good" : "again",
            now
          )
        else if (!cards[word.id])
          cards[word.id] = queueForReview(undefined, now)
      })
      return {
        ...p,
        level,
        session: null,
        lessons: {
          ...p.lessons,
          [lessonKey(level, index)]: { completed: now, score },
        },
        cards,
        activity: {
          ...p.activity,
          [activityDay(now)]: (p.activity[activityDay(now)] ?? 0) + 1,
        },
      }
    })
    if (saved) finish(score)
  }
  return (
    <div className="study-layout">
      <aside className="step-list" aria-label="Lesson itinerary">
        {itinerary.map((step, i) => (
          <div
            className={`step-item ${i === draft.step ? "active" : i < draft.step ? "done" : ""}`}
            key={step.name}
            aria-current={i === draft.step ? "step" : undefined}
          >
            <span className="step-icon">
              {i < draft.step ? <Check size={16} aria-hidden="true" /> : i + 1}
            </span>
            <span className="grow">{step.name}</span>
            <span className="step-duration">{step.minutes} min</span>
          </div>
        ))}
      </aside>
      <div className="exercise-surface" ref={surface}>
        {draft.step === 0 && (
          <>
            <h2>Remember before you learn</h2>
            {reviewWord ? (
              <>
                <p className="small muted">
                  Recall {draft.wordIndex + 1} of {draft.reviewIds.length} from
                  this level.
                </p>
                <p lang="zh-Hans" className="zh large-word">
                  {reviewWord.hanzi}
                </p>
                {!revealed ? (
                  <Button onClick={() => setRevealed(true)}>
                    Reveal meaning
                  </Button>
                ) : (
                  <>
                    <p>{reviewWord.en}</p>
                    <p className="zh space-above" lang="zh-Hans">
                      {reviewWord.exampleZh}
                    </p>
                    <div className="rating-grid">
                      {(["again", "hard", "good", "easy"] as Rating[]).map(
                        (r) => (
                          <Button
                            key={r}
                            variant={r === "good" ? "default" : "outline"}
                            onClick={() => rate(r, Date.now())}
                          >
                            {r[0].toUpperCase() + r.slice(1)}
                          </Button>
                        )
                      )}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <p>
                  {draft.reviewIds.length
                    ? "Your recall warm-up is finished. Let’s meet today’s new words."
                    : "No words from this level are due yet. Try saying hello or introducing yourself in Chinese; we’ll build from there."}
                </p>
                <p className="small muted space-above">
                  Words from other levels are in your full{" "}
                  <Link className="text-link" href="/review">
                    word review
                  </Link>
                  .
                </p>
                <div className="exercise-footer">
                  <span className="small muted">
                    Suggested budget: 5 minutes
                  </span>
                  <Button onClick={next}>
                    Learn today’s words
                    <ArrowRight size={18} aria-hidden="true" />
                  </Button>
                </div>
              </>
            )}
          </>
        )}
        {draft.step === 1 && (
          <>
            <div className="row between">
              <h2>Meet your new words</h2>
              <span className="small numbers">
                {draft.wordIndex + 1} / {current.length}
              </span>
            </div>
            <p className="zh large-word" lang="zh-Hans">
              {current[draft.wordIndex].hanzi}
            </p>
            {progress.pinyin && (
              <p className="word-pinyin">{current[draft.wordIndex].pinyin}</p>
            )}
            <h3 className="space-above">{current[draft.wordIndex].en}</h3>
            <div className="row wrap space-above">
              <SpeakButton
                text={current[draft.wordIndex].hanzi}
                label="Hear the word"
              />
              <SpeakButton
                text={current[draft.wordIndex].exampleZh}
                label="Hear the sentence"
              />
            </div>
            <div className="example-block">
              <p className="zh" lang="zh-Hans">
                {current[draft.wordIndex].exampleZh}
              </p>
              {progress.pinyin && (
                <p className="small muted">
                  {current[draft.wordIndex].examplePinyin}
                </p>
              )}
              <p>{current[draft.wordIndex].exampleEn}</p>
            </div>
            <div className="exercise-footer">
              <Button
                variant="ghost"
                disabled={draft.wordIndex === 0}
                onClick={() => patch({ wordIndex: draft.wordIndex - 1 })}
              >
                <ArrowLeft size={18} aria-hidden="true" />
                Previous word
              </Button>
              <Button
                onClick={() =>
                  draft.wordIndex + 1 < current.length
                    ? patch({ wordIndex: draft.wordIndex + 1 })
                    : next()
                }
              >
                {draft.wordIndex + 1 < current.length
                  ? "Next word"
                  : "Build a sentence"}
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </>
        )}
        {draft.step === 2 && (
          <>
            <h2>{point.title}</h2>
            <p>{point.explanation}</p>
            <div className="example-block">
              <h3>{point.pattern}</h3>
              <p>{point.exampleEn}</p>
            </div>
            <p className="small muted space-above">
              Put the Chinese pieces in order. Select a placed piece to return
              it.
            </p>
            <div
              className="sentence-board"
              aria-label="Your constructed sentence"
            >
              {tokens.length ? (
                tokens.map((id, position) => (
                  <Button
                    variant="outline"
                    key={id}
                    onClick={() => {
                      setTokens((t) => t.filter((_, i) => i !== position))
                      setGrammarCorrect(false)
                      setGrammarFeedback(null)
                    }}
                  >
                    <span className="zh" lang="zh-Hans">
                      {point.tokens[id]}
                    </span>
                  </Button>
                ))
              ) : (
                <p className="small muted">Your sentence goes here</p>
              )}
            </div>
            <div className="token-pool">
              {tokenOrder
                .filter((id) => !tokens.includes(id))
                .map((id) => (
                  <Button
                    variant="outline"
                    key={id}
                    onClick={() => {
                      setTokens((t) => [...t, id])
                      setGrammarFeedback(null)
                    }}
                  >
                    <span lang="zh-Hans" className="zh">
                      {point.tokens[id]}
                    </span>
                  </Button>
                ))}
            </div>
            {grammarFeedback && (
              <div
                className={`feedback ${grammarCorrect ? "correct" : "incorrect"}`}
                role="status"
              >
                {grammarFeedback}
              </div>
            )}
            <div className="exercise-footer">
              <Button
                variant="outline"
                onClick={() => {
                  setTokens(point.tokens.map((_, i) => i))
                  setGrammarCorrect(true)
                  setGrammarFeedback(
                    `Model order: ${point.exampleZh} ${point.why}`
                  )
                }}
              >
                Show model order
              </Button>
              {grammarCorrect ? (
                <Button onClick={next}>
                  Practice listening
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
              ) : (
                <Button
                  disabled={!tokens.length}
                  onClick={() => {
                    const correct =
                      tokens.map((i) => point.tokens[i]).join("") ===
                      point.exampleZh
                    setGrammarCorrect(correct)
                    setGrammarFeedback(
                      correct
                        ? `That order works. ${point.why}`
                        : "Not quite. Compare the pattern and move the pieces, or show the model order."
                    )
                  }}
                >
                  Check sentence
                </Button>
              )}
            </div>
          </>
        )}
        {draft.step === 3 && (
          <>
            <QuestionView
              question={listenQuestion}
              selected={listenSelected}
              onSelect={setListenSelected}
              reveal={listenChecked}
              showTranscript={transcript || listenChecked}
            />
            <Button
              className="space-above"
              variant="ghost"
              onClick={() => setTranscript((v) => !v)}
            >
              {transcript ? "Hide transcript" : "Show listening transcript"}
            </Button>
            <VideoLesson
              video={videos.find((v) => v.levels.includes(level))!}
            />
            <div className="exercise-footer">
              <p className="small muted">
                Listen, pause and summarize. Suggested budget: 5 minutes.
              </p>
              {listenChecked ? (
                <Button onClick={next}>
                  Say it yourself
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
              ) : (
                <Button
                  disabled={listenSelected === undefined}
                  onClick={() => setListenChecked(true)}
                >
                  Check listening answer
                </Button>
              )}
            </div>
          </>
        )}
        {draft.step === 4 && (
          <>
            <SpeakingPractice task={lessonSpeaking(level, index)} />
            <div className="exercise-footer">
              <Button
                variant="outline"
                aria-pressed={spoken}
                onClick={() => setSpoken((v) => !v)}
              >
                {spoken && <Check size={18} aria-hidden="true" />}I practiced
                this aloud
              </Button>
              <Button disabled={!spoken} onClick={next}>
                Check what stayed
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
            <p className="small muted space-above">
              This is your self-report, not an automated speaking grade.
              Recording is optional.
            </p>
          </>
        )}
        {draft.step === 5 && (
          <>
            <div className="row between small muted">
              <span>Recall without help</span>
              <span>
                {draft.checkpoint + 1} / {questions.length}
              </span>
            </div>
            <QuestionView
              question={question}
              selected={draft.answers[question.id]}
              onSelect={(answer) =>
                patch({ answers: { ...draft.answers, [question.id]: answer } })
              }
              reveal={checked}
              showTranscript={checked}
            />
            <div className="exercise-footer">
              <p className="small muted">Missed words return in review.</p>
              {checked ? (
                <Button
                  onClick={() => {
                    if (draft.checkpoint + 1 === questions.length) complete()
                    else {
                      patch({ checkpoint: draft.checkpoint + 1 })
                      setChecked(false)
                    }
                  }}
                >
                  {draft.checkpoint + 1 === questions.length
                    ? "Finish lesson"
                    : "Next question"}
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
              ) : (
                <Button
                  disabled={draft.answers[question.id] === undefined}
                  onClick={() => setChecked(true)}
                >
                  Check answer
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
