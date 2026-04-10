/** ISO 4217 codes supported in the salary form (expand as needed). */
export const SALARY_CURRENCY_CODES = [
  "USD",
  "EUR",
  "GBP",
  "INR",
  "JPY",
  "CAD",
  "AUD",
  "CHF",
  "CNY",
  "SEK",
  "NOK",
  "DKK",
  "PLN",
  "BRL",
  "MXN",
  "SGD",
  "HKD",
  "NZD",
  "ZAR",
  "KRW",
  "AED",
  "SAR",
  "TRY",
  "THB",
  "IDR",
  "MYR",
  "PHP",
] as const

export type SalaryCurrencyCode = (typeof SALARY_CURRENCY_CODES)[number]

export type SalaryPeriod = "annual" | "monthly"

export const SALARY_CURRENCY_OPTIONS: { code: SalaryCurrencyCode; label: string }[] =
  SALARY_CURRENCY_CODES.map((code) => ({
    code,
    label: `${code} — ${currencyEnglishName(code)}`,
  }))

function currencyEnglishName(code: SalaryCurrencyCode): string {
  const names: Partial<Record<SalaryCurrencyCode, string>> = {
    USD: "US Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    INR: "Indian Rupee",
    JPY: "Japanese Yen",
    CAD: "Canadian Dollar",
    AUD: "Australian Dollar",
    CHF: "Swiss Franc",
    CNY: "Chinese Yuan",
    SEK: "Swedish Krona",
    NOK: "Norwegian Krone",
    DKK: "Danish Krone",
    PLN: "Polish Złoty",
    BRL: "Brazilian Real",
    MXN: "Mexican Peso",
    SGD: "Singapore Dollar",
    HKD: "Hong Kong Dollar",
    NZD: "New Zealand Dollar",
    ZAR: "South African Rand",
    KRW: "South Korean Won",
    AED: "UAE Dirham",
    SAR: "Saudi Riyal",
    TRY: "Turkish Lira",
    THB: "Thai Baht",
    IDR: "Indonesian Rupiah",
    MYR: "Malaysian Ringgit",
    PHP: "Philippine Peso",
  }
  return names[code] ?? code
}

export function getCurrencyNarrowSymbol(currencyCode: string): string {
  try {
    const parts = new Intl.NumberFormat("en", {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
    }).formatToParts(0)
    return parts.find((p) => p.type === "currency")?.value ?? currencyCode
  } catch {
    return currencyCode
  }
}

export function formatMoneyAmount(
  amount: number,
  currencyCode: string
): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: currencyCode === "JPY" ? 0 : 0,
      minimumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${amount} ${currencyCode}`
  }
}

export function salaryPeriodLabel(period: SalaryPeriod): string {
  return period === "annual" ? "per year (annual)" : "per month (monthly)"
}

export function salaryPeriodShort(period: SalaryPeriod): string {
  return period === "annual" ? "year" : "month"
}
