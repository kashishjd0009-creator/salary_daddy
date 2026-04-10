"use client"

import { motion } from "framer-motion"
import { FEATURES } from "@/lib/config/features"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const WAITLIST_MAIL =
  process.env.NEXT_PUBLIC_WAITLIST_MAILTO ??
  "mailto:hello@salarydaddy.com?subject=SalaryDaddy%20Pro%20waitlist"

export function ProTeaser() {
  if (!FEATURES.premium.teaserVisible) return null

  return (
    <section id="pro" className="py-20 px-4 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl rounded-2xl border-2 border-accent/40 bg-surface p-8 md:p-10 shadow-lg"
      >
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-4 px-2 py-1 rounded-md bg-accent/10 border border-accent/30">
          Coming Soon
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Pro Mode — Deeper Negotiation, Better Outcomes
        </h2>
        <ul className="space-y-3 text-muted-foreground mb-8">
          <li className="flex gap-2">
            <span aria-hidden>🔒</span>
            Multi-scenario scripts (counter every objection)
          </li>
          <li className="flex gap-2">
            <span aria-hidden>🔒</span>
            Equity & bonus breakdown strategy
          </li>
          <li className="flex gap-2">
            <span aria-hidden>🔒</span>
            BATNA analysis and leverage mapping
          </li>
          <li className="flex gap-2">
            <span aria-hidden>🔒</span>
            Industry-specific compensation benchmarks
          </li>
        </ul>
        <a
          href={WAITLIST_MAIL}
          className={cn(
            buttonVariants({ size: "lg" }),
            "rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 inline-flex min-h-12"
          )}
        >
          Join the Waitlist
        </a>
      </motion.div>
    </section>
  )
}
