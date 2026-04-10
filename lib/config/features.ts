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
    generationLimit: 10 as number | null,
    resetPeriod: "hourly" as "never" | "daily" | "session" | "hourly",
  },

  premium: {
    enabled: false,
    teaserVisible: true,
  },
} as const
