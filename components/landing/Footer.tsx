import Link from "next/link"
import { BrandLogo } from "@/components/BrandLogo"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 bg-surface/50">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row gap-8 md:items-start md:justify-between">
        <div>
          <div className="text-lg">
            <BrandLogo />
          </div>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            Know your worth. Own the conversation.
          </p>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <span className="text-border" aria-hidden>
            |
          </span>
          <Link href="/terms" className="hover:text-foreground">
            Terms of Service
          </Link>
          <span className="text-border" aria-hidden>
            |
          </span>
          <a
            href="mailto:hello@salarydaddy.com"
            className="hover:text-foreground"
          >
            Contact
          </a>
        </nav>
      </div>
      <p className="mx-auto max-w-5xl text-center md:text-left text-xs text-muted-foreground mt-10">
        © {new Date().getFullYear()} SalaryDaddy. Know your worth. Own the
        conversation.
      </p>
    </footer>
  )
}
