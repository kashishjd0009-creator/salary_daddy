"use client"

import { adProvider } from "@/lib/ads"
import { FEATURES } from "@/lib/config/features"
import type { AdPlacement } from "@/lib/ads/types"

interface Props {
  placement: AdPlacement
  className?: string
}

export function AdSlot({ placement, className }: Props) {
  if (!FEATURES.ads.enabled) return null
  return <>{adProvider.renderSlot({ placement, className })}</>
}
