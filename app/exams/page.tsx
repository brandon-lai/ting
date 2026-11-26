import type { Metadata } from "next"
import { Suspense } from "react"
import { Exams } from "@/components/exams"
export const metadata: Metadata = { title: "HSK skill mock exams" }
export default function Page() {
  return (
    <Suspense
      fallback={<p className="loading-line">Opening your mock exams…</p>}
    >
      <Exams />
    </Suspense>
  )
}
