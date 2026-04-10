import type { SalaryCurrencyCode, SalaryPeriod } from "../currency"

export type NegotiationContext = "new_offer" | "internal_appraisal"

export interface ScriptGenerationInput {
  negotiationContext: NegotiationContext
  jobTitle: string
  industry: string
  totalYearsExperience: number
  /** Years employed at the current company; required for internal appraisal flows */
  yearsAtCompany?: number
  location: string
  currency: SalaryCurrencyCode
  salaryPeriod: SalaryPeriod
  currentOffer: number
  targetSalary: number
  companyName?: string
  companySize: string
  achievements: string
  competingOffer?: string
  tone: "professional" | "assertive" | "collaborative"
  generateScript: boolean
  generateEmail: boolean
}

export interface AIProvider {
  generateScript(input: ScriptGenerationInput): Promise<Response>
}
