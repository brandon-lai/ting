"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Clock3, ArrowRight, ArrowLeft, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useLearning } from "./learning-provider"
import { LevelPicker } from "./course"
import { QuestionView, Empty } from "./common"
import {
  asLevel,
  buildExam,
  examSpec,
  completedCount,
  lessonCount,
  levels,
  wordQuestion,
  random,
  shuffle,
} from "@/lib/curriculum"
import { loadThrough } from "@/lib/data"
import {
  scoreExam,
  repairPlan,
  schedule,
  activityDay,
  isMastered,
} from "@/lib/progress"
import { grammar } from "@/lib/content"
import type { ExamAttempt, Level, Question } from "@/lib/types"

export function Exams() {
  const { progress, update, ready } = useLearning()
  const params = useSearchParams()
  const [level, setLevel] = useState(
    asLevel(params.get("level") ?? progress.level)
  )
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ExamAttempt | null>(null)
  const [confirm, setConfirm] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  const [diagnostic, setDiagnostic] = useState<Question[] | null>(null)
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<
    Record<string, number>
  >({})
  const [diagnosticIndex, setDiagnosticIndex] = useState(0)
  const [diagnosticResult, setDiagnosticResult] = useState<Level | null>(null)
  const exam = progress.exam
  const spec = examSpec(level)
  const current = exam?.questions[exam.position]
  const attempts = progress.attempts.filter(
    (attempt) => attempt.level === level
  )
  const mastered = Object.entries(progress.cards).filter(([id, card]) => {
    const number = Number(id.slice(5))
    const previous = levels[level - 2]?.cumulative ?? 0
    return (
      number > previous &&
      number <= levels[level - 1].cumulative &&
      isMastered(card)
    )
  }).length

  function finish() {
    if (!exam) return
    const time = Date.now()
    const attempt = scoreExam(exam, time)
    if (
      update((p) => {
        const cards = { ...p.cards }
        attempt.mistakes.forEach(({ question }) => {
          if (question.wordId)
            cards[question.wordId] = {
              ...schedule(cards[question.wordId], "again", time),
              due: time,
            }
        })
        return {
          ...p,
          exam: null,
          attempts: [attempt, ...p.attempts].slice(0, 50),
          cards,
          activity: {
            ...p.activity,
            [activityDay(time)]: (p.activity[activityDay(time)] ?? 0) + 1,
          },
        }
      })
    ) {
      setResult(attempt)
      setConfirm(false)
    }
  }

  useEffect(() => {
    if (!exam) return
    const interval = setInterval(() => {
      const time = Date.now()
      setNow(time)
      if (time >= exam.deadline) {
        const attempt = scoreExam(exam, time)
        if (
          update((p) => {
            const cards = { ...p.cards }
            attempt.mistakes.forEach(({ question }) => {
              if (question.wordId)
                cards[question.wordId] = {
                  ...schedule(cards[question.wordId], "again", time),
                  due: time,
                }
            })
            return {
              ...p,
              exam: null,
              attempts: [attempt, ...p.attempts].slice(0, 50),
              cards,
              activity: {
                ...p.activity,
                [activityDay(time)]: (p.activity[activityDay(time)] ?? 0) + 1,
              },
            }
          })
        )
          setResult(attempt)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [exam, update])

  async function start() {
    setBusy(true)
    setError(null)
    try {
      const words = await loadThrough(level)
      const time = Date.now()
      const seed = crypto.getRandomValues(new Uint32Array(1))[0]
      const questions = buildExam(level, words, seed)
      if (
        update((p) => ({
          ...p,
          exam: {
            level,
            seed,
            questions,
            answers: {},
            position: 0,
            started: time,
            deadline: time + spec.minutes * 60000,
          },
        }))
      ) {
        setResult(null)
        setNow(time)
      }
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "The test could not start. Try again online."
      )
    } finally {
      setBusy(false)
    }
  }

  async function startDiagnostic() {
    setBusy(true)
    setError(null)
    try {
      const words = await loadThrough(9)
      const rng = random(773)
      const questions = levels.flatMap((l) => {
        const pool = words.filter((w) => w.level === l.level)
        const word = shuffle(pool, rng)[0]
        const point = grammar.find((g) => g.level === l.level)!
        return [
          wordQuestion(word, pool, l.level + 400),
          {
            id: `diagnostic-${l.level}`,
            skill: "grammar" as const,
            prompt: "Complete the sentence.",
            text: point.cloze,
            options: point.options,
            answer: point.answer,
            explanation: point.why,
          },
        ]
      })
      setDiagnostic(questions)
      setDiagnosticAnswers({})
      setDiagnosticIndex(0)
      setDiagnosticResult(null)
      setResult(null)
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Diagnostic words could not load. Choose your starting level instead."
      )
    } finally {
      setBusy(false)
    }
  }

  if (result)
    return <ExamResults attempt={result} back={() => setResult(null)} />
  if (diagnosticResult)
    return (
      <Empty
        title={`Try ${diagnosticResult <= 6 ? `HSK ${diagnosticResult}` : `advanced stage ${diagnosticResult}`} as a starting point`}
        detail="This short diagnostic sampled vocabulary and grammar only. It cannot assess listening, fluency, tones or exam readiness. Browse the level and move down if the lessons feel too difficult."
        href={`/learn?level=${diagnosticResult}`}
        action="Explore the suggested level"
      />
    )
  if (diagnostic) {
    const q = diagnostic[diagnosticIndex]
    return (
      <>
        <div className="page-intro">
          <div>
            <h1>Find a place to start.</h1>
            <p>
              18 vocabulary and grammar questions. An advisory sample, not a
              placement certificate.
            </p>
          </div>
        </div>
        <div className="exercise-surface">
          <p className="small muted">
            {diagnosticIndex + 1} / {diagnostic.length}
          </p>
          <QuestionView
            question={q}
            selected={diagnosticAnswers[q.id]}
            onSelect={(answer) =>
              setDiagnosticAnswers((a) => ({ ...a, [q.id]: answer }))
            }
          />
          <div className="exercise-footer">
            <Button variant="outline" onClick={() => setDiagnostic(null)}>
              Choose a level instead
            </Button>
            <Button
              disabled={diagnosticAnswers[q.id] === undefined}
              onClick={() => {
                if (diagnosticIndex + 1 < diagnostic.length)
                  setDiagnosticIndex((n) => n + 1)
                else {
                  let suggested: Level = 1
                  for (const l of levels) {
                    const pair = diagnostic.slice(
                      (l.level - 1) * 2,
                      l.level * 2
                    )
                    if (
                      pair.filter(
                        (item) => diagnosticAnswers[item.id] === item.answer
                      ).length < 2
                    ) {
                      suggested = l.level
                      break
                    }
                    suggested = l.level
                  }
                  setDiagnosticResult(suggested)
                  setDiagnostic(null)
                }
              }}
            >
              {diagnosticIndex + 1 === diagnostic.length
                ? "See a starting suggestion"
                : "Next diagnostic question"}
            </Button>
          </div>
        </div>
      </>
    )
  }
  if (exam && current) {
    const remaining = Math.max(0, Math.ceil((exam.deadline - now) / 1000))
    const expired = remaining === 0
    return (
      <>
        <div className="page-intro">
          <div>
            <h1>
              {exam.level <= 6
                ? `HSK ${exam.level}`
                : `Advanced stage ${exam.level}`}{" "}
              skill mock
            </h1>
            <p>
              Original practice questions. Writing and automatic speaking
              assessment are not included.
            </p>
          </div>
        </div>
        <div className="exam-toolbar">
          <span className="pill">
            Question {exam.position + 1} / {exam.questions.length}
          </span>
          <span
            className={`timer row ${remaining < 300 ? "urgent" : ""}`}
            aria-label="Time remaining"
          >
            <Clock3 size={20} aria-hidden="true" />
            {Math.floor(remaining / 60)}:
            {String(remaining % 60).padStart(2, "0")}
          </span>
          <Button variant="outline" onClick={() => setConfirm(true)}>
            Finish mock
          </Button>
        </div>
        <div className="exercise-surface">
          <QuestionView
            key={current.id}
            question={current}
            selected={exam.answers[current.id]}
            onSelect={(answer) => {
              if (Date.now() < exam.deadline)
                update((p) => ({
                  ...p,
                  exam: p.exam
                    ? {
                        ...p.exam,
                        answers: { ...p.exam.answers, [current.id]: answer },
                      }
                    : null,
                }))
            }}
          />
          {current.audio && (
            <div className="stack space-above">
              <p className="small muted">
                No Mandarin voice available? Reveal the transcript. This item
                will count as reading, not listening, in your results.
              </p>
              <Button
                variant="outline"
                disabled={expired}
                onClick={() => {
                  if (Date.now() >= exam.deadline) return
                  update((p) => ({
                    ...p,
                    exam: p.exam
                      ? {
                          ...p.exam,
                          questions: p.exam.questions.map((q) =>
                            q.id === current.id
                              ? {
                                  ...q,
                                  skill: "reading",
                                  text: q.audio,
                                  audio: undefined,
                                }
                              : q
                          ),
                        }
                      : null,
                  }))
                }}
              >
                Use reading fallback
              </Button>
            </div>
          )}
          <div className="exercise-footer">
            <Button
              variant="outline"
              disabled={exam.position === 0 || expired}
              onClick={() =>
                update((p) => ({
                  ...p,
                  exam: p.exam
                    ? { ...p.exam, position: p.exam.position - 1 }
                    : null,
                }))
              }
            >
              <ArrowLeft size={18} aria-hidden="true" />
              Previous
            </Button>
            <span className="small muted">
              {Object.keys(exam.answers).length} answered
            </span>
            <Button
              disabled={expired}
              onClick={() =>
                exam.position + 1 === exam.questions.length
                  ? setConfirm(true)
                  : update((p) => ({
                      ...p,
                      exam: p.exam
                        ? { ...p.exam, position: p.exam.position + 1 }
                        : null,
                    }))
              }
            >
              {exam.position + 1 === exam.questions.length
                ? "Review and finish"
                : "Next question"}
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
        <details className="space-above">
          <summary className="text-link">Jump to a question</summary>
          <div className="question-map">
            {exam.questions.map((q, i) => (
              <Button
                variant={exam.position === i ? "default" : "outline"}
                key={q.id}
                disabled={expired}
                aria-label={`Question ${i + 1}${exam.answers[q.id] !== undefined ? ", answered" : ", unanswered"}`}
                onClick={() =>
                  update((p) => ({
                    ...p,
                    exam: p.exam ? { ...p.exam, position: i } : null,
                  }))
                }
              >
                {i + 1}
                {exam.answers[q.id] !== undefined && (
                  <span className="sr-only"> answered</span>
                )}
              </Button>
            ))}
          </div>
        </details>
        <p className="small muted space-above">
          Your answers and original deadline are saved on this device. Leaving
          the page does not pause the timer.
        </p>
        <Dialog open={confirm} onOpenChange={setConfirm}>
          <DialogContent>
            <DialogTitle>Finish this skill mock?</DialogTitle>
            <DialogDescription>
              {exam.questions.length - Object.keys(exam.answers).length}{" "}
              questions are unanswered. They count as incorrect. You can go back
              before time expires.
            </DialogDescription>
            <div className="dialog-actions">
              <Button onClick={finish}>Finish and see feedback</Button>
              <Button variant="outline" onClick={() => setConfirm(false)}>
                Keep answering
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }
  return (
    <>
      <div className="page-intro">
        <div>
          <h1>See what really stayed.</h1>
          <p>Test your Chinese, then put the gaps back into practice.</p>
        </div>
        <LevelPicker
          value={level}
          onChange={(value) => setLevel(asLevel(value))}
        />
      </div>
      {error && (
        <div className="status-banner" role="alert">
          {error}
        </div>
      )}
      <section className="exam-summary">
        <div className="exercise-surface stack">
          <h2>
            {level <= 6 ? `HSK ${level}` : `Advanced stage ${level}`} skill mock
          </h2>
          <p>
            {spec.questions} original questions across listening, vocabulary,
            grammar and connected reading.
          </p>
          <p className="row">
            <Clock3 size={20} aria-hidden="true" />
            {spec.minutes} minutes, including answer review
          </p>
          <p className="small muted">
            Ting’s practice target is {spec.target}%. It is not an official HSK
            passing score or a prediction.
          </p>
          <Button onClick={start} disabled={busy || !ready}>
            {busy ? "Preparing your mock…" : "Start timed mock"}
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
          <p className="small muted">
            Listening uses your device’s Mandarin voice. Install one before
            starting, or use the explicit reading fallback on audio items.
            Fallback items count as reading in your skill breakdown.
          </p>
        </div>
        <div className="stack">
          <h2>Before your official exam</h2>
          <p>
            Writing is deliberately excluded from Ting. HSK exams can require
            writing, speaking and advanced translation; this mock cannot certify
            those skills.
          </p>
          <p className="small muted">
            {level >= 7
              ? "Stages 7–9 are study checkpoints within the combined advanced exam, not standalone official tests."
              : "Confirm the test version and format with your test center during the HSK 3.0 transition."}
          </p>
          <a
            className="text-link"
            href="https://www.chinesetest.cn/HSK"
            target="_blank"
            rel="noreferrer"
          >
            Open official HSK samples
          </a>
          <p className="small muted">
            {completedCount(progress, level)} / {lessonCount(level)} sessions
            completed. {mastered} / {levels[level - 1].count.toLocaleString()}{" "}
            level words retained in spaced review.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <h2>Your mock history</h2>
          <ClipboardCheck size={20} aria-hidden="true" />
        </div>
        {attempts.length ? (
          <div className="level-ledger">
            {attempts.map((attempt) => (
              <div className="retention-strip" key={attempt.id}>
                <div>
                  <h3>{attempt.percent}% recall</h3>
                  <p className="small muted">
                    {new Date(attempt.timestamp).toLocaleDateString()} /{" "}
                    {attempt.correct} of {attempt.total} correct
                  </p>
                </div>
                <Button variant="outline" onClick={() => setResult(attempt)}>
                  Read feedback
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">
            No attempts at this level yet. Your first mock becomes your
            baseline, not a verdict on your ability.
          </p>
        )}
      </section>
      <section className="settings-group section">
        <h2>Not sure where to begin?</h2>
        <p className="muted">
          Try an 18-question vocabulary and grammar sample, or choose your level
          directly.
        </p>
        <Button variant="outline" onClick={startDiagnostic} disabled={busy}>
          Try the short diagnostic
        </Button>
        {params.get("diagnostic") && (
          <p className="small muted">
            The diagnostic is advisory. Begin whenever you are ready.
          </p>
        )}
      </section>
    </>
  )
}

function ExamResults({
  attempt,
  back,
}: {
  attempt: ExamAttempt
  back: () => void
}) {
  const plan = repairPlan(attempt)
  const [page, setPage] = useState(0)
  const pages = Math.ceil(attempt.mistakes.length / 5)
  const missedHeading = useRef<HTMLHeadingElement>(null)
  function changePage(next: number) {
    setPage(next)
    missedHeading.current?.focus()
  }
  return (
    <>
      <div className="page-intro">
        <div>
          <h1>Your next steps, in focus.</h1>
          <p>
            {attempt.level <= 6
              ? `HSK ${attempt.level}`
              : `Stage ${attempt.level}`}{" "}
            original skill mock /{" "}
            {new Date(attempt.timestamp).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="exam-summary">
        <section className="exercise-surface stack">
          <div className="score-line">
            <span className="score-number">{attempt.percent}%</span>
            <span className="muted">
              {attempt.correct} / {attempt.total} correct
            </span>
          </div>
          <p>
            {attempt.percent >= 80
              ? "You reached Ting’s practice target. Keep building spaced retention and complete official samples before your exam."
              : "There are useful gaps to work on. Repair them, then try another mock."}
          </p>
          <div>
            {Object.entries(attempt.skills).map(([skill, stat]) => (
              <div className="skill-row" key={skill}>
                <span>{skill}</span>
                <span className="numbers">
                  {stat.correct} / {stat.total}
                </span>
              </div>
            ))}
          </div>
          <p className="small muted">
            This is not a normalized HSK score. Writing, translation and
            validated speaking are not assessed.
          </p>
          <Button variant="outline" onClick={back}>
            Back to mock exams
          </Button>
        </section>
        <section className="stack">
          <h2>A repair plan for your Chinese</h2>
          {plan.length ? (
            plan.map((item) => (
              <div className="settings-group" key={item.skill}>
                <h3 className="capitalize">{item.skill}</h3>
                <p>{item.advice}</p>
              </div>
            ))
          ) : (
            <p>
              No section fell below the practice target. Use official timed
              samples to check the skills Ting omits.
            </p>
          )}
          <Button render={<Link href="/review" />}>Review missed words</Button>
          <Button variant="outline" render={<Link href="/practice" />}>
            Practice connected Chinese
          </Button>
        </section>
      </div>
      <section className="section">
        <div className="section-head">
          <h2 ref={missedHeading} tabIndex={-1}>
            Learn from the missed questions
          </h2>
          <span className="small muted">
            {attempt.mistakes.length} to revisit
          </span>
        </div>
        {attempt.mistakes
          .slice(page * 5, page * 5 + 5)
          .map(({ question, selected }, i) => (
            <div className="settings-group" key={`${question.id}-${i}`}>
              <h3>{question.prompt}</h3>
              {question.text && (
                <p className="zh" lang="zh-Hans">
                  {question.text}
                </p>
              )}
              {question.audio && (
                <p className="zh" lang="zh-Hans">
                  {question.audio}
                </p>
              )}
              <p className="small muted">
                Your answer:{" "}
                {selected === null ? "Unanswered" : question.options[selected]}
              </p>
              <p>
                <strong>Correct:</strong> {question.options[question.answer]}
              </p>
              <p>{question.explanation}</p>
            </div>
          ))}
        {pages > 1 && (
          <div className="exercise-footer">
            <Button
              variant="outline"
              disabled={page === 0}
              onClick={() => changePage(page - 1)}
            >
              Previous mistakes
            </Button>
            <p className="small muted" role="status">
              Page {page + 1} of {pages}
            </p>
            <Button
              variant="outline"
              disabled={page + 1 === pages}
              onClick={() => changePage(page + 1)}
            >
              Next mistakes
            </Button>
          </div>
        )}
      </section>
    </>
  )
}
