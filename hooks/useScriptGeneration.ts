"use client"

import { useCallback, useState } from "react"
import type { GenerateRequestBody } from "@/lib/validators"

export function useScriptGeneration() {
  const [completion, setCompletion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generate = useCallback(async (body: GenerateRequestBody): Promise<boolean> => {
    setError(null)
    setCompletion("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data.error ?? "Generation failed. Please try again.")
      }

      const reader = res.body?.getReader()
      if (!reader) {
        const text = await res.text()
        setCompletion(text)
        return true
      }

      const decoder = new TextDecoder()
      let accumulated = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setCompletion(accumulated)
      }

      accumulated += decoder.decode()
      setCompletion(accumulated)
      return true
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.")
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { completion, isLoading, error, generate, setError, setCompletion }
}
