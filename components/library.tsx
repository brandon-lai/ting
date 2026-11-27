"use client"
import { useState } from "react"
import { BookOpen, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useLearning } from "./learning-provider"
import { useWords } from "./use-words"
import { LevelPicker } from "./course"
import { LoadState, SpeakButton } from "./common"
import { useStudyLevel } from "./use-study-level"
import { isMastered, queueForReview } from "@/lib/progress"
import type { Word } from "@/lib/types"

const normalize = (text: string) =>
  text.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "")

export function Library() {
  const { progress, update } = useLearning()
  const [level, setLevel] = useStudyLevel()
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(0)
  const [detail, setDetail] = useState<Word | null>(null)
  const { words, loading, error, retry } = useWords(level)
  const filtered = query
    ? words.filter((w) =>
        normalize(`${w.hanzi} ${w.pinyin} ${w.en}`).includes(normalize(query))
      )
    : words
  const pages = Math.ceil(filtered.length / 40)
  return (
    <>
      <div className="page-intro">
        <div>
          <h1>Find your next word.</h1>
          <p>
            Every syllabus word, with pronunciation and a sentence to remember.
          </p>
        </div>
        <LevelPicker
          value={level}
          onChange={(v) => {
            setLevel(v)
            setPage(0)
            setQuery("")
          }}
        />
      </div>
      <div className="search-line">
        <div className="search-box">
          <label className="sr-only" htmlFor="word-search">
            Search by Chinese, pinyin or meaning
          </label>
          <Input
            id="word-search"
            type="search"
            name="words"
            autoComplete="off"
            placeholder="Chinese, pinyin or meaning"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(0)
            }}
          />
        </div>
        <p className="small muted" role="status">
          {filtered.length.toLocaleString()} words
        </p>
      </div>
      <LoadState loading={loading} error={error} retry={retry} />
      {!loading && !error && filtered.length === 0 && (
        <div className="empty-state">
          <BookOpen size={24} aria-hidden="true" />
          <h2>No words matched that search</h2>
          <p className="muted">
            Try another spelling or select a different study level.
          </p>
          <Button variant="outline" onClick={() => setQuery("")}>
            Clear search
          </Button>
        </div>
      )}
      <div className="word-list">
        {filtered.slice(page * 40, page * 40 + 40).map((word) => (
          <div className="word-row" key={word.id}>
            <div>
              <p className="zh" lang="zh-Hans">
                {word.hanzi}
              </p>
              {progress.pinyin && <p className="pinyin">{word.pinyin}</p>}
            </div>
            <p className="definition">{word.en}</p>
            <Button
              variant="ghost"
              onClick={() => setDetail(word)}
              aria-label={`Study ${word.hanzi}`}
            >
              {isMastered(progress.cards[word.id]) ? "Retained" : "Study"}
            </Button>
          </div>
        ))}
      </div>
      {pages > 1 && (
        <div className="row between wrap space-above">
          <Button
            variant="outline"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Previous
          </Button>
          <span className="small numbers">
            {page + 1} / {pages}
          </span>
          <Button
            variant="outline"
            disabled={page + 1 >= pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </div>
      )}
      <p className="small muted space-above">
        Word data by{" "}
        <a
          className="text-link"
          href="https://hanzidrill.com/open-data"
          target="_blank"
          rel="noreferrer"
        >
          Yujay / Hanzidrill
        </a>
        , CC BY 4.0. Reordered and normalized for Ting.{" "}
        <a href="/curriculum/LICENSE.txt">License</a>.
      </p>
      <Dialog
        open={Boolean(detail)}
        onOpenChange={(open) => {
          if (!open) setDetail(null)
        }}
      >
        <DialogContent>
          {detail && (
            <div className="word-detail stack">
              <DialogTitle>
                <span className="zh" lang="zh-Hans">
                  {detail.hanzi}
                </span>
              </DialogTitle>
              <DialogDescription>
                {progress.pinyin && `${detail.pinyin} / `}
                {detail.en}
              </DialogDescription>
              <SpeakButton text={detail.hanzi} label="Hear the word" />
              <div className="example-block">
                <p className="zh" lang="zh-Hans">
                  {detail.exampleZh}
                </p>
                {progress.pinyin && (
                  <p className="small muted">{detail.examplePinyin}</p>
                )}
                <p>{detail.exampleEn}</p>
                <SpeakButton text={detail.exampleZh} label="Hear the example" />
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  if (
                    update((p) => ({
                      ...p,
                      cards: {
                        ...p.cards,
                        [detail.id]: queueForReview(
                          p.cards[detail.id],
                          Date.now()
                        ),
                      },
                    }))
                  )
                    setDetail(null)
                }}
              >
                Add to word review
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
