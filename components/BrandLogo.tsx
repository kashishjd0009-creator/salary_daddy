import { cn } from "@/lib/utils"

export function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={cn("font-bold", className)}>
      <span className="text-primary">Salary</span>{" "}
      <span className="text-accent">Daddy</span>
    </span>
  )
}
