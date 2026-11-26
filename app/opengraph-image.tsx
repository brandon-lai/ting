import { ImageResponse } from "next/og"
import { brand } from "@/lib/brand-image"
export const alt =
  "Ting: Chinese that stays with you. 30-minute HSK lessons from first conversations to advanced practice."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: brand.paper,
        color: brand.ink,
        padding: 72,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", fontSize: 48, fontWeight: 700 }}>ting</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            maxWidth: 900,
            lineHeight: 1.1,
          }}
        >
          Chinese that stays with you.
        </div>
        <div style={{ display: "flex", fontSize: 28 }}>
          Hear it. Say it. Remember it.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 24,
        }}
      >
        <div>From first conversations to advanced HSK practice.</div>
        <div
          style={{
            background: brand.yellow,
            padding: "12px 24px",
            borderRadius: 12,
          }}
        >
          30 minutes a day
        </div>
      </div>
    </div>,
    size
  )
}
