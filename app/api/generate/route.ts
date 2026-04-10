import { aiProvider } from "@/lib/ai"
import { MOCK_NEGOTIATION_RESPONSE } from "@/lib/mock-ai"
import { checkRateLimit } from "@/lib/rate-limit"
import { generateRequestSchema } from "@/lib/validators"
import type { NextRequest } from "next/server"

const baseHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
} as const

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown"
  return req.headers.get("x-real-ip") ?? "unknown"
}

export function GET() {
  return Response.json(
    { error: "Method not allowed" },
    { status: 405, headers: { ...baseHeaders, "Content-Type": "application/json" } }
  )
}

export async function POST(req: NextRequest) {
  let json: unknown
  try {
    json = await req.json()
  } catch {
    return Response.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: { ...baseHeaders, "Content-Type": "application/json" } }
    )
  }

  const parsed = generateRequestSchema.safeParse(json)
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => i.message).join("; ")
    return Response.json(
      { error: msg || "Validation failed" },
      { status: 400, headers: { ...baseHeaders, "Content-Type": "application/json" } }
    )
  }

  const ip = clientIp(req)
  const { allowed } = checkRateLimit(ip)
  if (!allowed) {
    return Response.json(
      { error: "You have reached your 10 attempts for this hour. Please try again in the next hour." },
      { status: 429, headers: { ...baseHeaders, "Content-Type": "application/json" } }
    )
  }

  if (process.env.USE_MOCK_AI === "true") {
    await new Promise((r) => setTimeout(r, 2000))
    return new Response(MOCK_NEGOTIATION_RESPONSE, {
      status: 200,
      headers: {
        ...baseHeaders,
        "Content-Type": "text/plain; charset=utf-8",
      },
    })
  }

  try {
    return await aiProvider.generateScript(parsed.data)
  } catch {
    return Response.json(
      { error: "Generation failed. Please try again." },
      { status: 500, headers: { ...baseHeaders, "Content-Type": "application/json" } }
    )
  }
}
