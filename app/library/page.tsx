import type { Metadata } from "next"
import { Library } from "@/components/library"
export const metadata: Metadata = { title: "HSK word library" }
export default function Page() {
  return <Library />
}
