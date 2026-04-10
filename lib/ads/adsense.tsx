import type { AdProvider, AdSlotProps } from "./types"
import { FEATURES } from "../config/features"

const SLOT_MAP: Record<string, string> = {
  "tool-sidebar": FEATURES.ads.placements.toolSidebar,
  "tool-below-output": FEATURES.ads.placements.toolBelowOutput,
}

export const AdSenseProvider: AdProvider = {
  renderSlot({ placement, className }: AdSlotProps) {
    const slotId = SLOT_MAP[placement]
    if (!slotId) return null
    return (
      <ins
        className={`adsbygoogle ${className ?? ""}`}
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    )
  },
}
