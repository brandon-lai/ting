"use client"

import Link from "next/link"
import { useState } from "react"
import { Volume2, CircleAlert, Check, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLearning } from "./learning-provider"
import type { Question } from "@/lib/types"
import { mandarinVoice } from "@/lib/speech"

export function SpeakButton({
  text,
  label = "Listen",
  compact = false,
}: {
  text: string
  label?: string
  compact?: boolean
}) {
  const { progress } = useLearning()
  const [error, setError] = useState<string | null>(null)
  function play() {
    if (!("speechSynthesis" in window)) {
      setError(
        "This browser cannot play Mandarin speech. Use the transcript and video instead."
      )
      return
    }
    const voice = mandarinVoice(speechSynthesis.getVoices())
    if (!voice) {
      setError(
        "No Mandarin voice is installed. Add a Chinese voice in your device’s speech settings, or use the transcript and video."
      )
      return
    }
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.voice = voice
    utterance.lang = voice.lang
    utterance.rate = progress.speechRate
    utterance.onerror = (event) => {
      if (event.error !== "canceled" && event.error !== "interrupted")
        setError(
          "Audio could not play. Check your device’s voice download and retry."
        )
    }
    setError(null)
    speechSynthesis.speak(utterance)
  }
  return (
    <div className="stack gap-small">
      <Button
        variant="outline"
        size={compact ? "icon" : "default"}
        aria-label={compact ? label : undefined}
        onClick={play}
      >
        <Volume2 size={18} aria-hidden="true" />
        {!compact && label}
      </Button>
      {error && (
        <p className="small muted" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export function LoadState({
  loading,
  error,
  retry,
}: {
  loading: boolean
  error: string | null
  retry: () => void
}) {
  if (error)
    return (
      <div className="empty-state">
        <CircleAlert size={28} aria-hidden="true" />
        <h2>The words couldn’t load</h2>
        <p>{error}</p>
        <Button onClick={retry}>Retry download</Button>
      </div>
    )
  return loading ? (
    <p className="loading-line" role="status">
      Loading your Chinese lesson…
    </p>
  ) : null
}

export function QuestionView({
  question,
  selected,
  onSelect,
  reveal = false,
  showTranscript = false,
}: {
  question: Question
  selected: number | undefined
  onSelect: (answer: number) => void
  reveal?: boolean
  showTranscript?: boolean
}) {
  return (
    <div className="stack">
      <h2 className="question-prompt">{question.prompt}</h2>
      {question.text && (
        <p
          lang="zh-Hans"
          className={`zh ${question.skill === "vocabulary" ? "recall-word" : "reading-text"}`}
        >
          {question.text}
        </p>
      )}
      {question.audio && (
        <>
          <SpeakButton
            key={question.id}
            text={question.audio}
            label="Play Mandarin sentence"
          />
          <p className="small muted">
            Device-generated voice. Listen before revealing the transcript.
          </p>
          {showTranscript && (
            <p lang="zh-Hans" className="zh reading-text">
              {question.audio}
            </p>
          )}
        </>
      )}
      <div className="options" role="group" aria-label="Answer choices">
        {question.options.map((option, index) => (
          <button
            type="button"
            key={index}
            className={`option ${reveal && index === question.answer ? "correct" : reveal && selected === index ? "incorrect" : ""}`}
            aria-pressed={selected === index}
            onClick={() => onSelect(index)}
            disabled={reveal}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="grow">{option}</span>
            {reveal && index === question.answer && (
              <Check size={20} aria-hidden="true" />
            )}
            {reveal && selected === index && selected !== question.answer && (
              <X size={20} aria-hidden="true" />
            )}
          </button>
        ))}
      </div>
      {reveal && (
        <div
          className={`feedback ${selected === question.answer ? "correct" : "incorrect"}`}
          role="status"
        >
          <strong>
            {selected === question.answer
              ? "That’s right."
              : "Keep this one in your review."}
          </strong>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  )
}

export function Empty({
  title,
  detail,
  href,
  action,
}: {
  title: string
  detail: string
  href?: string
  action?: string
}) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p className="muted">{detail}</p>
      {href && (
        <Button render={<Link href={href} />}>
          {action}
          <ArrowRight size={18} aria-hidden="true" />
        </Button>
      )}
    </div>
  )
}
