import { createGroq } from "@ai-sdk/groq"
import { streamText } from "ai"
import { buildPrompt } from "../prompts"
import type { AIProvider, ScriptGenerationInput } from "./types"

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
} as const

/** Free-tier Groq models: e.g. llama-3.1-8b-instant, mixtral-8x7b-32768, llama-3.3-70b-versatile */
const DEFAULT_GROQ_MODEL = "llama-3.1-8b-instant"

export const GroqProvider: AIProvider = {
  async generateScript(input: ScriptGenerationInput): Promise<Response> {
    const modelId =
      process.env.GROQ_MODEL?.trim() || DEFAULT_GROQ_MODEL

    const groq = createGroq({
      apiKey: process.env.GROQ_API_KEY,
    })

    const result = streamText({
      model: groq(modelId),
      prompt: buildPrompt(input),
      maxOutputTokens: 2000,
      temperature: 0.7,
    })
    return result.toTextStreamResponse({ headers: { ...securityHeaders } })
  },
}
