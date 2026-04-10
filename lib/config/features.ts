export const FEATURES = {
  ads: {
    enabled: true,
    provider: "none" as "none" | "adsense" | "carbon" | "custom",
    placements: {
      toolSidebar: process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR ?? "",
      toolBelowOutput: process.env.NEXT_PUBLIC_AD_SLOT_BELOW_OUTPUT ?? "",
    },
  },

  freeTier: {
    generationLimit: null as number | null,
    resetPeriod: "never" as "never" | "daily" | "session",
  },

  premium: {
    enabled: false,
    teaserVisible: true,
  },
} as const
