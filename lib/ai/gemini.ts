import type { AIProvider } from "./types"

export const GeminiProvider: AIProvider = {
  async generateScript(): Promise<Response> {
    throw new Error("Gemini provider is not active. The app uses Groq.")
  },
}
