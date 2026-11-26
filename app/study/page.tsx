import type { Metadata } from "next"
import { Suspense } from "react"
import { Lesson } from "@/components/lesson"
export const metadata: Metadata = { title: "Your 30-minute Chinese lesson" }
export default function Page() {
  return (
    <Suspense fallback={<p className="loading-line">Opening your lesson…</p>}>
      <Lesson />
    </Suspense>
  )
}
