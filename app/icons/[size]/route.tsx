import { ImageResponse } from "next/og"
import { BrandIcon } from "@/lib/brand-image"
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ size: string }> }
) {
  const value = (await params).size
  if (value !== "192" && value !== "512")
    return new Response("Unknown icon size", { status: 404 })
  const size = Number(value)
  return new ImageResponse(<BrandIcon size={size} />, {
    width: size,
    height: size,
  })
}
