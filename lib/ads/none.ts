import type { AdProvider } from "./types"

export const NoneProvider: AdProvider = {
  renderSlot: () => null,
}
