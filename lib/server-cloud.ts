import "server-only"
import { createClient } from "@supabase/supabase-js"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { hasDatabase } from "./cloud"

export function tokenCloud(token: string) {
  if (!hasDatabase) throw new Error("Cloud storage is not configured.")
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    }
  )
}

export async function cookieCloud() {
  if (!hasDatabase) throw new Error("Cloud accounts are not configured.")
  const store = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => store.getAll(),
        setAll: (values) =>
          values.forEach(({ name, value, options }) =>
            store.set(name, value, options)
          ),
      },
    }
  )
}
