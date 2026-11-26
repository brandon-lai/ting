"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js"
import { browserCloud, hasDatabase, hasGoogle } from "@/lib/cloud"
import { freshProgress, progressSchema } from "@/lib/progress"
import type { Progress } from "@/lib/types"

type Snapshot = {
  progress: Progress
  ready: boolean
  error: string | null
  key: string
}
const initial: Snapshot = {
  progress: freshProgress(),
  ready: false,
  error: null,
  key: "ting:guest:v1",
}
let snapshot = initial
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((listener) => listener())
const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
const getSnapshot = () => snapshot
const getServerSnapshot = () => initial

function selectStorage(key: string) {
  let progress = freshProgress()
  let error: string | null = null
  try {
    const saved = localStorage.getItem(key)
    if (saved) {
      const parsed = progressSchema.safeParse(JSON.parse(saved))
      if (parsed.success) progress = parsed.data
      else
        error =
          "Saved progress could not be read. Export the stored file before resetting this device."
    }
  } catch {
    error =
      "Browser storage could not be read. Allow site storage to keep your progress."
  }
  snapshot = { progress, ready: true, error, key }
  emit()
}

function updateProgress(update: (progress: Progress) => Progress) {
  const next = { ...update(snapshot.progress), updated: Date.now() }
  try {
    localStorage.setItem(snapshot.key, JSON.stringify(next))
    snapshot = { ...snapshot, progress: next, error: null }
    emit()
    return true
  } catch {
    snapshot = {
      ...snapshot,
      error:
        "Progress was not saved: browser storage is full or blocked. Export your current progress and free storage before continuing.",
    }
    emit()
    return false
  }
}

interface LearningContext {
  progress: Progress
  ready: boolean
  storageError: string | null
  update: (change: (progress: Progress) => Progress) => boolean
  user: User | null
  cloudMessage: string
  cloudBusy: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
  saveCloud: () => Promise<void>
  loadCloud: () => Promise<void>
  importGuest: () => void
  deleteCloud: () => Promise<boolean>
}

const Context = createContext<LearningContext | null>(null)

export function LearningProvider({ children }: { children: ReactNode }) {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [user, setUser] = useState<User | null>(null)
  const [version, setVersion] = useState(0)
  const [cloudMessage, setCloudMessage] = useState(
    "Progress is saved on this device."
  )
  const [cloudBusy, setCloudBusy] = useState(false)

  useEffect(() => {
    selectStorage("ting:guest:v1")
    const storage = (event: StorageEvent) => {
      if (event.key === snapshot.key) selectStorage(snapshot.key)
    }
    window.addEventListener("storage", storage)
    if (!hasDatabase)
      return () => window.removeEventListener("storage", storage)
    const cloud = browserCloud()
    const { data } = cloud.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null)
        const key = session?.user
          ? `ting:account:${session.user.id}:v1`
          : "ting:guest:v1"
        if (snapshot.key !== key) selectStorage(key)
      }
    )
    return () => {
      data.subscription.unsubscribe()
      window.removeEventListener("storage", storage)
    }
  }, [])

  const authenticatedRequest = useCallback(
    async (method: string, body?: unknown) => {
      const { data, error } = await browserCloud().auth.getSession()
      if (error || !data.session)
        throw new Error(
          "Your sign-in expired. Sign in again; your local copy is still here."
        )
      const response = await fetch("/api/progress", {
        method,
        headers: {
          Authorization: `Bearer ${data.session.access_token}`,
          "Content-Type": "application/json",
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        cache: "no-store",
      })
      const value = await response.json()
      if (!response.ok)
        throw new Error(
          value.error ?? `Cloud request failed (HTTP ${response.status}).`
        )
      return value as { progress?: unknown; version?: number }
    },
    []
  )

  useEffect(() => {
    if (!user) return
    let active = true
    authenticatedRequest("GET")
      .then((remote) => {
        if (!active) return
        setVersion(remote.version ?? 0)
        if (remote.progress) {
          const parsed = progressSchema.safeParse(remote.progress)
          if (!parsed.success)
            throw new Error(
              "Cloud progress is incompatible. Your local copy has been kept."
            )
          if (snapshot.progress.updated === 0) {
            updateProgress(() => parsed.data)
            setCloudMessage(
              "Account progress loaded. Changes save locally; save to cloud when finished."
            )
          } else
            setCloudMessage(
              "An account copy is available. Save this device or load cloud progress."
            )
        } else
          setCloudMessage(
            "No cloud copy yet. Save your first session to cloud."
          )
      })
      .catch((error: unknown) => {
        if (active)
          setCloudMessage(
            error instanceof Error
              ? error.message
              : "Cloud progress could not be loaded."
          )
      })
    return () => {
      active = false
    }
  }, [user, authenticatedRequest])

  async function cloudAction(action: () => Promise<void>) {
    setCloudBusy(true)
    try {
      await action()
    } catch (error) {
      setCloudMessage(
        error instanceof Error
          ? error.message
          : "Cloud request failed. Your local copy is still here."
      )
    } finally {
      setCloudBusy(false)
    }
  }

  async function login() {
    if (!hasGoogle) {
      setCloudMessage(
        "Google sign-in is not enabled on this deployment. Study locally; no account has been created."
      )
      return
    }
    await cloudAction(async () => {
      const { error } = await browserCloud().auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${location.origin}/auth/callback` },
      })
      if (error) throw error
    })
  }

  async function logout() {
    await cloudAction(async () => {
      const key = snapshot.key
      const { error } = await browserCloud().auth.signOut()
      if (error) throw error
      localStorage.removeItem(key)
      selectStorage("ting:guest:v1")
      setVersion(0)
      setCloudMessage(
        "Signed out. The account's local copy has been removed from this device."
      )
    })
  }

  async function saveCloud() {
    await cloudAction(async () => {
      const result = await authenticatedRequest("PUT", {
        progress: snapshot.progress,
        version,
      })
      setVersion(result.version ?? version)
      setCloudMessage(
        "Saved to your account. Load cloud progress on your other device."
      )
    })
  }

  async function loadCloud() {
    await cloudAction(async () => {
      const result = await authenticatedRequest("GET")
      const parsed = progressSchema.safeParse(
        result.progress ?? freshProgress()
      )
      if (!parsed.success)
        throw new Error("Cloud progress is incompatible. Nothing was replaced.")
      if (!updateProgress(() => parsed.data))
        throw new Error("Cloud progress could not be saved to this device.")
      setVersion(result.version ?? 0)
      setCloudMessage("Cloud progress loaded on this device.")
    })
  }

  function importGuest() {
    try {
      const value = localStorage.getItem("ting:guest:v1")
      if (!value) {
        setCloudMessage("There is no guest progress on this device to import.")
        return
      }
      const parsed = progressSchema.safeParse(JSON.parse(value))
      if (!parsed.success)
        throw new Error("Guest progress is incompatible. Nothing was imported.")
      if (updateProgress(() => parsed.data))
        setCloudMessage(
          "Guest progress imported into this device's account copy. Save to cloud to sync it."
        )
    } catch (error) {
      setCloudMessage(
        error instanceof Error
          ? error.message
          : "Guest progress could not be imported."
      )
    }
  }

  async function deleteCloud() {
    let deleted = false
    await cloudAction(async () => {
      await authenticatedRequest("DELETE")
      if (!updateProgress(() => freshProgress()))
        throw new Error(
          "Cloud progress was deleted, but local storage could not be cleared."
        )
      setVersion(0)
      deleted = true
      setCloudMessage(
        "Cloud and account-local study progress deleted. Your Google account is unchanged."
      )
    })
    return deleted
  }

  return (
    <Context.Provider
      value={{
        progress: store.progress,
        ready: store.ready,
        storageError: store.error,
        update: updateProgress,
        user,
        cloudMessage,
        cloudBusy,
        login,
        logout,
        saveCloud,
        loadCloud,
        importGuest,
        deleteCloud,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useLearning() {
  const context = useContext(Context)
  if (!context) throw new Error("LearningProvider is required.")
  return context
}
