"use client"

import { useEffect, useRef, useState } from "react"
import { Mic, Square, Play, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { SpeakButton } from "./common"
import { useLearning } from "./learning-provider"
import type { SpeakingTask, Video } from "@/lib/types"

interface RecognitionResult {
  isFinal: boolean
  0: { transcript: string }
}
interface RecognitionEvent {
  results: ArrayLike<RecognitionResult>
}
interface Recognition {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: RecognitionEvent) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}
type SpeechWindow = Window & {
  SpeechRecognition?: new () => Recognition
  webkitSpeechRecognition?: new () => Recognition
}
const normalize = (text: string) => text.replace(/[\p{P}\p{Z}\s]/gu, "")

export function VideoLesson({ video }: { video: Video }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <section className="video-well stack">
      <div className="row between">
        <h3>{video.title}</h3>
        <Play size={18} aria-hidden="true" />
      </div>
      <p className="small muted">
        {video.creator} / Suggested five-minute segment
      </p>
      <p>{video.task}</p>
      {loaded ? (
        <iframe
          className="video-frame"
          src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
          title={`${video.title} by ${video.creator}`}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <>
          <p className="small muted">
            Loading connects to YouTube. Video availability depends on the
            creator and your network.
          </p>
          <Button variant="outline" onClick={() => setLoaded(true)}>
            Load lesson video
            <Play size={18} aria-hidden="true" />
          </Button>
        </>
      )}
      <a
        href={`https://www.youtube.com/watch?v=${video.id}`}
        className="text-link small"
        target="_blank"
        rel="noreferrer"
      >
        Watch on YouTube
        <ExternalLink size={16} aria-hidden="true" />
      </a>
    </section>
  )
}

export function SpeakingPractice({ task }: { task: SpeakingTask }) {
  const { progress } = useLearning()
  const recorder = useRef<MediaRecorder | null>(null)
  const stream = useRef<MediaStream | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const recognition = useRef<Recognition | null>(null)
  const mounted = useRef(true)
  const recordingUrl = useRef<string | null>(null)
  const [audio, setAudio] = useState<string | null>(null)
  const [recording, setRecording] = useState(false)
  const [requesting, setRequesting] = useState(false)
  const [recognizing, setRecognizing] = useState(false)
  const [consent, setConsent] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [model, setModel] = useState(false)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      if (timer.current) clearTimeout(timer.current)
      if (recorder.current?.state === "recording") recorder.current.stop()
      stream.current?.getTracks().forEach((track) => track.stop())
      recognition.current?.abort()
      if (recordingUrl.current) URL.revokeObjectURL(recordingUrl.current)
      window.speechSynthesis?.cancel()
    }
  }, [])

  function stop() {
    if (timer.current) clearTimeout(timer.current)
    if (recorder.current?.state === "recording") recorder.current.stop()
    stream.current?.getTracks().forEach((track) => track.stop())
    setRecording(false)
  }

  async function start() {
    if (
      !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      setError(
        "Recording isn’t supported here. Say your answer aloud, listen to the model and compare its rhythm."
      )
      return
    }
    setRequesting(true)
    setError(null)
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true })
      if (!mounted.current) {
        media.getTracks().forEach((track) => track.stop())
        return
      }
      stream.current = media
      const chunks: BlobPart[] = []
      const device = new MediaRecorder(media)
      recorder.current = device
      device.ondataavailable = (event) => {
        if (event.data.size) chunks.push(event.data)
      }
      device.onerror = () => {
        setError(
          "Recording failed. Stop and retry, or practice aloud without recording."
        )
        stop()
      }
      device.onstop = () => {
        if (!mounted.current) return
        if (recordingUrl.current) URL.revokeObjectURL(recordingUrl.current)
        const url = URL.createObjectURL(
          new Blob(chunks, { type: device.mimeType || "audio/webm" })
        )
        recordingUrl.current = url
        setAudio(url)
        setRecording(false)
      }
      device.start()
      setRecording(true)
      timer.current = setTimeout(stop, Math.max(30, task.seconds) * 1000)
    } catch (e) {
      stream.current?.getTracks().forEach((track) => track.stop())
      if (mounted.current)
        setError(
          e instanceof DOMException && e.name === "NotAllowedError"
            ? "Microphone access was denied. Allow it in your browser settings, or practice aloud without recording."
            : "Your microphone could not be opened. Check the device and retry, or practice aloud."
        )
    } finally {
      if (mounted.current) setRequesting(false)
    }
  }

  function recognize() {
    const Constructor =
      (window as SpeechWindow).SpeechRecognition ??
      (window as SpeechWindow).webkitSpeechRecognition
    if (!Constructor) {
      setError(
        "Speech recognition is unavailable in this browser. Record and replay yourself instead; neither option measures tones."
      )
      setConsent(false)
      return
    }
    const engine = new Constructor()
    engine.lang = "zh-CN"
    engine.continuous = false
    engine.interimResults = false
    engine.onresult = (event) =>
      setTranscript(
        Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("")
      )
    engine.onerror = (event) =>
      setError(
        `Recognition stopped (${event.error}). Use local record and replay instead.`
      )
    engine.onend = () => setRecognizing(false)
    recognition.current = engine
    setError(null)
    setTranscript("")
    try {
      engine.start()
      setRecognizing(true)
    } catch {
      setError(
        "Recognition could not start. Check microphone access or use record and replay."
      )
    }
    setConsent(false)
  }

  return (
    <section className="stack">
      <h2>{task.title}</h2>
      <p>{task.prompt}</p>
      <p className="small muted">
        Aim for {task.seconds} seconds. Your local recording is discarded when
        you leave this activity.
      </p>
      <div className="record-controls">
        {recording ? (
          <Button onClick={stop}>
            <Square size={18} aria-hidden="true" />
            Stop recording
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={start}
            disabled={requesting || recognizing}
          >
            <Mic size={18} aria-hidden="true" />
            {requesting
              ? "Opening microphone…"
              : audio
                ? "Record again"
                : "Record your answer"}
          </Button>
        )}
        <Button variant="outline" onClick={() => setModel((m) => !m)}>
          {model ? "Hide model answer" : "Show a model answer"}
        </Button>
      </div>
      {recording && (
        <p role="status">
          Recording. It stops automatically after {Math.max(30, task.seconds)}{" "}
          seconds.
        </p>
      )}
      {audio && (
        <>
          <label htmlFor="your-recording" className="small">
            Replay your answer. Listen for rhythm, pauses and clear tone
            changes.
          </label>
          <audio
            id="your-recording"
            className="audio-player"
            controls
            src={audio}
          />
        </>
      )}
      {error && (
        <div className="feedback incorrect" role="alert">
          {error}
        </div>
      )}
      {model && (
        <div className="example-block">
          <p className="zh" lang="zh-Hans">
            {task.supportZh}
          </p>
          {progress.pinyin && (
            <p className="small muted">{task.supportPinyin}</p>
          )}
          <p>{task.supportEn}</p>
          <SpeakButton text={task.supportZh} label="Listen to the model" />
        </div>
      )}
      <div className="stack small muted">
        {task.tips.map((tip) => (
          <p key={tip}>{tip}</p>
        ))}
      </div>
      <div className="example-block">
        <h3>Optional text recognition</h3>
        <p className="small muted">
          Compare the words the browser heard with the model. This is text
          matching, not a pronunciation or tone score. Your browser’s provider
          may process the audio online.
        </p>
        {recognizing ? (
          <Button variant="outline" onClick={() => recognition.current?.stop()}>
            Stop recognizing
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => setConsent(true)}
            disabled={recording || requesting}
          >
            Try text recognition
          </Button>
        )}
        {transcript && (
          <div className="feedback" role="status">
            <p className="zh" lang="zh-Hans">
              {transcript}
            </p>
            <p>
              {normalize(transcript) === normalize(task.supportZh)
                ? "The recognized text matches the model. Tone accuracy has not been assessed."
                : "The recognized text differs from the model. Compare the words, then listen and try again."}
            </p>
          </div>
        )}
      </div>
      <Dialog open={consent} onOpenChange={setConsent}>
        <DialogContent>
          <DialogTitle>Use browser speech recognition?</DialogTitle>
          <DialogDescription>
            Your browser may send microphone audio to its speech provider. Ting
            does not receive or retain that audio. Local recording works without
            this service.
          </DialogDescription>
          <div className="dialog-actions">
            <Button onClick={recognize}>Allow recognition</Button>
            <Button variant="outline" onClick={() => setConsent(false)}>
              Keep practice local
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
