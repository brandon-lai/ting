import type { Metadata } from "next"
import { Practice } from "@/components/practice"
export const metadata: Metadata = {
  title: "Chinese listening and speaking practice",
}
export default function Page() {
  return <Practice />
}
