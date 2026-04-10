import type { Metadata } from "next"
import { ToolPageClient } from "@/components/tool/ToolPageClient"

export const metadata: Metadata = {
  title: "Negotiation Script Generator — SalaryDaddy",
  description:
    "Generate your personalized salary negotiation script and email draft. Free, no sign-up.",
}

export default function ToolPage() {
  return <ToolPageClient />
}
