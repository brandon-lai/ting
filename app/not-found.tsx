import Link from "next/link"
import { Button } from "@/components/ui/button"
export default function NotFound() {
  return (
    <div className="empty-state">
      <h1>This page got lost in translation.</h1>
      <p className="muted">
        There’s no lesson here. Your course and saved progress are still
        waiting.
      </p>
      <Button render={<Link href="/" />}>Back to today’s Chinese</Button>
    </div>
  )
}
