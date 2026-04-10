"use client"

import { useCallback, useState } from "react"
import Link from "next/link"
import { NegotiationForm } from "@/components/tool/NegotiationForm"
import { ScriptOutput } from "@/components/tool/ScriptOutput"
import { GenerationLimitBanner } from "@/components/tool/GenerationLimitBanner"
import { AdSlot } from "@/components/ads/AdSlot"
import { useScriptGeneration } from "@/hooks/useScriptGeneration"
import { useGenerationLimit } from "@/hooks/useGenerationLimit"
import { BrandLogo } from "@/components/BrandLogo"
import type { GenerateRequestBody } from "@/lib/validators"
import { FEATURES } from "@/lib/config/features"

const showSidebarAdSlot =
  FEATURES.ads.enabled && FEATURES.ads.provider !== "none"

export function ToolPageClient() {
  const { completion, isLoading, error, generate, setError } =
    useScriptGeneration()
  const { hasReachedLimit, increment } = useGenerationLimit()
  const [phase, setPhase] = useState<"form" | "output">("form")
  const [lastRequest, setLastRequest] = useState<GenerateRequestBody | null>(
    null
  )
  const [formKey, setFormKey] = useState(0)

  const handleGenerate = useCallback(
    async (body: GenerateRequestBody) => {
      if (hasReachedLimit) return
      setLastRequest(body)
      setPhase("output")
      setError(null)
      const ok = await generate(body)
      if (ok) increment()
    },
    [generate, hasReachedLimit, increment, setError]
  )

  const handleRegenerate = useCallback(() => {
    if (hasReachedLimit || !lastRequest) return
    void handleGenerate(lastRequest)
  }, [handleGenerate, hasReachedLimit, lastRequest])

  const handleEditInputs = useCallback(() => {
    setFormKey((k) => k + 1)
    setPhase("form")
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg">
            <BrandLogo />
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <GenerationLimitBanner />

        <div
          className={
            showSidebarAdSlot
              ? "grid gap-10 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px]"
              : "grid gap-10"
          }
        >
          <div className="space-y-8">
            {phase === "form" ? (
              <div className="rounded-2xl border border-border bg-surface p-6 md:p-8 shadow-lg">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Build your negotiation script
                </h1>
                <p className="text-muted-foreground text-sm mb-8">
                  No sign-up. Fill the form once — get your script and email
                  draft instantly.
                </p>
                <NegotiationForm
                  key={formKey}
                  onSubmit={handleGenerate}
                  isLoading={isLoading}
                  initialValues={lastRequest ?? undefined}
                  serverError={error}
                  disabled={hasReachedLimit}
                />
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-6">
                  Your results
                </h1>
                <ScriptOutput
                  fullText={completion}
                  isStreaming={isLoading}
                  generateScript={lastRequest?.generateScript ?? true}
                  generateEmail={lastRequest?.generateEmail ?? true}
                  onRegenerate={handleRegenerate}
                  onEditInputs={handleEditInputs}
                  regenerateDisabled={hasReachedLimit}
                />
              </div>
            )}
          </div>

          {showSidebarAdSlot ? (
            <aside className="lg:sticky lg:top-28 h-fit">
              <div className="rounded-2xl border border-border bg-surface-elevated/30 min-h-[120px] overflow-hidden p-2">
                <AdSlot placement="tool-sidebar" className="block w-full" />
              </div>
            </aside>
          ) : null}
        </div>
      </main>
    </div>
  )
}
