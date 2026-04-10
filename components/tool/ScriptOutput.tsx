"use client"

import { useMemo } from "react"
import { Copy, RefreshCw, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AdSlot } from "@/components/ads/AdSlot"
import { FEATURES } from "@/lib/config/features"
import { parseGeneratedOutput } from "@/lib/parse-output"
import { PremiumOutput } from "@/components/tool/premium/PremiumOutput"
import { PremiumOutputTeaser } from "@/components/tool/premium/PremiumOutputTeaser"

function FormattedBlock({ text }: { text: string }) {
  if (!text.trim()) {
    return (
      <p className="text-muted-foreground text-sm italic">
        {text ? "…" : "Waiting for content…"}
      </p>
    )
  }
  const lines = text.split("\n")
  return (
    <div className="space-y-2 text-sm leading-relaxed text-foreground">
      {lines.map((line, i) => {
        if (line.startsWith("### ")) {
          return (
            <h3
              key={i}
              className="text-base font-bold text-foreground pt-3 first:pt-0"
            >
              {line.replace(/^###\s+/, "")}
            </h3>
          )
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={i} className="text-lg font-semibold text-primary pt-2">
              {line.replace(/^##\s+/, "")}
            </h2>
          )
        }
        if (line.trim() === "") {
          return <div key={i} className="h-2" />
        }
        return (
          <p key={i} className="text-foreground/95">
            {line}
          </p>
        )
      })}
    </div>
  )
}

interface Props {
  fullText: string
  isStreaming: boolean
  generateScript: boolean
  generateEmail: boolean
  onRegenerate: () => void
  onEditInputs: () => void
  regenerateDisabled?: boolean
}

export function ScriptOutput({
  fullText,
  isStreaming,
  generateScript,
  generateEmail,
  onRegenerate,
  onEditInputs,
  regenerateDisabled = false,
}: Props) {
  const parsed = useMemo(
    () => parseGeneratedOutput(fullText, generateScript, generateEmail),
    [fullText, generateScript, generateEmail]
  )

  const defaultTab = generateScript ? "script" : "email"

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      /* ignore */
    }
  }

  async function copyEverything() {
    const blocks: string[] = []
    if (generateScript && parsed.scriptSection)
      blocks.push("NEGOTIATION SCRIPT\n\n" + parsed.scriptSection)
    if (generateEmail && parsed.emailSection)
      blocks.push("EMAIL\n\n" + parsed.emailSection)
    await copyText(blocks.join("\n\n---\n\n"))
  }

  const showTabs = generateScript && generateEmail

  return (
    <div className="space-y-6">
      {showTabs ? (
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList
            variant="default"
            className="grid h-auto w-full grid-cols-2 gap-1 rounded-xl border border-border bg-surface-elevated p-1.5 shadow-inner"
          >
            <TabsTrigger
              value="script"
              className="min-h-11 rounded-lg px-3 py-2 text-sm font-medium"
            >
              Negotiation Script
            </TabsTrigger>
            <TabsTrigger
              value="email"
              className="min-h-11 rounded-lg px-3 py-2 text-sm font-medium"
            >
              Email Draft
            </TabsTrigger>
          </TabsList>
          <TabsContent value="script" className="mt-4">
            <div className="relative rounded-2xl border border-border bg-surface p-6 shadow-lg">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4"
                onClick={() => copyText(parsed.scriptSection)}
                aria-label="Copy negotiation script"
              >
                <Copy className="size-4 mr-1" />
                Copy
              </Button>
              <FormattedBlock text={parsed.scriptSection} />
            </div>
          </TabsContent>
          <TabsContent value="email" className="mt-4">
            <div className="relative rounded-2xl border border-border bg-surface p-6 shadow-lg space-y-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10"
                onClick={() =>
                  copyText(
                    (parsed.emailSubject ? `Subject: ${parsed.emailSubject}\n\n` : "") +
                      parsed.emailBody
                  )
                }
                aria-label="Copy email draft"
              >
                <Copy className="size-4 mr-1" />
                Copy
              </Button>
              {parsed.emailSubject && (
                <Badge
                  variant="secondary"
                  className="bg-accent/15 text-accent border border-accent/30 font-normal max-w-[90%] truncate"
                >
                  {parsed.emailSubject}
                </Badge>
              )}
              <FormattedBlock text={parsed.emailBody} />
            </div>
          </TabsContent>
        </Tabs>
      ) : generateScript ? (
        <div className="relative rounded-2xl border border-border bg-surface p-6 shadow-lg">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4"
            onClick={() => copyText(parsed.scriptSection)}
            aria-label="Copy negotiation script"
          >
            <Copy className="size-4 mr-1" />
            Copy
          </Button>
          <FormattedBlock text={parsed.scriptSection} />
        </div>
      ) : (
        <div className="relative rounded-2xl border border-border bg-surface p-6 shadow-lg space-y-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 z-10"
            onClick={() =>
              copyText(
                (parsed.emailSubject ? `Subject: ${parsed.emailSubject}\n\n` : "") +
                  parsed.emailBody
              )
            }
            aria-label="Copy email draft"
          >
            <Copy className="size-4 mr-1" />
            Copy
          </Button>
          {parsed.emailSubject && (
            <Badge
              variant="secondary"
              className="bg-accent/15 text-accent border border-accent/30 font-normal max-w-[90%] truncate"
            >
              {parsed.emailSubject}
            </Badge>
          )}
          <FormattedBlock text={parsed.emailBody} />
        </div>
      )}

      {isStreaming && (
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-primary animate-pulse" />
          Streaming…
        </p>
      )}

      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          className="rounded-xl border-border"
          onClick={onRegenerate}
          disabled={isStreaming || regenerateDisabled}
        >
          <RefreshCw className="size-4 mr-2" />
          Regenerate
        </Button>
        <Button
          type="button"
          variant="outline"
          className="rounded-xl border-border"
          onClick={onEditInputs}
          disabled={isStreaming}
        >
          <Pencil className="size-4 mr-2" />
          Edit Inputs
        </Button>
        <Button
          type="button"
          className="rounded-xl bg-primary text-primary-foreground font-semibold ml-auto sm:ml-0"
          onClick={copyEverything}
          disabled={!fullText.trim()}
        >
          <Copy className="size-4 mr-2" />
          Copy Everything
        </Button>
      </div>

      <AdSlot placement="tool-below-output" className="mt-8" />

      {FEATURES.premium.enabled ? (
        <PremiumOutput />
      ) : FEATURES.premium.teaserVisible ? (
        <PremiumOutputTeaser />
      ) : null}
    </div>
  )
}
