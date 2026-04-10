import { FEATURES } from "@/lib/config/features"

export function useFeatureFlags() {
  return {
    adsEnabled: FEATURES.ads.enabled,
    adsProvider: FEATURES.ads.provider,
    premiumEnabled: FEATURES.premium.enabled,
    teaserVisible: FEATURES.premium.teaserVisible,
    generationLimit: FEATURES.freeTier.generationLimit,
    resetPeriod: FEATURES.freeTier.resetPeriod,
  }
}
