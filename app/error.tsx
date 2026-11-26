"use client"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Ting screen failed:", error.digest ?? error.message)
  }, [error])
  return (
    <div className="empty-state" role="alert">
      <h1>This lesson couldn’t open.</h1>
      <p>
        Your saved progress hasn’t been removed. Try loading the screen again,
        or reconnect if you are offline.
      </p>
      <Button onClick={reset}>Try this screen again</Button>
    </div>
  )
}
