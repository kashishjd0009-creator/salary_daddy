import type { ReactNode } from "react"

export type AdPlacement = "tool-sidebar" | "tool-below-output"

export interface AdSlotProps {
  placement: AdPlacement
  className?: string
}

export interface AdProvider {
  renderSlot(props: AdSlotProps): ReactNode
}
