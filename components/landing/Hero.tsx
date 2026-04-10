"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.45 },
  }),
}

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center px-4 pt-24 pb-16 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(240,244,248,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240,244,248,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#111827] via-background to-[#030712]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
        >
          <span aria-hidden>✦</span>
          100% Free · No Sign-Up Required
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-4xl sm:text-5xl md:text-[56px] font-black tracking-tight leading-[1.1] md:leading-tight text-primary"
        >
          Stop Leaving Money On The Table.
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          SalaryDaddy generates your personalized salary negotiation script and
          email draft in seconds. Free, forever. Powered by AI.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center"
        >
          <Link
            href="/tool"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-xl px-8 py-6 text-base font-semibold bg-primary text-primary-foreground hover:scale-[1.02] transition-transform duration-200 h-auto min-h-12"
            )}
          >
            Generate My Script — Free →
          </Link>
          <a
            href="#sample"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-xl border-border bg-transparent hover:bg-white/5 h-auto py-6 px-8 min-h-12 text-center"
            )}
          >
            See a Sample
          </a>
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground"
        >
          <span>Used by 3,000+ professionals</span>
          <div className="flex -space-x-2" aria-hidden>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="size-9 rounded-full border-2 border-background bg-gradient-to-br from-primary/60 to-accent/50"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
