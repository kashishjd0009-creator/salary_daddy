"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const scriptSample = `### Opening Statement
I'm thrilled about the team and the product direction. I wanted to discuss the offer — based on my experience shipping growth initiatives and leading cross-functional launches, I'm hoping we can align on base compensation.

### Anchor Your Number
I'm looking for 128,000 USD per year. That reflects comparable roles in mid-size tech and the impact I've had on revenue and reliability in my last two roles.

### The Close
What would you need from me this week to see if we can close the gap?`

const emailSample = `Subject: Software Engineer offer — compensation discussion

Hi Jordan,

Thank you for the Software Engineer offer — I'm genuinely excited about the roadmap.

I'd like to discuss base salary. Given my five years building systems that scaled with the business and my recent certifications, I'm targeting 128,000 USD per year. I'm flexible on structure if that helps on your side.

Could we find 20 minutes this week to align?

Best,
Alex`

function BlurredPreview({
  title,
  body,
}: {
  title: string
  body: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-lg relative overflow-hidden min-h-[300px] flex flex-col">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        {title}
      </h3>
      <pre className="text-sm text-foreground/90 whitespace-pre-wrap font-sans leading-relaxed flex-1">
        {body.split("\n").slice(0, 6).join("\n")}
        {"\n…"}
      </pre>
      <div
        className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-surface via-surface/90 to-transparent pointer-events-none backdrop-blur-[2px]"
        aria-hidden
      />
    </div>
  )
}

export function SampleOutput() {
  return (
    <section id="sample" className="py-20 md:py-28 px-4 scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-[36px] font-bold text-center text-foreground mb-4"
        >
          Here&apos;s What You Get
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mb-12 max-w-xl mx-auto"
        >
          New offer / appraisal · Software Engineer · 5 years · 110k USD/yr
          offer · targeting 128k USD/yr · mid-size tech company
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          <BlurredPreview title="Negotiation Script" body={scriptSample} />
          <BlurredPreview title="Email Draft" body={emailSample} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/tool"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-xl px-8 font-semibold bg-primary text-primary-foreground hover:scale-[1.02] transition-transform duration-200 min-h-12"
            )}
          >
            Try It Free →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
