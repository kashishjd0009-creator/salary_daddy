import { NoneProvider } from "./none"
import { AdSenseProvider } from "./adsense"
import { CarbonProvider } from "./carbon"
import { FEATURES } from "../config/features"

const providers = {
  none: NoneProvider,
  adsense: AdSenseProvider,
  carbon: CarbonProvider,
  custom: NoneProvider,
} as const

export const adProvider = providers[FEATURES.ads.provider]
