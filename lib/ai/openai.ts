import type { AIProvider } from "./types"

/** Inactive — swap in via `lib/ai/index.ts` if you switch back to OpenAI. */
export const OpenAIProvider: AIProvider = {
  async generateScript(): Promise<Response> {
    throw new Error("OpenAI provider is not configured. The app uses Groq.")
  },
}
