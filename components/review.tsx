"use client"
import { useEffect, useMemo, useState } from "react"
import { RotateCcw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLearning } from "./learning-provider"
import { dueIds, schedule, activityDay } from "@/lib/progress"
import { loadWords } from "@/lib/data"
import { levels } from "@/lib/curriculum"
import { SpeakButton, LoadState, Empty } from "./common"
import type { Level, Rating, Word } from "@/lib/types"

function wordLevel(id: string): Level {
  const number = Number(id.slice(5))
  return levels.find((l) => number <= l.cumulative)?.level ?? 9
}

export function Review() {
  const { progress, ready, update } = useLearning()
  const [words, setWords] = useState<Word[]>([])
  const [error, setError] = useState<string | null>(null)
  const [retry, setRetry] = useState(0)
  const [reveal, setReveal] = useState(false)
  const [done, setDone] = useState(0)
  const [now] = useState(() => Date.now())
  const due = useMemo(() => dueIds(progress, now), [progress, now])
  const levelKey = [...new Set(due.map(wordLevel))].sort().join(",")
  useEffect(() => {
    if (!ready) return
    let active = true
    const selected = levelKey
      ? levelKey.split(",").map((n) => Number(n) as Level)
      : []
    Promise.all(selected.map(loadWords))
      .then((parts) => {
        if (active) {
          setWords(parts.flat())
          setError(null)
        }
      })
      .catch((e: unknown) => {
        if (active)
          setError(
            e instanceof Error ? e.message : "Review words could not load."
          )
      })
    return () => {
      active = false
    }
  }, [levelKey, ready, retry])
  const word = words.find((w) => w.id === due[0])
  function rate(rating: Rating, time: number) {
    if (!word) return
    if (
      update((p) => ({
        ...p,
        cards: {
          ...p.cards,
          [word.id]: schedule(p.cards[word.id], rating, time),
        },
        activity: {
          ...p.activity,
          [activityDay(time)]: (p.activity[activityDay(time)] ?? 0) + 1,
        },
      }))
    ) {
      setDone((n) => n + 1)
      setReveal(false)
    }
  }
  return (
    <>
      <div className="page-intro">
        <div>
          <h1>Recall it. Keep it.</h1>
          <p>
            Try the meaning before you turn the word over. Honest recall is the
            work.
          </p>
        </div>
        <span className="pill">{due.length} due</span>
      </div>
      {error && (
        <LoadState
          loading={false}
          error={error}
          retry={() => setRetry((n) => n + 1)}
        />
      )}
      {!error && !due.length && (
        <Empty
          title={
            done ? "You’ve finished this review" : "No words due right now"
          }
          detail={
            done
              ? `${done} words reviewed. Forgotten words return in ten minutes; the others have been spaced out.`
              : Object.keys(progress.cards).length
                ? "Your words are scheduled for later. Continue your course or add a word from the library."
                : "Complete your first lesson checkpoint, or add a word from the library. It will appear here when it is time to recall it."
          }
          href={done ? "/" : "/learn"}
          action={done ? "Back to today" : "Open your course"}
        />
      )}
      {!error && due.length > 0 && !word && (
        <p role="status" className="loading-line">
          Loading the words you need to remember…
        </p>
      )}
      {!error && word && (
        <div className="exercise-surface">
          <div className="row between">
            <span className="small muted">{done} reviewed this session</span>
            <RotateCcw size={20} aria-hidden="true" />
          </div>
          <p className="zh large-word" lang="zh-Hans">
            {word.hanzi}
          </p>
          {progress.pinyin && <p className="word-pinyin">{word.pinyin}</p>}
          <div className="row between wrap">
            <p className="muted">What does it mean? Say it out loud.</p>
            <SpeakButton text={word.hanzi} label="Hear the word" />
          </div>
          {!reveal ? (
            <div className="exercise-footer">
              <p className="small muted">Don’t worry about being wrong.</p>
              <Button onClick={() => setReveal(true)}>Reveal meaning</Button>
            </div>
          ) : (
            <>
              <div className="example-block">
                <h2>{word.en}</h2>
                <p className="zh" lang="zh-Hans">
                  {word.exampleZh}
                </p>
                <p>{word.exampleEn}</p>
                <SpeakButton text={word.exampleZh} label="Hear the example" />
              </div>
              <div className="rating-grid">
                {(["again", "hard", "good", "easy"] as Rating[]).map(
                  (rating) => {
                    const next = schedule(progress.cards[word.id], rating, now)
                    return (
                      <Button
                        key={rating}
                        variant={rating === "good" ? "default" : "outline"}
                        onClick={() => rate(rating, Date.now())}
                      >
                        <span>
                          {rating === "good" && (
                            <Check
                              size={16}
                              className="inline"
                              aria-hidden="true"
                            />
                          )}{" "}
                          {rating[0].toUpperCase() + rating.slice(1)}
                        </span>
                        <span className="small">
                          {rating === "again"
                            ? "10 minutes"
                            : next.interval < 1
                              ? "12 hours"
                              : `${next.interval} days`}
                        </span>
                      </Button>
                    )
                  }
                )}
              </div>
              <p className="small muted space-above" role="status">
                Again: forgot it. Hard: needed help. Good: recalled it. Easy:
                immediate and confident.
              </p>
            </>
          )}
        </div>
      )}
    </>
  )
}
