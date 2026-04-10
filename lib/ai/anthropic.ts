import type { AIProvider } from "./types"

export const AnthropicProvider: AIProvider = {
  async generateScript(): Promise<Response> {
    throw new Error("Anthropic provider not yet configured.")
  },
}
