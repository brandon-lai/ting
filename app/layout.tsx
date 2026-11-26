import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LearningProvider } from "@/components/learning-provider"
import { Shell } from "@/components/shell"
import { PwaRegistration } from "@/components/pwa"
import { TooltipProvider } from "@/components/ui/tooltip"

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000")
  ),
  title: {
    default: "Ting | Chinese that stays with you",
    template: "%s | Ting",
  },
  description:
    "Learn Chinese in 30-minute HSK lessons. Practice vocabulary, grammar, listening and speaking, then keep it with spaced review.",
  applicationName: "Ting",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Ting" },
  openGraph: {
    title: "Ting | Chinese that stays with you",
    description:
      "Your daily Chinese, from a first conversation to advanced HSK practice.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f7fc" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1724" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <LearningProvider>
              <PwaRegistration />
              <Shell>{children}</Shell>
            </LearningProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
