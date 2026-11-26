import type { Metadata } from "next"
import { Suspense } from "react"
import { Course } from "@/components/course"
export const metadata: Metadata = { title: "Your HSK course" }
export default function Page() {
  return (
    <Suspense fallback={<p className="loading-line">Opening your course…</p>}>
      <Course />
    </Suspense>
  )
}
