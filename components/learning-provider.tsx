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
import { accountKey, createDeviceStore, guestKey } from "@/lib/device-progress"
import { readCloudCopy, restoreCloudCopy } from "@/lib/cloud-copy"

const device = createDeviceStore(() => localStorage)

interface LearningContext {
  progress: Progress
  ready: boolean
  storageError: string | null
  update: (change: (progress: Progress) => Progress) => boolean
  replace: (progress: Progress) => boolean
  exportFile: () => string
  readOnly: boolean
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
  const store = useSyncExternalStore(
    device.subscribe,
    device.getSnapshot,
    device.getServerSnapshot
  )
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storage = (event: StorageEvent) => {
      const { key } = device.getSnapshot()
      if (event.key === null || event.key === key) device.select(key)
    }
    window.addEventListener("storage", storage)
    if (!hasDatabase) {
      device.select(guestKey)
      return () => window.removeEventListener("storage", storage)
    }
    const cloud = browserCloud()
    const { data } = cloud.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null)
        const key = session?.user ? accountKey(session.user.id) : guestKey
        const current = device.getSnapshot()
        if (!current.ready || current.key !== key) device.select(key)
      }
    )
    return () => {
      data.subscription.unsubscribe()
      window.removeEventListener("storage", storage)
    }
  }, [])

  return (
    <StudyProfile key={store.profile} store={store} user={user}>
      {children}
    </StudyProfile>
  )
}

function StudyProfile({
  children,
  store,
  user,
}: {
  children: ReactNode
  store: ReturnType<typeof device.getSnapshot>
  user: User | null
}) {
  const key = store.key
  const profile = store.profile
  const owner = user?.id
  const [version, setVersion] = useState<number | null>(null)
  const [cloudMessage, setCloudMessage] = useState(
    "Progress is saved on this device."
  )
  const [cloudBusy, setCloudBusy] = useState(false)
  const [checkedCloud, setCheckedCloud] = useState(false)
  const updateProgress = useCallback(
    (change: (p: Progress) => Progress) =>
      device.getSnapshot().profile === profile &&
      device.update(key, (p) => (p === store.progress ? change(p) : p)),
    [key, profile, store.progress]
  )
  const authenticatedRequest = useCallback(
    async (method: string, body?: unknown) => {
      const { data, error } = await browserCloud().auth.getSession()
      if (
        error ||
        !data.session ||
        !owner ||
        data.session.user.id !== owner ||
        device.getSnapshot().key !== accountKey(owner) ||
        device.getSnapshot().profile !== profile
      )
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
        signal: AbortSignal.timeout(15000),
      })
      const value = await response.json()
      if (
        device.getSnapshot().key !== accountKey(owner) ||
        device.getSnapshot().profile !== profile
      )
        throw new Error(
          "The active account changed. Nothing was loaded onto this device."
        )
      if (!response.ok)
        throw new Error(
          value.error ?? `Cloud request failed (HTTP ${response.status}).`
        )
      return value as { progress?: unknown; version?: number }
    },
    [owner, profile]
  )

  useEffect(() => {
    if (!owner || accountKey(owner) !== key) return
    let active = true
    authenticatedRequest("GET")
      .then((remote) => {
        if (!active) return
        const copy = readCloudCopy(remote)
        if (copy) {
          if (device.isEmpty()) {
            if (!device.update(key, () => copy.progress))
              throw new Error(
                "The cloud copy is safe, but could not be saved to this device."
              )
            rememberVersion(key, copy.version)
            setVersion(copy.version)
            setCloudMessage(
              "Account progress loaded. Changes save locally; save to cloud when finished."
            )
          } else {
            setVersion(savedVersion(key))
            setCloudMessage(
              "An account copy is available. If this device has never synced, export any local work before loading the cloud copy."
            )
          }
        } else {
          localStorage.removeItem(`${key}:cloud-version`)
          setVersion(0)
          setCloudMessage(
            "No cloud copy yet. Save your first session to cloud."
          )
        }
      })
      .catch((error: unknown) => {
        if (active)
          setCloudMessage(
            error instanceof Error
              ? error.message
              : "Cloud progress could not be loaded."
          )
      })
      .finally(() => {
        if (active) setCheckedCloud(true)
      })
    return () => {
      active = false
    }
  }, [owner, key, authenticatedRequest])

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
      if (
        !owner ||
        key !== accountKey(owner) ||
        device.getSnapshot().key !== key
      )
        throw new Error(
          "The active account changed. Reopen Settings before signing out."
        )
      const { error } = await browserCloud().auth.signOut({ scope: "local" })
      if (error) throw error
      localStorage.removeItem(key)
      localStorage.removeItem(`${key}:cloud-version`)
    })
  }

  async function saveCloud() {
    await cloudAction(async () => {
      const current = device.getSnapshot()
      if (current.key !== key || current.readOnly)
        throw new Error("Restore local progress before saving to cloud.")
      if (version === null)
        throw new Error(
          "Export this device’s progress, then load the cloud copy before saving. No account data was overwritten."
        )
      const result = await authenticatedRequest("PUT", {
        progress: current.progress,
        version,
      })
      rememberVersion(key, result.version)
      setVersion(result.version ?? null)
      setCloudMessage(
        "Saved to your account. Load cloud progress on your other device."
      )
    })
  }

  async function loadCloud() {
    await cloudAction(async () => {
      const before = device.getSnapshot()
      const result = await authenticatedRequest("GET")
      if (before !== device.getSnapshot())
        throw new Error(
          "Local progress changed while loading. Nothing was replaced; try again."
        )
      const loadedVersion = restoreCloudCopy(result, (progress) =>
        device.replace(key, progress)
      )
      rememberVersion(key, loadedVersion)
      setVersion(loadedVersion)
      setCloudMessage("Cloud progress loaded on this device.")
    })
  }

  function importGuest() {
    try {
      if (
        !owner ||
        key !== accountKey(owner) ||
        device.getSnapshot().key !== key
      )
        throw new Error(
          "Sign in before importing guest progress into an account."
        )
      const value = localStorage.getItem(guestKey)
      if (value === null) {
        setCloudMessage("There is no guest progress on this device to import.")
        return
      }
      const parsed = progressSchema.safeParse(JSON.parse(value))
      if (!parsed.success)
        throw new Error("Guest progress is incompatible. Nothing was imported.")
      if (device.replace(key, parsed.data))
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
      localStorage.removeItem(`${key}:cloud-version`)
      if (!device.replace(key, freshProgress()))
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
        replace: (progress) => device.replace(key, progress),
        exportFile: () => device.exportFile(key),
        readOnly: store.readOnly,
        user,
        cloudMessage,
        cloudBusy: cloudBusy || (Boolean(owner) && !checkedCloud),
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

function savedVersion(key: string) {
  const value = localStorage.getItem(`${key}:cloud-version`)
  if (value === null) return null
  const version = Number(value)
  return Number.isSafeInteger(version) && version > 0 ? version : null
}

function rememberVersion(key: string, version: number | undefined) {
  if (version === undefined || !Number.isSafeInteger(version) || version < 1)
    throw new Error(
      "The cloud did not confirm a version. Reload the cloud copy before saving again."
    )
  localStorage.setItem(`${key}:cloud-version`, String(version))
}

export function useLearning() {
  const context = useContext(Context)
  if (!context) throw new Error("LearningProvider is required.")
  return context
}
