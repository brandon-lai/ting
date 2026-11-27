"use client"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useLearning } from "./learning-provider"
import { LevelPicker } from "./course"
import { SpeakingPractice, VideoLesson } from "./media-practice"
import { SpeakButton, QuestionView } from "./common"
import { useStudyLevel } from "./use-study-level"
import { grammar, readings, speaking } from "@/lib/content"
import { videos } from "@/lib/videos"
import type { ReadingPassage } from "@/lib/types"

export function Practice() {
  const { progress } = useLearning()
  const [level, setLevel] = useStudyLevel()
  const [index, setIndex] = useState(0)
  const tasks = speaking.filter((task) => task.level === level)
  const passages = readings.filter((passage) => passage.level === level)
  const points = grammar.filter((point) => point.level === level)
  return (
    <>
      <div className="page-intro">
        <div>
          <h1>Hear it. Say something back.</h1>
          <p>Practice connected Chinese, with a transcript when you need it.</p>
        </div>
        <LevelPicker
          value={level}
          onChange={(value) => {
            setLevel(value)
            setIndex(0)
          }}
        />
      </div>
      <Tabs defaultValue="listening">
        <TabsList variant="line" className="practice-tabs">
          <TabsTrigger value="listening">Listen & read</TabsTrigger>
          <TabsTrigger value="speaking">Speak</TabsTrigger>
          <TabsTrigger value="grammar">Grammar</TabsTrigger>
        </TabsList>
        <TabsContent value="listening">
          <div className="exercise-surface space-above">
            <div className="row wrap between">
              <h2>{passages[index % passages.length].title}</h2>
              <Button variant="outline" onClick={() => setIndex((n) => n + 1)}>
                Another passage
              </Button>
            </div>
            <ReadingActivity
              key={passages[index % passages.length].id}
              passage={passages[index % passages.length]}
            />
          </div>
          <VideoLesson
            key={level}
            video={videos.find((v) => v.levels.includes(level))!}
          />
        </TabsContent>
        <TabsContent value="speaking">
          <div className="row between wrap space-above">
            <p className="muted">Structured speaking, not a tone score.</p>
            <Button variant="outline" onClick={() => setIndex((n) => n + 1)}>
              Another speaking task
            </Button>
          </div>
          <div className="exercise-surface space-above">
            <SpeakingPractice
              key={tasks[index % tasks.length].id}
              task={tasks[index % tasks.length]}
            />
          </div>
        </TabsContent>
        <TabsContent value="grammar">
          <div className="stack section">
            {points.map((point) => (
              <section className="settings-group" key={point.id}>
                <h2>{point.title}</h2>
                <p>{point.explanation}</p>
                <h3>{point.pattern}</h3>
                <p className="zh" lang="zh-Hans">
                  {point.exampleZh}
                </p>
                {progress.pinyin && (
                  <p className="small muted">{point.examplePinyin}</p>
                )}
                <p>{point.exampleEn}</p>
                <SpeakButton
                  text={point.exampleZh}
                  label={`Hear ${point.title}`}
                />
              </section>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}

function ReadingActivity({ passage }: { passage: ReadingPassage }) {
  const [transcript, setTranscript] = useState(false)
  const [translation, setTranslation] = useState(false)
  const [question, setQuestion] = useState(0)
  const [selected, setSelected] = useState<number | undefined>()
  const [checked, setChecked] = useState(false)
  const current = passage.questions[question]
  return (
    <div className="stack space-above">
      <SpeakButton text={passage.text} label="Listen to the passage" />
      <p className="small muted">
        Use a device Mandarin voice. If audio is unavailable, practice reading
        with the transcript.
      </p>
      <Button
        variant="outline"
        onClick={() => setTranscript((value) => !value)}
      >
        {transcript ? "Hide Chinese transcript" : "Show Chinese transcript"}
      </Button>
      {transcript && (
        <p className="zh reading-text" lang="zh-Hans">
          {passage.text}
        </p>
      )}
      <QuestionView
        question={{
          ...current,
          id: `${passage.id}-${question}`,
          skill: "reading",
        }}
        selected={selected}
        onSelect={setSelected}
        reveal={checked}
      />
      <div className="exercise-footer">
        <span className="small muted">
          Question {question + 1} / {passage.questions.length}
        </span>
        {!checked ? (
          <Button
            disabled={selected === undefined}
            onClick={() => setChecked(true)}
          >
            Check comprehension
          </Button>
        ) : (
          <Button
            onClick={() => {
              setQuestion((n) => (n + 1) % passage.questions.length)
              setSelected(undefined)
              setChecked(false)
            }}
          >
            Next question
          </Button>
        )}
      </div>
      <Button variant="ghost" onClick={() => setTranslation((v) => !v)}>
        {translation ? "Hide English translation" : "Show English translation"}
      </Button>
      {translation && <p className="muted">{passage.translation}</p>}
    </div>
  )
}
