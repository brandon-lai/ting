import type { Metadata } from "next"
import { Suspense } from "react"
import { Practice } from "@/components/practice"
export const metadata: Metadata = {
  title: "Chinese listening and speaking practice",
}
export default function Page() {
  return (
    <Suspense fallback={<p className="loading-line">Opening your practice…</p>}>
      <Practice />
    </Suspense>
  )
}
