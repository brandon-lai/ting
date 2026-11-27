"use client"

import Link from "next/link"
import {
  ArrowRight,
  RotateCcw,
  Check,
  BookOpen,
  CalendarDays,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress as ProgressBar } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useLearning } from "./learning-provider"
import { useWords } from "./use-words"
import { useClock } from "./use-clock"
import { LoadState, SpeakButton } from "./common"
import {
  levels,
  dailyRecommendation,
  lessonTitle,
  lessonWords,
  lessonCount,
  completedCount,
  itinerary,
} from "@/lib/curriculum"
import { dueIds, isMastered, streak } from "@/lib/progress"
import type { Level } from "@/lib/types"

export function Home() {
  const { progress, ready, update } = useLearning()
  const now = useClock(progress.cards)
  const [choose, setChoose] = useState(false)
  const [selection, setSelection] = useState<Level>(progress.level)
  const recommendation = dailyRecommendation(progress)
  const level = levels[progress.level - 1]
  const count = completedCount(progress, progress.level)
  const due = ready ? dueIds(progress, now).length : 0
  const mastered = Object.values(progress.cards).filter(isMastered).length
  const days = ready && now ? streak(progress, now) : 0
  return (
    <>
      <div className="page-intro">
        <div>
          <h1>
            {progress.onboarded
              ? "A new day. A little Chinese."
              : "Make your first conversation."}
          </h1>
          <p>
            {progress.onboarded
              ? "Remember it. Hear it. Make it your own."
              : "From your first 你好 to finding the right words."}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setSelection(progress.level)
            setChoose(true)
          }}
        >
          Choose your level
        </Button>
      </div>
      {!ready ? (
        <p className="loading-line" role="status">
          Opening your study plan…
        </p>
      ) : recommendation.kind === "lesson" ? (
        <DailyLesson {...recommendation} />
      ) : (
        <StageTicket next={recommendation} />
      )}
      <section className="retention-strip" aria-label="Review recommendation">
        <div className="row">
          <RotateCcw size={24} aria-hidden="true" />
          <div>
            <h3>
              {due
                ? `${due} ${due === 1 ? "word is" : "words are"} ready for review`
                : Object.keys(progress.cards).length
                  ? "Your review is up to date"
                  : "Let’s give your memory a head start"}
            </h3>
            <p className="small muted">
              {due
                ? "A quick recall now makes tomorrow easier."
                : "New words enter review after your lesson checkpoint."}
            </p>
          </div>
        </div>
        <Button variant="outline" render={<Link href="/review" />}>
          Open word review
          <ArrowRight size={18} aria-hidden="true" />
        </Button>
      </section>
      <section className="section">
        <div className="section-head">
          <h2>Your path through Chinese</h2>
          <Link href="/learn" className="text-link small">
            All nine study stages
          </Link>
        </div>
        <div className="row wrap muted small">
          <CalendarDays size={18} aria-hidden="true" />
          <span>
            {days
              ? `${days}-day study streak`
              : "Your first study day is waiting"}
          </span>
          <span>{mastered} words retained in spaced review</span>
        </div>
        <div className="level-ledger">
          {levels
            .slice(
              Math.min(progress.level - 1, 6),
              Math.min(progress.level - 1, 6) + 3
            )
            .map((item) => {
              const done = completedCount(progress, item.level)
              return (
                <div
                  className={`level-row ${item.level === progress.level ? "current" : ""}`}
                  key={item.level}
                >
                  <span className="level-number">{item.level}</span>
                  <div>
                    <h3>{item.name}</h3>
                    <p className="small muted">{item.subtitle}</p>
                  </div>
                  <div className="level-progress">
                    <p className="ledger-count">
                      {done} / {lessonCount(item.level)} sessions
                    </p>
                    <ProgressBar
                      aria-label={`Stage ${item.level} lesson completion`}
                      value={(done / lessonCount(item.level)) * 100}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Browse stage ${item.level}`}
                    render={<Link href={`/learn?level=${item.level}`} />}
                  >
                    <ArrowRight size={20} aria-hidden="true" />
                  </Button>
                </div>
              )
            })}
        </div>
        <p className="small muted space-above">
          {level.cumulative.toLocaleString()} cumulative syllabus words at this
          stage.{" "}
          {count
            ? `${count} sessions completed so far.`
            : "Your progress starts with your first completed session."}
        </p>
      </section>
      <Dialog open={choose} onOpenChange={setChoose}>
        <DialogContent>
          <DialogTitle>Start where your Chinese is</DialogTitle>
          <DialogDescription>
            Begin at HSK 1, or choose a familiar level. Nothing is locked; you
            can change your starting level anytime.
          </DialogDescription>
          <div className="onboarding-levels">
            {levels.map((l) => (
              <Button
                variant="outline"
                key={l.level}
                aria-pressed={selection === l.level}
                onClick={() => setSelection(l.level)}
              >
                {l.level <= 6 ? `HSK ${l.level}` : `Stage ${l.level}`}
                {selection === l.level && (
                  <Check size={16} aria-hidden="true" />
                )}
              </Button>
            ))}
          </div>
          <p className="small muted">
            Stages 7 to 9 divide the official combined advanced syllabus for
            pacing. They are not separate official exams.
          </p>
          <Button
            onClick={() => {
              if (update((p) => ({ ...p, level: selection, onboarded: true })))
                setChoose(false)
            }}
          >
            Set my starting level
          </Button>
          <Link
            href="/exams?diagnostic=1"
            className="text-link small"
            onClick={() => setChoose(false)}
          >
            Try a short diagnostic first
          </Link>
        </DialogContent>
      </Dialog>
    </>
  )
}

function DailyLesson({
  level,
  index,
  resume,
}: {
  level: Level
  index: number
  resume: boolean
}) {
  const { progress } = useLearning()
  const { words, loading, error, retry } = useWords(level)
  if (loading || error)
    return <LoadState loading={loading} error={error} retry={retry} />
  const current = lessonWords(words, index)
  return (
    <div className="dashboard-grid">
      <section className="daily-ticket" aria-labelledby="daily-title">
        <div className="row between wrap">
          <h2 id="daily-title">{lessonTitle(level, index)}</h2>
          <span className="pill yellow">30 minutes</span>
        </div>
        <p className="small muted space-above">
          {level <= 6 ? `HSK ${level}` : `Advanced stage ${level}`} / Session{" "}
          {index + 1} of {lessonCount(level)}
        </p>
        <div className="ticket-content">
          <div className="itinerary-list">
            {itinerary.map((step, i) => (
              <div className="itinerary-row" key={step.name}>
                <span className="row gap-small">
                  <span className="step-number">{i + 1}</span>
                  {step.name}
                </span>
                <span className="numbers muted">{step.minutes} min</span>
              </div>
            ))}
          </div>
          <div className="ticket-phrase">
            <p className="zh" lang="zh-Hans">
              {current[0]?.hanzi}
            </p>
            {progress.pinyin && <p className="pinyin">{current[0]?.pinyin}</p>}
            <p className="small muted">{current[0]?.en}</p>
          </div>
        </div>
        <div className="ticket-footer">
          <Button
            size="lg"
            render={<Link href={`/study?level=${level}&lesson=${index}`} />}
          >
            {resume ? "Continue your lesson" : "Start your lesson"}
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
          <Link className="text-link small" href={`/learn?level=${level}`}>
            See your course
          </Link>
        </div>
      </section>
      <section className="study-note" aria-labelledby="phrase-title">
        <div className="row between">
          <h2 id="phrase-title">A sentence to take with you</h2>
          <BookOpen size={20} aria-hidden="true" />
        </div>
        <p className="zh" lang="zh-Hans">
          {current[0]?.exampleZh}
        </p>
        {progress.pinyin && (
          <p className="small muted">{current[0]?.examplePinyin}</p>
        )}
        <p className="quote-translation">{current[0]?.exampleEn}</p>
        {current[0] && (
          <SpeakButton text={current[0].exampleZh} label="Hear the sentence" />
        )}
        <p className="small muted">
          Listen once. Then try saying it without looking.
        </p>
      </section>
    </div>
  )
}

function StageTicket({
  next,
}: {
  next: Exclude<ReturnType<typeof dailyRecommendation>, { kind: "lesson" }>
}) {
  const name =
    next.level <= 6 ? `HSK ${next.level}` : `advanced stage ${next.level}`
  const [title, detail, action, href] =
    next.kind === "mock"
      ? next.resume
        ? [
            "Your timed mock is in progress",
            "Your answers are saved. The original deadline still applies.",
            "Resume your mock",
            `/exams?level=${next.level}`,
          ]
        : [
            `Put ${name} to the test`,
            "You’ve finished the sessions. Take the skill mock, then use its feedback to decide what to practice.",
            "Open level mock",
            `/exams?level=${next.level}`,
          ]
      : next.kind === "next-stage"
        ? [
            `Your next stop: ${name}`,
            "You finished the sessions and reached Ting’s practice target. Keep reviewing while you explore the next stage.",
            `Explore ${name}`,
            `/learn?level=${next.level}`,
          ]
        : [
            "Keep your advanced Chinese in use",
            "You finished the final stage and reached Ting’s practice target. Return to spaced review and official samples for exam preparation.",
            "Review your words",
            "/review",
          ]
  return (
    <section className="daily-ticket stack" aria-labelledby="daily-title">
      <h2 id="daily-title">{title}</h2>
      <p>{detail}</p>
      <div>
        <Button size="lg" render={<Link href={href} />}>
          {action}
          <ArrowRight size={18} aria-hidden="true" />
        </Button>
      </div>
    </section>
  )
}
