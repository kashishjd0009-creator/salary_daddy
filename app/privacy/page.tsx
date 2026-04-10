import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — SalaryDaddy",
  description: "How SalaryDaddy handles your data.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-16">
      <div className="mx-auto max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
        <Link
          href="/"
          className="text-primary text-sm font-medium hover:underline mb-8 inline-block"
        >
          ← Back home
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Last updated: April 10, 2026
        </p>

        <h2 className="text-xl font-semibold mt-10 text-foreground">
          Data we collect
        </h2>
        <p>
          SalaryDaddy does not store your form inputs on our servers. When you
          generate a script, your inputs are sent to Groq (third-party inference) solely to produce
          your negotiation content. We do not maintain a database of users or
          submissions.
        </p>

        <h2 className="text-xl font-semibold mt-8 text-foreground">
          Analytics
        </h2>
        <p>
          We do not enable third-party analytics by default. If we add
          analytics in the future, this policy will be updated.
        </p>

        <h2 className="text-xl font-semibold mt-8 text-foreground">
          Cookies & storage
        </h2>
        <p>
          We may use browser localStorage to track free-tier usage when limits
          are enabled. Advertisement providers, if enabled, may set their own
          cookies according to their policies.
        </p>

        <h2 className="text-xl font-semibold mt-8 text-foreground">
          Contact
        </h2>
        <p>
          Questions:{" "}
          <a
            href="mailto:hello@salarydaddy.com"
            className="text-primary hover:underline"
          >
            hello@salarydaddy.com
          </a>
        </p>
      </div>
    </div>
  )
}
