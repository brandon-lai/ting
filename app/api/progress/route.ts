import { hasDatabase } from "@/lib/cloud"
import { tokenCloud } from "@/lib/server-cloud"
import { progressSchema } from "@/lib/progress"
import { z } from "zod"

const headers = { "Cache-Control": "private, no-store" }

async function authenticate(request: Request) {
  const token = request.headers
    .get("authorization")
    ?.match(/^Bearer (.+)$/)?.[1]
  if (!token) return null
  const cloud = tokenCloud(token)
  const { data, error } = await cloud.auth.getUser(token)
  return error || !data.user ? null : { cloud, user: data.user }
}

export async function GET(request: Request) {
  if (!hasDatabase)
    return Response.json(
      {
        error:
          "Cloud storage is not configured. Use local study or export your progress.",
      },
      { status: 503, headers }
    )
  const auth = await authenticate(request)
  if (!auth)
    return Response.json(
      { error: "Sign in to read account progress." },
      { status: 401, headers }
    )
  const { data, error } = await auth.cloud
    .from("learning_progress")
    .select("data,version")
    .eq("user_id", auth.user.id)
    .maybeSingle()
  if (error) {
    console.error("Progress read failed:", error.code)
    return Response.json(
      { error: "Cloud progress could not be read. Try again when connected." },
      { status: 502, headers }
    )
  }
  return Response.json(
    { progress: data?.data ?? null, version: data?.version ?? 0 },
    { headers }
  )
}

export async function PUT(request: Request) {
  if (!hasDatabase)
    return Response.json(
      {
        error:
          "Cloud storage is not configured. Nothing was saved to an account.",
      },
      { status: 503, headers }
    )
  const auth = await authenticate(request)
  if (!auth)
    return Response.json(
      { error: "Sign in to save account progress." },
      { status: 401, headers }
    )
  const body = await request.text()
  if (new TextEncoder().encode(body).byteLength > 3000000)
    return Response.json(
      { error: "The progress file exceeds 3 MB." },
      { status: 413, headers }
    )
  let value: unknown
  try {
    value = JSON.parse(body)
  } catch {
    return Response.json(
      { error: "Progress must be valid JSON." },
      { status: 400, headers }
    )
  }
  const parsed = z
    .object({ progress: progressSchema, version: z.number().int().min(0) })
    .safeParse(value)
  if (!parsed.success)
    return Response.json(
      { error: "The progress file does not match this version of Ting." },
      { status: 400, headers }
    )
  const { data, error } = await auth.cloud.rpc("save_learning_progress", {
    p_data: parsed.data.progress,
    p_expected_version: parsed.data.version,
  })
  if (error?.code === "40001")
    return Response.json(
      {
        error:
          "Another device saved newer progress. Reload cloud progress before saving again.",
      },
      { status: 409, headers }
    )
  if (error) {
    console.error("Progress save failed:", error.code)
    return Response.json(
      { error: "Cloud save failed. Your local copy has not been lost." },
      { status: 502, headers }
    )
  }
  return Response.json({ version: data }, { headers })
}

export async function DELETE(request: Request) {
  if (!hasDatabase)
    return Response.json(
      { error: "Cloud storage is not configured." },
      { status: 503, headers }
    )
  const auth = await authenticate(request)
  if (!auth)
    return Response.json(
      { error: "Sign in to delete account progress." },
      { status: 401, headers }
    )
  const { error } = await auth.cloud
    .from("learning_progress")
    .delete()
    .eq("user_id", auth.user.id)
  if (error) {
    console.error("Progress deletion failed:", error.code)
    return Response.json(
      { error: "Account progress was not deleted. Try again." },
      { status: 502, headers }
    )
  }
  return Response.json({ deleted: true }, { headers })
}
