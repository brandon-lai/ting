import { freshProgress, progressSchema } from "./progress"
import type { Progress } from "./types"

export const guestKey = "ting:guest:v1"
export const accountKey = (id: string) => `ting:account:${id}:v1`

type Snapshot = {
  key: string
  profile: number
  progress: Progress
  ready: boolean
  readOnly: boolean
  error: string | null
}

export function createDeviceStore(
  storage: () => Pick<Storage, "getItem" | "setItem">
) {
  const initial: Snapshot = {
    key: guestKey,
    profile: 0,
    progress: freshProgress(),
    ready: false,
    readOnly: true,
    error: null,
  }
  let snapshot = initial
  let raw: string | null | undefined
  const listeners = new Set<() => void>()

  function publish(next: Snapshot) {
    snapshot = next
    listeners.forEach((listener) => listener())
  }

  function select(key: string) {
    const profile =
      key === snapshot.key ? snapshot.profile : snapshot.profile + 1
    let saved: string | null
    try {
      saved = storage().getItem(key)
    } catch {
      raw = undefined
      publish({
        key,
        profile,
        ready: true,
        readOnly: true,
        progress: snapshot.key === key ? snapshot.progress : freshProgress(),
        error:
          "Ting cannot read browser storage. Allow site storage and reload. No study data has been changed.",
      })
      return
    }
    raw = saved
    if (saved !== null) {
      try {
        const parsed = progressSchema.safeParse(JSON.parse(saved))
        if (parsed.success) {
          publish({
            key,
            profile,
            ready: true,
            readOnly: false,
            error: null,
            progress: parsed.data,
          })
          return
        }
      } catch (error) {
        if (!(error instanceof SyntaxError)) throw error
      }
      publish({
        key,
        profile,
        ready: true,
        readOnly: true,
        progress: freshProgress(),
        error:
          "Saved progress could not be read. Your original data is protected. In Settings, export the original file before restoring a backup or clearing progress.",
      })
      return
    }
    publish({
      key,
      profile,
      ready: true,
      readOnly: false,
      error: null,
      progress: freshProgress(),
    })
  }

  function write(
    key: string,
    change: (progress: Progress) => Progress,
    recovery: boolean
  ) {
    if (
      key !== snapshot.key ||
      !snapshot.ready ||
      (snapshot.readOnly && !recovery)
    )
      return false
    try {
      // A storage event from another tab may still be waiting in the event queue.
      if (storage().getItem(key) !== raw) {
        select(key)
        if (!snapshot.readOnly)
          publish({
            ...snapshot,
            error:
              "This device’s progress changed in another tab. The latest copy is open; try your action again.",
          })
        return false
      }
    } catch {
      select(key)
      return false
    }
    const next = change(snapshot.progress)
    if (next === snapshot.progress && !recovery) return false
    const progress = { ...next, updated: Date.now() }
    const encoded = JSON.stringify(progress)
    try {
      storage().setItem(key, encoded)
    } catch {
      publish({
        ...snapshot,
        error:
          "Progress was not saved: browser storage is full or blocked. Export your saved progress and free storage before continuing.",
      })
      return false
    }
    raw = encoded
    publish({ ...snapshot, readOnly: false, progress, error: null })
    return true
  }

  return {
    select,
    getSnapshot: () => snapshot,
    getServerSnapshot: () => initial,
    isEmpty: () => raw === null && snapshot.ready && !snapshot.readOnly,
    subscribe: (listener: () => void) => {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
    update: (key: string, change: (progress: Progress) => Progress) =>
      write(key, change, false),
    replace: (key: string, progress: Progress) =>
      write(key, () => progress, true),
    exportFile(key: string) {
      if (snapshot.key !== key || !snapshot.ready)
        throw new Error(
          "The active study profile changed. Reopen Settings before exporting."
        )
      const saved = storage().getItem(key)
      if (saved !== null) return saved
      if (snapshot.readOnly || raw !== null)
        throw new Error(
          "The stored file is unavailable. Reload before exporting; no backup was created."
        )
      return JSON.stringify(snapshot.progress)
    },
  }
}
