import type { Metadata } from "next"
import { Review } from "@/components/review"
export const metadata: Metadata = { title: "Spaced word review" }
export default function Page() {
  return <Review />
}
