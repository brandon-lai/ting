import { createBrowserClient } from "@supabase/ssr"

export const hasDatabase = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
)
export const hasGoogle =
  hasDatabase && process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true"

let client: ReturnType<typeof createBrowserClient> | undefined
export function browserCloud() {
  if (!hasDatabase)
    throw new Error(
      "Cloud accounts are not configured. Your study progress can still be saved on this device."
    )
  client ??= createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
  return client
}
