"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  House,
  RotateCcw,
  Headphones,
  ClipboardCheck,
  Settings,
  ArrowUpRight,
  CloudOff,
  UserRound,
  WifiOff,
} from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useLearning } from "./learning-provider"
import { levels } from "@/lib/curriculum"
import { hasGoogle } from "@/lib/cloud"

const navigation = [
  { href: "/", name: "Today", icon: House },
  { href: "/learn", name: "Your course", mobile: "Course", icon: BookOpen },
  { href: "/review", name: "Word review", mobile: "Review", icon: RotateCcw },
  {
    href: "/practice",
    name: "Listening & speaking",
    mobile: "Practice",
    icon: Headphones,
  },
  { href: "/exams", name: "Mock exams", mobile: "Exams", icon: ClipboardCheck },
]

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { progress, ready, storageError, user, login, cloudBusy } =
    useLearning()
  const [account, setAccount] = useState(false)
  const [offline, setOffline] = useState(false)
  const previousPath = useRef(pathname)
  useEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    const heading = document.querySelector<HTMLElement>("#main-content h1")
    if (heading) {
      heading.tabIndex = -1
      heading.focus({ preventScroll: true })
    }
  }, [pathname])
  useEffect(() => {
    const online = () => setOffline(!navigator.onLine)
    const timeout = setTimeout(online, 0)
    window.addEventListener("online", online)
    window.addEventListener("offline", online)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener("online", online)
      window.removeEventListener("offline", online)
    }
  }, [])
  const active = (href: string) =>
    pathname === href || (href === "/learn" && pathname === "/study")
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to lesson content
      </a>
      <aside className="sidebar" aria-label="Main navigation">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            听
          </span>
          ting
        </Link>
        <nav className="sidebar-nav">
          {navigation.map(({ href, name, icon: Icon }) => (
            <Link
              className="nav-item"
              href={href}
              aria-current={active(href) ? "page" : undefined}
              key={href}
            >
              <Icon size={20} aria-hidden="true" />
              {name}
            </Link>
          ))}
          <Link
            className="nav-item"
            href="/library"
            aria-current={pathname === "/library" ? "page" : undefined}
          >
            <BookOpen size={20} aria-hidden="true" />
            Word library
          </Link>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <p className="small muted">A little practice adds up.</p>
            <p className="small">One conversation at a time.</p>
          </div>
          <Link
            className="nav-item"
            href="/settings"
            aria-current={pathname === "/settings" ? "page" : undefined}
          >
            <Settings size={20} aria-hidden="true" />
            Settings
          </Link>
          <Link className="small text-link" href="/guide">
            How Ting works
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </aside>
      <div className="app-main">
        <div className="main-container">
          <header className="topbar">
            <Link href="/" className="brand mobile-brand">
              <span className="brand-mark" aria-hidden="true">
                听
              </span>
              ting
            </Link>
            <span className="date">
              {ready
                ? new Intl.DateTimeFormat("en", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  }).format(new Date())
                : "Your daily Chinese practice"}
            </span>
            <div className="row gap-small">
              <Link className="pill" href="/learn">
                {progress.level <= 6
                  ? `HSK ${progress.level}`
                  : `Stage ${progress.level}`}
                <span className="sr-only">
                  : {levels[progress.level - 1].name}
                </span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                aria-label={
                  user ? "Open account settings" : "Sign in and sync progress"
                }
                onClick={() => setAccount(true)}
              >
                <UserRound size={20} aria-hidden="true" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                render={<Link href="/settings" />}
                aria-label="Open settings"
              >
                <Settings size={20} aria-hidden="true" />
              </Button>
            </div>
          </header>
          {storageError && (
            <div className="status-banner" role="alert">
              <CloudOff size={20} aria-hidden="true" />
              <p>{storageError}</p>
            </div>
          )}
          {offline && (
            <div className="status-banner neutral" role="status">
              <WifiOff size={20} aria-hidden="true" />
              <p>
                You’re offline. Downloaded words and saved lessons still work.
                Videos and cloud sync need a connection.
              </p>
            </div>
          )}
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <footer className="app-footer">
            <span>Chinese that stays with you.</span>
            <div className="row wrap">
              <Link href="/guide">Study guide</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Credits & terms</Link>
            </div>
          </footer>
        </div>
      </div>
      <nav className="bottom-nav" aria-label="Main navigation on mobile">
        {navigation.map(({ href, name, mobile, icon: Icon }) => (
          <Link
            href={href}
            key={href}
            aria-current={active(href) ? "page" : undefined}
          >
            <Icon size={20} aria-hidden="true" />
            <span>{mobile ?? name}</span>
          </Link>
        ))}
      </nav>
      <Dialog open={account} onOpenChange={setAccount}>
        <DialogContent>
          <DialogTitle>
            {user ? "Your Ting account" : "Take your progress with you"}
          </DialogTitle>
          <DialogDescription>
            {user
              ? "Study on this device and sync from account settings."
              : hasGoogle
                ? "Sign in with Google to save an account copy and continue on another device."
                : "Google sign-in and cross-device sync are not enabled yet. Your real study progress stays on this device; you can export it in Settings."}
          </DialogDescription>
          <div className="dialog-actions">
            {hasGoogle && !user && (
              <Button onClick={login} disabled={cloudBusy}>
                {cloudBusy ? "Connecting…" : "Continue with Google"}
              </Button>
            )}
            <Button
              variant={hasGoogle && !user ? "outline" : "default"}
              render={<Link href="/settings" />}
              onClick={() => setAccount(false)}
            >
              Open settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
