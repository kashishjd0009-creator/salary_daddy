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
        <p className="font-medium">You&apos;ve used all your free generations.</p>
        {FEATURES.premium.enabled ? (
          <Link
            href="/#pro"
            className="mt-2 inline-block text-primary font-semibold hover:underline"
          >
            Upgrade to Pro
          </Link>
        ) : (
          <p className="mt-2 text-muted-foreground">
            Check back later — we may add more free runs in the future.
          </p>
        )}
      </div>
    )
  }

  const pct = Math.min(100, Math.round((used / limit) * 100))

  return (
    <div className="rounded-2xl border border-border bg-surface-elevated p-4 mb-6">
      <p className="text-sm text-foreground mb-2">
        <span className="font-semibold">{used}</span> of{" "}
        <span className="font-semibold">{limit}</span> free generations used
        {remaining !== null && (
          <span className="text-muted-foreground"> ({remaining} remaining)</span>
        )}
      </p>
      <Progress value={pct} className="h-2 bg-border" />
    </div>
  )
}
