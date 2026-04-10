import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service — SalaryDaddy",
  description: "Terms for using SalaryDaddy.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-16">
      <div className="mx-auto max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
        <Link
          href="/"
          className="text-primary text-sm font-medium hover:underline mb-8 inline-block"
        >
          ← Back home
        </Link>
        <h1 className="text-3xl font-bold text-foreground">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Last updated: April 10, 2026
        </p>

        <h2 className="text-xl font-semibold mt-10 text-foreground">
          Use of the service
        </h2>
        <p>
          SalaryDaddy is provided free of charge for personal, non-commercial
          use. You agree not to misuse the service, attempt to circumvent rate
          limits, or use generated content for unlawful purposes.
        </p>

        <h2 className="text-xl font-semibold mt-8 text-foreground">
          Not professional advice
        </h2>
        <p>
          Generated scripts and emails are informational tools only. They are
          not legal, financial, or career coaching advice. You are solely
          responsible for how you use them in real negotiations.
        </p>

        <h2 className="text-xl font-semibold mt-8 text-foreground">
          Limitation of liability
        </h2>
        <p>
          SalaryDaddy and its operators are not liable for any outcomes of your
          salary negotiations, employment decisions, or reliance on AI-generated
          content. The service is provided &quot;as is&quot; without warranties
          of any kind.
        </p>

        <h2 className="text-xl font-semibold mt-8 text-foreground">
          Changes
        </h2>
        <p>
          We may update these terms from time to time. Continued use of the site
          after changes constitutes acceptance of the updated terms.
        </p>
      </div>
    </div>
  )
}
