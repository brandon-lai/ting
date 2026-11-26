import type { Metadata } from "next"
import { Suspense } from "react"
import { Settings } from "@/components/settings"
export const metadata: Metadata = { title: "Study and account settings" }
export default function Page() {
  return (
    <Suspense fallback={<p className="loading-line">Opening your settings…</p>}>
      <Settings />
    </Suspense>
  )
}
