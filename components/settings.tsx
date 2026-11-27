"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Download,
  Upload,
  Check,
  CloudOff,
  Smartphone,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useLearning } from "./learning-provider"
import { LevelPicker } from "./course"
import { hasGoogle } from "@/lib/cloud"
import { levels, asLevel } from "@/lib/curriculum"
import { freshProgress, progressSchema } from "@/lib/progress"
import { cacheAppShell, WORD_CACHE } from "@/lib/offline"
import { parseWordPack } from "@/lib/data"
import type { Level } from "@/lib/types"
import { version } from "@/package.json"

type Confirmation =
  "reset" | "import" | "load" | "guest" | "delete" | "logout" | null

export function Settings() {
  const {
    progress,
    update,
    user,
    cloudMessage,
    cloudBusy,
    login,
    logout,
    saveCloud,
    loadCloud,
    importGuest,
    deleteCloud,
    replace,
    exportFile,
    readOnly,
  } = useLearning()
  const { theme, setTheme } = useTheme()
  const params = useSearchParams()
  const [message, setMessage] = useState<string | null>(null)
  const [confirmation, setConfirmation] = useState<Confirmation>(null)
  const [imported, setImported] = useState<ReturnType<
    typeof freshProgress
  > | null>(null)
  const [downloads, setDownloads] = useState<number[]>([])
  const [downloadBusy, setDownloadBusy] = useState<number | null>(null)
  const file = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (!("caches" in window)) return
    caches
      .open(WORD_CACHE)
      .then((cache) => cache.keys())
      .then((keys) =>
        setDownloads(
          keys
            .map((k) =>
              Number(new URL(k.url).pathname.match(/level-(\d)/)?.[1])
            )
            .filter(Boolean)
        )
      )
      .catch(() =>
        setMessage(
          "Saved offline downloads could not be read. Check whether private browsing blocks site storage."
        )
      )
    const failed = () =>
      setMessage(
        "Offline mode could not initialize. Refresh online and allow site storage before downloading."
      )
    window.addEventListener("ting:offline-error", failed)
    return () => window.removeEventListener("ting:offline-error", failed)
  }, [])

  function exportProgress() {
    let exported: string
    try {
      exported = exportFile()
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "The stored file could not be read. No backup was created."
      )
      return
    }
    const url = URL.createObjectURL(
      new Blob([exported], { type: "application/json" })
    )
    const link = document.createElement("a")
    link.href = url
    link.download = `ting-progress-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  async function importFile(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0]
    if (!selected) return
    try {
      if (selected.size > 16 * 1024 * 1024)
        throw new Error("Local progress files must be 16 MB or smaller.")
      const parsed = progressSchema.safeParse(JSON.parse(await selected.text()))
      if (!parsed.success)
        throw new Error(
          "This file is not valid Ting progress. Nothing was imported."
        )
      setImported(parsed.data)
      setConfirmation("import")
      setMessage(null)
    } catch (e) {
      setMessage(
        e instanceof Error
          ? e.message
          : "The file could not be read. Nothing was imported."
      )
    }
    event.target.value = ""
  }

  async function download(level: Level) {
    setDownloadBusy(level)
    setMessage(null)
    try {
      if (!("caches" in window))
        throw new Error("This browser does not support offline downloads.")
      if (process.env.NODE_ENV !== "production")
        throw new Error(
          "Offline downloads are available in the production build, not the development server."
        )
      const response = await fetch(`/curriculum/level-${level}.json`, {
        cache: "reload",
      })
      if (!response.ok)
        throw new Error("The level could not download. Reconnect and retry.")
      parseWordPack(level, await response.clone().json())
      await cacheAppShell()
      const cache = await caches.open(WORD_CACHE)
      await cache.put(`/curriculum/level-${level}.json`, response)
      setDownloads((current) => [...new Set([...current, level])])
      setMessage(
        `Stage ${level} words and app screens are saved offline. Videos, recognition and cloud sync still need the internet.`
      )
    } catch (e) {
      setMessage(
        e instanceof Error
          ? e.message
          : "The download failed. Try again online."
      )
    } finally {
      setDownloadBusy(null)
    }
  }

  async function removeDownload(level: number) {
    try {
      const cache = await caches.open(WORD_CACHE)
      await cache.delete(`/curriculum/level-${level}.json`)
      setDownloads((current) => current.filter((l) => l !== level))
      setMessage(
        `Stage ${level} offline word download removed. Your study progress is unchanged.`
      )
    } catch {
      setMessage(
        "The offline download could not be removed. Try again with site storage enabled."
      )
    }
  }

  async function confirm() {
    if (confirmation === "reset") {
      if (!replace(freshProgress())) {
        setConfirmation(null)
        return
      }
      setMessage(
        "Study progress cleared on this device. Cloud progress, if any, was not deleted."
      )
    } else if (confirmation === "import" && imported) {
      if (!replace(imported)) {
        setConfirmation(null)
        return
      }
      setMessage(
        "Progress imported on this device. No cloud copy has been overwritten."
      )
    } else if (confirmation === "load") await loadCloud()
    else if (confirmation === "guest") importGuest()
    else if (confirmation === "delete") await deleteCloud()
    else if (confirmation === "logout") await logout()
    setConfirmation(null)
  }

  const descriptions = {
    logout:
      "Signing out removes this account’s study progress from this browser. Save to cloud or export any unsynced work first. Guest progress is kept separately.",
    reset:
      "This removes the current local lessons, reviews and mock history. Export first if you want a backup. It does not remove a cloud copy.",
    import:
      "The imported file will replace this device’s current study progress. Export first if you want to keep both.",
    load: "Cloud progress will replace the account copy on this device. Export any unsynced local work before continuing.",
    guest:
      "This replaces the account copy on this device with guest progress. Nothing is uploaded until you save to cloud.",
    delete:
      "This deletes your account’s cloud study progress and this device’s account copy. Your Google identity and unrelated projects are not affected.",
  }
  return (
    <>
      <div className="page-intro">
        <div>
          <h1>Make Ting work for you.</h1>
          <p>A comfortable pace, your own progress and Chinese on the go.</p>
        </div>
      </div>
      {message && (
        <div className="status-banner neutral" role="status">
          {message}
        </div>
      )}
      {params.get("auth") === "failed" && (
        <div className="status-banner" role="alert">
          Google sign-in could not finish. Retry with a fresh sign-in; local
          progress is unchanged.
        </div>
      )}
      {params.get("auth") === "unavailable" && (
        <div className="status-banner" role="alert">
          Google sign-in is unavailable or the callback is incomplete. No
          account was created.
        </div>
      )}
      <h2>Study preferences</h2>
      <section className="settings-group">
        <div className="settings-row">
          <div>
            <h3>Your study level</h3>
            <p>
              All levels stay open. This chooses your next recommended session.
            </p>
          </div>
          <LevelPicker
            value={progress.level}
            onChange={(value) =>
              update((p) => ({ ...p, level: asLevel(value), onboarded: true }))
            }
          />
        </div>
        <div className="settings-row">
          <div>
            <label htmlFor="pinyin-setting">
              <h3>Show pinyin hints</h3>
            </label>
            <p>
              Keep hints while learning. Turn them off to strengthen character
              recognition.
            </p>
          </div>
          <Switch
            id="pinyin-setting"
            checked={progress.pinyin}
            onCheckedChange={(checked) =>
              update((p) => ({ ...p, pinyin: checked }))
            }
          />
        </div>
        <div className="settings-row">
          <div>
            <h3>Mandarin playback speed</h3>
            <p>
              Device speech only. Choose a comfortable pace, then work toward
              natural speed.
            </p>
          </div>
          <Select
            value={String(progress.speechRate)}
            onValueChange={(value) => {
              if (value) update((p) => ({ ...p, speechRate: Number(value) }))
            }}
            items={[
              { value: "0.65", label: "Slow" },
              { value: "0.8", label: "Steady" },
              { value: "1", label: "Natural" },
            ]}
          >
            <SelectTrigger aria-label="Mandarin playback speed">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.65">Slow</SelectItem>
              <SelectItem value="0.8">Steady</SelectItem>
              <SelectItem value="1">Natural</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="settings-row">
          <div>
            <h3>Appearance</h3>
            <p>Follow your device, or choose a comfortable reading surface.</p>
          </div>
          <Select
            value={theme ?? "system"}
            onValueChange={(value) => {
              if (value) setTheme(value)
            }}
            items={[
              { value: "system", label: "Device" },
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          >
            <SelectTrigger aria-label="Appearance">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">Device</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <h2 className="settings-title">Your account and progress</h2>
      <section className="settings-group">
        <div className="row">
          <CloudOff size={24} aria-hidden="true" />
          <div>
            <h3>
              {user
                ? (user.email ?? "Signed-in learner")
                : "Learning on this device"}
            </h3>
            <p className="small muted" aria-live="polite">
              {cloudMessage}
            </p>
          </div>
        </div>
        {!user && (
          <>
            <p>
              {hasGoogle
                ? "Sign in with Google to create an account copy. Guest progress stays separate until you choose to import it."
                : "Google sign-in and cloud saves aren’t available on this site yet. To move to another device, export your progress here and import the file there."}
            </p>
            {hasGoogle && (
              <Button onClick={login} disabled={cloudBusy}>
                {cloudBusy ? "Connecting…" : "Continue with Google"}
              </Button>
            )}
          </>
        )}
        {user && (
          <div className="row wrap">
            <Button onClick={saveCloud} disabled={cloudBusy || readOnly}>
              Save to cloud
            </Button>
            <Button
              variant="outline"
              onClick={() => setConfirmation("load")}
              disabled={cloudBusy}
            >
              Load cloud progress
            </Button>
            <Button
              variant="outline"
              onClick={() => setConfirmation("guest")}
              disabled={cloudBusy}
            >
              Import guest progress
            </Button>
            <Button
              variant="ghost"
              onClick={() => setConfirmation("logout")}
              disabled={cloudBusy}
            >
              Sign out
            </Button>
          </div>
        )}
        <div className="row wrap">
          <Button variant="outline" onClick={exportProgress}>
            <Download size={18} aria-hidden="true" />
            Export progress
          </Button>
          <Button variant="outline" onClick={() => file.current?.click()}>
            <Upload size={18} aria-hidden="true" />
            Import progress
          </Button>
        </div>
        <input
          ref={file}
          type="file"
          accept=".json,application/json"
          name="progress-file"
          aria-label="Import Ting progress JSON"
          className="sr-only"
          tabIndex={-1}
          onChange={importFile}
        />
        <p className="small muted">
          The export contains your study history, not recordings or Google
          credentials. Imports replace local progress after confirmation.
        </p>
      </section>
      <h2 className="settings-title">Keep Chinese in your pocket</h2>
      <section className="settings-group">
        <div className="row">
          <Smartphone size={24} aria-hidden="true" />
          <div>
            <h3>Add Ting to your home screen</h3>
            <p className="small muted">
              iPhone: Safari → Share → Add to Home Screen. Android: Chrome’s
              menu → Install app. Desktop: the install button in your browser’s
              address bar.
            </p>
          </div>
        </div>
        <p>
          Download the levels you are studying. Words and app screens work
          offline; YouTube, cloud and most speech recognition remain
          online-only.
        </p>
        {levels.map((level) => (
          <div className="settings-row" key={level.level}>
            <div>
              <h3>
                {level.level <= 6
                  ? `HSK ${level.level}`
                  : `Advanced stage ${level.level}`}
              </h3>
              <p>
                {level.count.toLocaleString()} words with examples
                {downloads.includes(level.level) ? " / Saved offline" : ""}
              </p>
            </div>
            <div className="row gap-small">
              {downloads.includes(level.level) ? (
                <>
                  <Check
                    size={20}
                    className="offline-check"
                    aria-label="Downloaded"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove stage ${level.level} offline download`}
                    onClick={() => removeDownload(level.level)}
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => download(level.level)}
                  disabled={downloadBusy !== null}
                >
                  {downloadBusy === level.level ? "Downloading…" : "Download"}
                </Button>
              )}
            </div>
          </div>
        ))}
      </section>
      <h2 className="settings-title">Delete study data</h2>
      <section className="settings-group">
        <p>
          Export first if you want to keep your history. Deletion requires
          confirmation.
        </p>
        <div className="row wrap">
          <Button
            variant="destructive"
            onClick={() => setConfirmation("reset")}
          >
            Clear this device’s progress
          </Button>
          {user && (
            <Button
              variant="destructive"
              onClick={() => setConfirmation("delete")}
              disabled={cloudBusy}
            >
              Delete cloud study progress
            </Button>
          )}
        </div>
      </section>
      <h2 className="settings-title">About Ting</h2>
      <section className="settings-group">
        <p>
          Version {version}. Independent HSK practice, one conversation at a
          time.
        </p>
        <a
          className="text-link"
          href="https://github.com/brandon-lai/ting/issues/new"
          target="_blank"
          rel="noreferrer"
        >
          Report a problem on GitHub
        </a>
        <p className="small muted">
          Reports are public. Include the stage, session and what went wrong.
          Leave out progress files, recordings, sign-in details and personal
          information.
        </p>
      </section>
      <Dialog
        open={confirmation !== null}
        onOpenChange={(open) => {
          if (!open) setConfirmation(null)
        }}
      >
        <DialogContent>
          <DialogTitle>
            {confirmation === "import" || confirmation === "guest"
              ? "Replace local study progress?"
              : confirmation === "load"
                ? "Load the cloud copy?"
                : confirmation === "logout"
                  ? "Sign out on this device?"
                  : "Delete study progress?"}
          </DialogTitle>
          <DialogDescription>
            {confirmation ? descriptions[confirmation] : ""}
          </DialogDescription>
          <div className="dialog-actions">
            <Button onClick={confirm} disabled={cloudBusy}>
              {confirmation === "reset" || confirmation === "delete"
                ? "Confirm deletion"
                : confirmation === "logout"
                  ? "Confirm sign out"
                  : "Confirm replacement"}
            </Button>
            <Button variant="outline" onClick={() => setConfirmation(null)}>
              Keep current progress
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
