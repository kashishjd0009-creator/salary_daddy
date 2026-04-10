"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { FEATURES } from "@/lib/config/features"
import { PremiumForm } from "@/components/tool/premium/PremiumForm"
import type { GenerateRequestBody } from "@/lib/validators"
import {
  getCurrencyNarrowSymbol,
  SALARY_CURRENCY_OPTIONS,
} from "@/lib/currency"

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Marketing",
  "Legal",
  "Education",
  "Consulting",
  "Sales",
  "Design",
  "Engineering",
  "Other",
] as const

const COMPANY_SIZES = [
  "Startup (<50)",
  "Small (50–200)",
  "Mid-size (200–1,000)",
  "Large (1,000–5,000)",
  "Enterprise (5,000+)",
] as const

const LOADING_MESSAGES = [
  "Analyzing your position...",
  "Crafting your opening...",
  "Handling objections...",
  "Writing your email...",
] as const

export type NegotiationFormValues = GenerateRequestBody

function pickTotalYears(
  initial: Partial<NegotiationFormValues> | undefined,
  fallback: number
): number {
  if (!initial) return fallback
  const legacy = initial as Partial<
    NegotiationFormValues & { experience?: number }
  >
  return (
    legacy.totalYearsExperience ?? legacy.experience ?? fallback
  )
}

const defaultValues: NegotiationFormValues = {
  negotiationContext: "new_offer",
  jobTitle: "",
  industry: "Technology",
  totalYearsExperience: 5,
  yearsAtCompany: 2,
  location: "",
  currency: "USD",
  salaryPeriod: "annual",
  currentOffer: 0,
  targetSalary: 0,
  companyName: "",
  companySize: "Mid-size (200–1,000)",
  achievements: "",
  competingOffer: "",
  tone: "professional",
  generateScript: true,
  generateEmail: true,
}

interface Props {
  onSubmit: (data: GenerateRequestBody) => void | Promise<void>
  isLoading: boolean
  initialValues?: Partial<NegotiationFormValues>
  serverError?: string | null
  disabled?: boolean
}

export function NegotiationForm({
  onSubmit,
  isLoading,
  initialValues,
  serverError,
  disabled = false,
}: Props) {
  const [values, setValues] = useState<NegotiationFormValues>(() => {
    const { experience: _legacyExperience, ...restInitial } = (
      initialValues ?? {}
    ) as Partial<NegotiationFormValues> & { experience?: number }
    return {
      ...defaultValues,
      ...restInitial,
      negotiationContext:
        restInitial.negotiationContext ?? defaultValues.negotiationContext,
      totalYearsExperience: pickTotalYears(
        initialValues,
        defaultValues.totalYearsExperience
      ),
      yearsAtCompany:
        restInitial.yearsAtCompany ?? defaultValues.yearsAtCompany,
      currency: restInitial.currency ?? defaultValues.currency,
      salaryPeriod: restInitial.salaryPeriod ?? defaultValues.salaryPeriod,
    }
  })
  const isInternalAppraisal = values.negotiationContext === "internal_appraisal"
  const currencySymbol = getCurrencyNarrowSymbol(values.currency)
  const amountInputPadClass =
    currencySymbol.length > 1 ? "pl-10" : "pl-7"
  const [competingOn, setCompetingOn] = useState(() =>
    Boolean(initialValues?.competingOffer?.trim())
  )
  const [msgIdx, setMsgIdx] = useState(0)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!isLoading) {
      setMsgIdx(0)
      return
    }
    const t = setInterval(() => {
      setMsgIdx((i) => (i + 1) % LOADING_MESSAGES.length)
    }, 2000)
    return () => clearInterval(t)
  }, [isLoading])

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!values.jobTitle.trim()) e.jobTitle = "Required"
    if (values.totalYearsExperience < 1 || values.totalYearsExperience > 40)
      e.totalYearsExperience = "Enter 1–40"
    if (
      isInternalAppraisal &&
      (!values.yearsAtCompany ||
        values.yearsAtCompany < 1 ||
        values.yearsAtCompany > 60)
    )
      e.yearsAtCompany = "Enter 1–60"
    if (!values.location.trim()) e.location = "Required"
    if (values.currentOffer <= 0) e.currentOffer = "Must be greater than 0"
    if (values.targetSalary <= values.currentOffer)
      e.targetSalary = isInternalAppraisal
        ? "Must be greater than your current salary"
        : "Must be greater than current offer"
    if (values.achievements.trim().length < 20)
      e.achievements = "At least 20 characters"
    if (!values.generateScript && !values.generateEmail)
      e.outputs = "Select at least one output"
    if (competingOn && (values.competingOffer?.length ?? 0) > 300)
      e.competingOffer = "Max 300 characters"
    setFieldErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (disabled) return
    if (!validate()) return
    const payload: GenerateRequestBody = {
      ...values,
      yearsAtCompany:
        values.negotiationContext === "internal_appraisal"
          ? values.yearsAtCompany
          : undefined,
      competingOffer: competingOn ? values.competingOffer?.trim() : undefined,
      companyName: values.companyName?.trim() || undefined,
    }
    await onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {serverError && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {serverError}
        </div>
      )}

      <section className="space-y-4">
        <h2 className="text-muted-foreground uppercase tracking-[0.06em] text-xs font-medium">
          Your Situation
        </h2>
        <div className="space-y-2">
          <Label id="negotiation-context-label">What are you negotiating?</Label>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            role="group"
            aria-labelledby="negotiation-context-label"
          >
            <Button
              type="button"
              variant={
                values.negotiationContext === "new_offer" ? "default" : "outline"
              }
              size="lg"
              className="rounded-xl justify-center text-center h-auto min-h-[3rem] py-3 px-4 whitespace-normal"
              onClick={() =>
                setValues((v) => ({ ...v, negotiationContext: "new_offer" }))
              }
              disabled={isLoading || disabled}
            >
              New job offer
              <span className="block text-xs font-normal opacity-90 mt-1">
                A company I don&apos;t work for yet
              </span>
            </Button>
            <Button
              type="button"
              variant={
                values.negotiationContext === "internal_appraisal"
                  ? "default"
                  : "outline"
              }
              size="lg"
              className="rounded-xl justify-center text-center h-auto min-h-[3rem] py-3 px-4 whitespace-normal"
              onClick={() =>
                setValues((v) => ({
                  ...v,
                  negotiationContext: "internal_appraisal",
                }))
              }
              disabled={isLoading || disabled}
            >
              Raise at my current job
              <span className="block text-xs font-normal opacity-90 mt-1">
                Appraisal, review, or comp discussion
              </span>
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title / Role</Label>
          <Input
            id="jobTitle"
            maxLength={100}
            value={values.jobTitle}
            onChange={(e) =>
              setValues((v) => ({ ...v, jobTitle: e.target.value }))
            }
            className="bg-surface-elevated border-border rounded-xl"
            disabled={isLoading || disabled}
          />
          {fieldErrors.jobTitle && (
            <p className="text-xs text-destructive">{fieldErrors.jobTitle}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Industry</Label>
          <Select
            value={values.industry}
            onValueChange={(industry) => {
              if (industry) setValues((v) => ({ ...v, industry }))
            }}
            disabled={isLoading || disabled}
          >
            <SelectTrigger className="bg-surface-elevated border-border rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((i) => (
                <SelectItem key={i} value={i}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="totalYearsExperience">
            Total years of experience
          </Label>
          <p className="text-xs text-muted-foreground">
            Your full career in this field or role type (all employers combined).
          </p>
          <Input
            id="totalYearsExperience"
            type="number"
            min={1}
            max={40}
            value={values.totalYearsExperience || ""}
            onChange={(e) =>
              setValues((v) => ({
                ...v,
                totalYearsExperience: Number.parseInt(e.target.value, 10) || 0,
              }))
            }
            className="bg-surface-elevated border-border rounded-xl"
            disabled={isLoading || disabled}
          />
          {fieldErrors.totalYearsExperience && (
            <p className="text-xs text-destructive">
              {fieldErrors.totalYearsExperience}
            </p>
          )}
        </div>
        {isInternalAppraisal && (
          <div className="space-y-2">
            <Label htmlFor="yearsAtCompany">Years at this company</Label>
            <p className="text-xs text-muted-foreground">
              How long you&apos;ve been employed here — used for your internal
              raise or appraisal story.
            </p>
            <Input
              id="yearsAtCompany"
              type="number"
              min={1}
              max={60}
              value={values.yearsAtCompany || ""}
              onChange={(e) =>
                setValues((v) => ({
                  ...v,
                  yearsAtCompany: Number.parseInt(e.target.value, 10) || 0,
                }))
              }
              className="bg-surface-elevated border-border rounded-xl"
              disabled={isLoading || disabled}
            />
            {fieldErrors.yearsAtCompany && (
              <p className="text-xs text-destructive">
                {fieldErrors.yearsAtCompany}
              </p>
            )}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="location">Country / Region</Label>
          <Input
            id="location"
            maxLength={100}
            value={values.location}
            onChange={(e) =>
              setValues((v) => ({ ...v, location: e.target.value }))
            }
            className="bg-surface-elevated border-border rounded-xl"
            disabled={isLoading || disabled}
          />
          {fieldErrors.location && (
            <p className="text-xs text-destructive">{fieldErrors.location}</p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-muted-foreground uppercase tracking-[0.06em] text-xs font-medium">
          The Numbers
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Choose currency and whether amounts are monthly or annual. Both salary
          fields use the same basis — the model will not convert between them.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select
              value={values.currency}
              onValueChange={(currency) => {
                if (currency)
                  setValues((v) => ({
                    ...v,
                    currency: currency as NegotiationFormValues["currency"],
                  }))
              }}
              disabled={isLoading || disabled}
            >
              <SelectTrigger className="bg-surface-elevated border-border rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[min(60vh,320px)]">
                {SALARY_CURRENCY_OPTIONS.map(({ code, label }) => (
                  <SelectItem key={code} value={code}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Pay period</Label>
            <Select
              value={values.salaryPeriod}
              onValueChange={(salaryPeriod) => {
                if (salaryPeriod)
                  setValues((v) => ({
                    ...v,
                    salaryPeriod: salaryPeriod as NegotiationFormValues["salaryPeriod"],
                  }))
              }}
              disabled={isLoading || disabled}
            >
              <SelectTrigger className="bg-surface-elevated border-border rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">Annual (per year)</SelectItem>
                <SelectItem value="monthly">Monthly (per month)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="text-xs text-muted-foreground" aria-live="polite">
          Amounts below are{" "}
          {values.salaryPeriod === "annual"
            ? "per year (annual)"
            : "per month (monthly)"}{" "}
          in {values.currency}.
        </p>
        <div className="space-y-2">
          <Label htmlFor="currentOffer">
            {isInternalAppraisal
              ? `Your current base salary (${
                  values.salaryPeriod === "annual" ? "annual" : "monthly"
                })`
              : `Current offer (base salary, ${
                  values.salaryPeriod === "annual" ? "annual" : "monthly"
                })`}
          </Label>
          <div className="relative">
            <span
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 min-w-[1.25rem] text-muted-foreground tabular-nums"
              aria-hidden
            >
              {currencySymbol}
            </span>
            <Input
              id="currentOffer"
              type="number"
              min={1}
              step="any"
              className={`${amountInputPadClass} bg-surface-elevated border-border rounded-xl`}
              value={values.currentOffer || ""}
              onChange={(e) =>
                setValues((v) => ({
                  ...v,
                  currentOffer: Number.parseFloat(e.target.value) || 0,
                }))
              }
              disabled={isLoading || disabled}
            />
          </div>
          {fieldErrors.currentOffer && (
            <p className="text-xs text-destructive">
              {fieldErrors.currentOffer}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="targetSalary">
            {isInternalAppraisal
              ? `Target salary you want (${
                  values.salaryPeriod === "annual" ? "annual" : "monthly"
                })`
              : `Your target salary (${
                  values.salaryPeriod === "annual" ? "annual" : "monthly"
                })`}
          </Label>
          <div className="relative">
            <span
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 min-w-[1.25rem] text-muted-foreground tabular-nums"
              aria-hidden
            >
              {currencySymbol}
            </span>
            <Input
              id="targetSalary"
              type="number"
              min={1}
              step="any"
              className={`${amountInputPadClass} bg-surface-elevated border-border rounded-xl`}
              value={values.targetSalary || ""}
              onChange={(e) =>
                setValues((v) => ({
                  ...v,
                  targetSalary: Number.parseFloat(e.target.value) || 0,
                }))
              }
              disabled={isLoading || disabled}
            />
          </div>
          {fieldErrors.targetSalary && (
            <p className="text-xs text-destructive">
              {fieldErrors.targetSalary}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">
            {isInternalAppraisal
              ? "Employer name (optional)"
              : "Company name (optional)"}
          </Label>
          <Input
            id="companyName"
            maxLength={100}
            value={values.companyName ?? ""}
            onChange={(e) =>
              setValues((v) => ({ ...v, companyName: e.target.value }))
            }
            className="bg-surface-elevated border-border rounded-xl"
            disabled={isLoading || disabled}
          />
        </div>
        <div className="space-y-2">
          <Label>Company Size</Label>
          <Select
            value={values.companySize}
            onValueChange={(companySize) => {
              if (companySize) setValues((v) => ({ ...v, companySize }))
            }}
            disabled={isLoading || disabled}
          >
            <SelectTrigger className="bg-surface-elevated border-border rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COMPANY_SIZES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-muted-foreground uppercase tracking-[0.06em] text-xs font-medium">
          Your Edge
        </h2>
        <div className="space-y-2">
          <Label htmlFor="achievements">Key Achievements & Skills</Label>
          <Textarea
            id="achievements"
            rows={5}
            maxLength={1000}
            placeholder="e.g. Led a team of 8 engineers, launched a feature that grew MRR by 23%, AWS certified, reduced infrastructure costs by $40k/year..."
            value={values.achievements}
            onChange={(e) =>
              setValues((v) => ({ ...v, achievements: e.target.value }))
            }
            className="bg-surface-elevated border-border rounded-xl resize-y min-h-[120px]"
            disabled={isLoading || disabled}
          />
          {fieldErrors.achievements && (
            <p className="text-xs text-destructive">
              {fieldErrors.achievements}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface-elevated px-4 py-3">
          <Label htmlFor="competing" className="cursor-pointer">
            Competing Offers?
          </Label>
          <Switch
            id="competing"
            checked={competingOn}
            onCheckedChange={setCompetingOn}
            disabled={isLoading || disabled}
            aria-label={
              competingOn
                ? "Competing offers: on"
                : "Competing offers: off"
            }
          />
        </div>
        {competingOn && (
          <div className="space-y-2">
            <Label htmlFor="competingOffer">Describe the competing offer</Label>
            <Input
              id="competingOffer"
              maxLength={300}
              value={values.competingOffer ?? ""}
              onChange={(e) =>
                setValues((v) => ({ ...v, competingOffer: e.target.value }))
              }
              className="bg-surface-elevated border-border rounded-xl"
              disabled={isLoading || disabled}
            />
            {fieldErrors.competingOffer && (
              <p className="text-xs text-destructive">
                {fieldErrors.competingOffer}
              </p>
            )}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-muted-foreground uppercase tracking-[0.06em] text-xs font-medium">
          Output Preferences
        </h2>
        <div className="space-y-2">
          <Label>Tone</Label>
          <div className="flex flex-wrap gap-2">
            {(
              ["professional", "assertive", "collaborative"] as const
            ).map((tone) => (
              <Button
                key={tone}
                type="button"
                variant={values.tone === tone ? "default" : "outline"}
                size="lg"
                className="rounded-xl capitalize flex-1 min-w-[120px]"
                onClick={() => setValues((v) => ({ ...v, tone }))}
                disabled={isLoading || disabled}
              >
                {tone}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <Label>What to generate</Label>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={values.generateScript}
                onCheckedChange={(c) =>
                  setValues((v) => ({
                    ...v,
                    generateScript: c === true,
                  }))
                }
                disabled={isLoading || disabled}
              />
              Negotiation Script
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={values.generateEmail}
                onCheckedChange={(c) =>
                  setValues((v) => ({
                    ...v,
                    generateEmail: c === true,
                  }))
                }
                disabled={isLoading || disabled}
              />
              Email Draft
            </label>
          </div>
          {fieldErrors.outputs && (
            <p className="text-xs text-destructive">{fieldErrors.outputs}</p>
          )}
        </div>
      </section>

      {FEATURES.premium.enabled && <PremiumForm />}

      <div className="space-y-3">
        <Button
          type="submit"
          size="lg"
          disabled={isLoading || disabled}
          className="w-full md:w-auto rounded-xl px-8 py-6 text-base font-semibold bg-primary text-primary-foreground hover:scale-[1.02] transition-transform duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Generating…
            </>
          ) : (
            "Generate My Script →"
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          ⚡ Powered by Groq (free-tier Llama) · ~10 seconds · 100% Free
        </p>
        <p className="text-xs text-muted-foreground">
          Your data is sent to Groq for inference only. Nothing is stored on our servers.
        </p>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-border bg-surface p-6 space-y-3 animate-pulse">
          <div className="h-3 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-5/6" />
          <p className="text-sm text-muted-foreground pt-2">
            {LOADING_MESSAGES[msgIdx % LOADING_MESSAGES.length]}
          </p>
        </div>
      )}
    </form>
  )
}
