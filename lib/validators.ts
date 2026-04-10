import { z } from "zod"
import { SALARY_CURRENCY_CODES } from "./currency"

export const generateRequestSchema = z.object({
  negotiationContext: z.enum(["new_offer", "internal_appraisal"]),
  jobTitle: z.string().min(1).max(100),
  industry: z.string().min(1),
  totalYearsExperience: z.number().int().min(1).max(40),
  yearsAtCompany: z.number().int().min(1).max(60).optional(),
  location: z.string().min(1).max(100),
  currency: z.enum(SALARY_CURRENCY_CODES),
  salaryPeriod: z.enum(["monthly", "annual"]),
  currentOffer: z.number().positive(),
  targetSalary: z.number().positive(),
  companyName: z.string().max(100).optional(),
  companySize: z.string().min(1),
  achievements: z.string().min(20).max(1000),
  competingOffer: z.string().max(300).optional(),
  tone: z.enum(["professional", "assertive", "collaborative"]),
  generateScript: z.boolean(),
  generateEmail: z.boolean(),
})
  .refine(
    (data) =>
      data.negotiationContext !== "internal_appraisal" ||
      (data.yearsAtCompany != null &&
        data.yearsAtCompany >= 1 &&
        data.yearsAtCompany <= 60),
    {
      message: "Enter how many years you've been with this company (1–60)",
      path: ["yearsAtCompany"],
    }
  )
  .refine((data) => data.targetSalary > data.currentOffer, {
  message: "Target must be greater than your current figure",
  path: ["targetSalary"],
}).refine((data) => data.generateScript || data.generateEmail, {
  message: "Select at least one output type",
  path: ["generateScript"],
})

export type GenerateRequestBody = z.infer<typeof generateRequestSchema>
