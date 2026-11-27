import type { Metadata } from "next"
import { Suspense } from "react"
import { Library } from "@/components/library"
export const metadata: Metadata = { title: "HSK word library" }
export default function Page() {
  return (
    <Suspense
      fallback={<p className="loading-line">Opening your word library…</p>}
    >
      <Library />
    </Suspense>
  )
}
