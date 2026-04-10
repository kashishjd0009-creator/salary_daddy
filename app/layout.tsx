import type { Metadata } from "next"
import { IBM_Plex_Mono, Outfit } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
})

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://salarydaddy.com"

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "SalaryDaddy — Free AI Salary Negotiation Script Generator",
  description:
    "Generate a personalized salary negotiation script and email draft in seconds. 100% free. Powered by Groq (Llama / open models).",
  keywords: [
    "salary negotiation script",
    "how to negotiate salary",
    "free salary tool",
    "ai negotiation",
    "job offer negotiation email",
  ],
  openGraph: {
    title: "SalaryDaddy — Stop Leaving Money On The Table",
    description:
      "Free AI-powered negotiation scripts tailored to your role, experience, and offer.",
    url: appUrl,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(outfit.variable, ibmPlexMono.variable, "dark")}
    >
      <body className="min-h-screen antialiased font-sans">{children}</body>
    </html>
  )
}
