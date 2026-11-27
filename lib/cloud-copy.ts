import { progressSchema } from "./progress"
import type { Progress } from "./types"

export function readCloudCopy(value: unknown) {
  if (
    typeof value === "object" &&
    value !== null &&
    "version" in value &&
    "progress" in value
  ) {
    const { version, progress } = value
    if (progress === null && version === 0) return null
    if (
      typeof version === "number" &&
      Number.isSafeInteger(version) &&
      version > 0
    ) {
      const parsed = progressSchema.safeParse(progress)
      if (parsed.success) return { progress: parsed.data, version }
    }
  }
  throw new Error(
    "Cloud progress is incompatible. Your local copy has been kept."
  )
}

export function restoreCloudCopy(
  value: unknown,
  save: (p: Progress) => boolean
) {
  const copy = readCloudCopy(value)
  if (!copy)
    throw new Error(
      "There is no cloud copy to load. Your device’s progress has not changed."
    )
  if (!save(copy.progress))
    throw new Error(
      "The cloud copy is safe, but could not be saved to this device."
    )
  return copy.version
}
