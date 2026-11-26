"use client"
import Link from "next/link"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLearning } from "./learning-provider"
import { useWords } from "./use-words"
import { LoadState } from "./common"
import {
  levels,
  asLevel,
  lessonCount,
  lessonKey,
  lessonTitle,
  completedCount,
} from "@/lib/curriculum"

export function LevelPicker({
  value,
  onChange,
  label = "Study level",
}: {
  value: number
  onChange: (value: string) => void
  label?: string
}) {
  return (
    <Select
      value={String(value)}
      onValueChange={(v) => {
        if (v) onChange(v)
      }}
      items={levels.map((l) => ({
        value: String(l.level),
        label: l.level <= 6 ? `HSK ${l.level}` : `Advanced stage ${l.level}`,
      }))}
    >
      <SelectTrigger className="level-select" aria-label={label}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {levels.map((l) => (
          <SelectItem key={l.level} value={String(l.level)}>
            {l.level <= 6 ? `HSK ${l.level}` : `Advanced stage ${l.level}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function Course() {
  const { progress, update } = useLearning()
  const params = useSearchParams()
  const [chosen, setChosen] = useState(
    asLevel(params.get("level") ?? progress.level)
  )
  const [page, setPage] = useState(0)
  const current = levels[chosen - 1]
  const { words, loading, error, retry } = useWords(chosen)
  const count = lessonCount(chosen)
  const completed = completedCount(progress, chosen)
  const pageCount = Math.ceil(count / 24)
  function choose(value: string) {
    setChosen(asLevel(value))
    setPage(0)
  }
  return (
    <>
      <div className="page-intro">
        <div>
          <h1>Your Chinese, from the beginning.</h1>
          <p>
            A complete word-by-word course, with listening, grammar and spoken
            practice at every stage.
          </p>
        </div>
        <LevelPicker value={chosen} onChange={choose} />
      </div>
      <section className="course-summary">
        <h2>{current.name}</h2>
        <span className="pill">
          {current.count.toLocaleString()} new syllabus words
        </span>
        <span className="small muted">{count} sessions</span>
        {chosen !== progress.level && (
          <Button
            variant="outline"
            onClick={() =>
              update((p) => ({ ...p, level: chosen, onboarded: true }))
            }
          >
            Make this my study level
          </Button>
        )}
      </section>
      {chosen >= 7 && (
        <div className="status-banner neutral">
          <p>
            Advanced stages 7 to 9 share the official HSK 7 to 9 vocabulary
            pool. Ting’s word split is for study pacing, not an official
            exam-level classification.
          </p>
        </div>
      )}
      <div className="row between small muted">
        <span>
          {completed} / {count} sessions completed
        </span>
        <Link href="/settings" className="text-link">
          <Download size={16} aria-hidden="true" />
          Save words offline
        </Link>
      </div>
      <Progress
        value={(completed / count) * 100}
        aria-label="Course session completion"
      />
      <div className="lesson-grid">
        <LoadState loading={loading} error={error} retry={retry} />
        {Array.from({ length: Math.min(24, count - page * 24) }, (_, i) => {
          const index = page * 24 + i
          const done = progress.lessons[lessonKey(chosen, index)]
          return (
            <Link
              key={index}
              href={`/study?level=${chosen}&lesson=${index}`}
              className="lesson-row"
            >
              <span className="lesson-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="grow">
                <h3>{lessonTitle(chosen, index)}</h3>
                {words.length > 0 && (
                  <p className="small" lang="zh-Hans">
                    {words
                      .slice(index * 8, index * 8 + 3)
                      .map((w) => w.hanzi)
                      .join(" · ")}
                  </p>
                )}
                <p className="small muted">
                  {index === count - 1 ? current.count - index * 8 : 8} words /
                  30-minute plan{done ? ` / ${done.score}% checkpoint` : ""}
                </p>
              </div>
              {done ? (
                <Check
                  size={18}
                  className="offline-check"
                  aria-label="Completed"
                />
              ) : (
                <ArrowRight size={18} aria-hidden="true" />
              )}
            </Link>
          )
        })}
      </div>
      <div className="row between wrap space-above">
        <Button
          variant="outline"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          <ChevronLeft size={18} aria-hidden="true" />
          Previous
        </Button>
        <span className="small numbers">
          Page {page + 1} of {pageCount}
        </span>
        <Button
          variant="outline"
          disabled={page + 1 === pageCount}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
          <ChevronRight size={18} aria-hidden="true" />
        </Button>
      </div>
      <section className="retention-strip">
        <div>
          <h3>Put this level to the test</h3>
          <p className="small muted">
            An original skill mock, honest feedback and your next review plan.
          </p>
        </div>
        <Button
          variant="outline"
          render={<Link href={`/exams?level=${chosen}`} />}
        >
          Open level mock
        </Button>
      </section>
      <section className="section">
        <div className="section-head">
          <h2>The whole HSK path</h2>
          <span className="small muted">11,000 words</span>
        </div>
        <div className="level-ledger">
          {levels.map((l) => (
            <div
              className={`level-row ${l.level === chosen ? "current" : ""}`}
              key={l.level}
            >
              <span className="level-number">{l.level}</span>
              <div>
                <h3>{l.name}</h3>
                <p className="small muted">
                  {l.cumulative.toLocaleString()} cumulative words
                  {l.level >= 7 ? " / Ting advanced pacing" : ""}
                </p>
              </div>
              <p className="ledger-count level-progress">
                {completedCount(progress, l.level)} / {lessonCount(l.level)}{" "}
                sessions
              </p>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Select study stage ${l.level}`}
                onClick={() => {
                  choose(String(l.level))
                  window.scrollTo({ top: 0 })
                }}
              >
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
