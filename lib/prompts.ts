import type { ScriptGenerationInput } from "./ai/types"
import {
  formatMoneyAmount,
  salaryPeriodLabel,
} from "./currency"

function scriptOutline(context: ScriptGenerationInput["negotiationContext"]): string {
  if (context === "internal_appraisal") {
    return `
## NEGOTIATION SCRIPT

### Opening Statement
[2–3 sentences: frame this as an existing employee seeking alignment on compensation — e.g. review cycle, 1:1, or dedicated comp discussion. Warm, factual, not entitled.]

### Make Your Case
[Tie compensation to expanded scope, impact, tenure, skills gained, and market context. State the target clearly in natural speech.]

### Handle "Not Now" / "Budget Is Tight"
[Word-for-word response — acknowledges company constraints; asks for timeline, interim recognition, or metrics for a future adjustment.]

### Handle "You're Already at the Top of the Range"
[Word-for-word response — explores scope/title change, equity/bonus, or defined path if base is capped.]

### The Close
[Clear next step: follow-up email, HR process, date to revisit, or documented goals.]
`
  }

  return `
## NEGOTIATION SCRIPT

### Opening Statement
[2–3 sentences to open the conversation with confidence and gratitude]

### Anchor Your Number
[State the ask clearly with specific rationale tied to their achievements and market value]

### Handle "That's Our Best Offer"
[Word-for-word response — confident, not defensive]

### Handle "We Don't Have Budget"
[Word-for-word response — acknowledges constraint, pivots to alternatives]

### The Close
[How to land the agreement or create a clear next step]
`
}

export function buildPrompt(input: ScriptGenerationInput): string {
  const gap = input.targetSalary - input.currentOffer
  const pct = Math.round((gap / input.currentOffer) * 100)
  const basis = salaryPeriodLabel(input.salaryPeriod)
  const cur = input.currency
  const isInternal = input.negotiationContext === "internal_appraisal"

  const curFmt = (n: number) => formatMoneyAmount(n, cur)

  const scenarioLine = isInternal
    ? `SCENARIO: INTERNAL SALARY REVIEW — The user is already employed at this company and is discussing a raise, appraisal outcome, or compensation adjustment with their manager and/or HR. Do NOT write as if they are replying to a new job offer, deciding whether to join, or negotiating an external offer letter. Avoid "thank you for the offer" unless they explicitly said they received a written adjustment offer. Frame language around performance, scope, retention, and fair alignment with market and contribution.`
    : `SCENARIO: NEW EMPLOYER OFFER — The user is negotiating compensation for a role at a company they do not yet work for (offer letter or verbal offer stage). Use language appropriate to a hiring manager / recruiter conversation and offer response.`

  const currentPayLine = isInternal
    ? `CURRENT BASE SALARY: ${curFmt(input.currentOffer)} (${basis}) — what they earn today in this role`
    : `CURRENT OFFER (BASE): ${curFmt(input.currentOffer)} (${basis}) — amount on the table from the prospective employer`

  const targetLine = isInternal
    ? `TARGET COMPENSATION: ${curFmt(input.targetSalary)} (${basis}) — what they are asking for after this discussion or review cycle`
    : `TARGET COMPENSATION: ${curFmt(input.targetSalary)} (${basis})`

  const gapLine = isInternal
    ? `REQUESTED INCREASE: ${curFmt(gap)} (${pct}% above current base) — same currency and same pay basis (${basis})`
    : `ASK INCREASE: ${curFmt(gap)} (${pct}% above current offer) — same currency and same pay basis (${basis})`

  const audienceLine = isInternal
    ? `AUDIENCE: Current manager, skip-level, and/or internal HR — maintain relationship and professionalism; this is an ongoing employment relationship.`
    : `AUDIENCE: Hiring manager, recruiter, or HR at a prospective employer.`

  const competingRule = isInternal
    ? `- If a competing offer is provided, the user may mention external market interest carefully as one signal — not as an ultimatum unless tone is assertive. Prefer framing as market data unless competing offer text suggests otherwise.`
    : `- Use the competing offer as leverage only if provided.`

  const emailBodyInstruction = isInternal
    ? `[Professional email to a current manager or HR: 3–4 paragraphs. References ongoing role, concrete contributions, and a specific compensation target in ${cur} (${basis}). Appropriate for a review or comp discussion — not a job offer reply. Warm, confident, closes with a clear call to action.]`
    : `[Professional email, 3–4 paragraphs. References role, achievements, and specific ask in ${cur} (${basis}). Warm, confident, closes with a clear call to action.]`

  return `
You are a world-class career coach and salary negotiation expert. You write precise, confident, empathetic negotiation content that professionals can use word-for-word.

Generate a personalized salary negotiation package for this professional:

${scenarioLine}
${audienceLine}
ROLE: ${input.jobTitle}
INDUSTRY: ${input.industry}
TOTAL CAREER EXPERIENCE: ${input.totalYearsExperience} years — total relevant professional experience in the field (across employers). For internal reviews, this is NOT the same as tenure at the current company.
${
  isInternal && input.yearsAtCompany != null
    ? `TENURE AT THIS COMPANY: ${input.yearsAtCompany} year${input.yearsAtCompany === 1 ? "" : "s"} — time employed with this employer; use for loyalty, internal growth, and role evolution. Do not substitute total career years for tenure or vice versa.`
    : ""
}
LOCATION: ${input.location}
COMPENSATION CURRENCY: ${cur} — use this currency only; do not switch to USD or other currencies unless the candidate does in context.
PAY BASIS: All compensation figures below are ${basis}. Do not treat monthly amounts as annual or vice versa.
${currentPayLine}
${targetLine}
${gapLine}
COMPANY: ${input.companyName ?? "the company"}
COMPANY SIZE: ${input.companySize}
KEY ACHIEVEMENTS: ${input.achievements}
COMPETING OFFER / EXTERNAL BENCHMARK: ${input.competingOffer ?? "None mentioned"}
TONE: ${input.tone}
  (professional = warm but firm | assertive = confident and direct | collaborative = partnership language)

RULES:
- Reference their specific achievements directly. Never write generic scripts.
- Every line must be something they can say or send verbatim.
${competingRule}
- The requested change is ${pct}% above their current figure — calibrate confidence accordingly.
- When stating numbers in the script or email, always use ${cur} and make clear they are ${basis} (e.g. "${curFmt(input.targetSalary)} per ${input.salaryPeriod === "annual" ? "year" : "month"}" or equivalent natural phrasing).
- Match the scenario (${isInternal ? "internal review" : "new offer"}) in every paragraph — wrong framing (e.g. offer-thank-you language for an internal review) is a failure.
${
  isInternal
    ? `- When citing seniority, reference BOTH total career experience (${input.totalYearsExperience} yr) and tenure at this company (${input.yearsAtCompany} yr) where appropriate — tenure grounds the internal case; total career supports market-level expectations.`
    : `- Calibrate credibility using their ${input.totalYearsExperience} years of total professional experience.`
}

${
  input.generateScript
    ? scriptOutline(input.negotiationContext)
    : ""
}

${
  input.generateEmail
    ? `
## EMAIL DRAFT

SUBJECT: [subject line appropriate to the scenario — ${isInternal ? "review / compensation discussion" : "offer / compensation"}]

BODY:
${emailBodyInstruction}
`
    : ""
}

Output ONLY the sections above. No preamble. No meta-commentary. No sign-off notes.
`.trim()
}
