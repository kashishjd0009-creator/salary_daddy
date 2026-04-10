"use client"

import { motion } from "framer-motion"

const steps = [
  {
    emoji: "📝",
    title: "Fill the Form",
    body: "Enter your role, experience, current offer, and your goal.",
  },
  {
    emoji: "🤖",
    title: "AI Builds Your Script",
    body: "Groq runs Llama (or Mistral on Groq) to write a custom, word-for-word negotiation strategy.",
  },
  {
    emoji: "💰",
    title: "Walk In. Negotiate. Win.",
    body: "Use your script verbatim or adapt it freely.",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4 },
  }),
}

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 px-4 border-t border-border">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-[36px] font-bold text-center text-foreground mb-16"
        >
          How It Works
        </motion.h2>

        <div className="relative grid md:grid-cols-3 gap-12 md:gap-8">
          <div
            className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0 border-t border-dashed border-border"
            aria-hidden
          />
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeInUp}
              className="relative text-center md:text-left"
            >
              <div className="text-4xl mb-4">{s.emoji}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {s.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
