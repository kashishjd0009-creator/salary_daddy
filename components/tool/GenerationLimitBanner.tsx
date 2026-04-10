"use client"

import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { FEATURES } from "@/lib/config/features"
import { useGenerationLimit } from "@/hooks/useGenerationLimit"

export function GenerationLimitBanner() {
  const limit = FEATURES.freeTier.generationLimit
  const { remaining, used, hasReachedLimit } = useGenerationLimit()

  if (limit === null) return null

  if (hasReachedLimit) {
    return (
      <div
        role="alert"
        className="rounded-2xl border border-border bg-surface-elevated p-4 text-sm text-foreground mb-6"
      >
        <p className="font-medium">
          You&apos;ve reached your hourly free limit ({limit}/{limit} used).
        </p>
        <p className="mt-2 text-muted-foreground">
          You can generate again when your hourly attempts reset.
        </p>
        {FEATURES.premium.enabled ? (
          <Link
            href="/#pro"
            className="mt-2 inline-block text-primary font-semibold hover:underline"
          >
            Upgrade to Pro
          </Link>
        ) : (
          <p className="mt-2 text-muted-foreground">Please try again in the next hour.</p>
        )}
      </div>
    )
  }

  const pct = Math.min(100, Math.round((used / limit) * 100))

  return (
    <div className="rounded-2xl border border-border bg-surface-elevated p-4 mb-6">
      <p className="text-sm text-foreground mb-2">
        <span className="font-semibold">{remaining}</span> of{" "}
        <span className="font-semibold">{limit}</span> attempts remaining this hour
        {remaining !== null && (
          <span className="text-muted-foreground"> ({used} used)</span>
        )}
      </p>
      <Progress value={pct} className="h-2 bg-border" />
    </div>
  )
}
