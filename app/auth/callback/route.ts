import { NextResponse } from "next/server"
import { cookieCloud } from "@/lib/server-cloud"
import { hasGoogle } from "@/lib/cloud"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  if (!hasGoogle || !code)
    return NextResponse.redirect(
      new URL("/settings?auth=unavailable", url.origin)
    )
  const cloud = await cookieCloud()
  const { error } = await cloud.auth.exchangeCodeForSession(code)
  return NextResponse.redirect(
    new URL(
      error ? "/settings?auth=failed" : "/settings?auth=connected",
      url.origin
    )
  )
}
