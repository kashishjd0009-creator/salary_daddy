import Link from "next/link"
import { Hero } from "@/components/landing/Hero"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { SampleOutput } from "@/components/landing/SampleOutput"
import { ProTeaser } from "@/components/landing/ProTeaser"
import { Footer } from "@/components/landing/Footer"
import { buttonVariants } from "@/components/ui/button"
import { BrandLogo } from "@/components/BrandLogo"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-lg">
            <BrandLogo />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground hidden sm:inline"
            >
              Privacy
            </Link>
            <Link
              href="/tool"
              className={cn(
                buttonVariants({ size: "sm" }),
                "rounded-xl font-semibold bg-primary text-primary-foreground"
              )}
            >
              Open Tool
            </Link>
          </div>
        </div>
      </header>
      <Hero />
      <HowItWorks />
      <SampleOutput />
      <ProTeaser />
      <Footer />
    </div>
  )
}
