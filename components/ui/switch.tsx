"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

/** Tailwind v3 needs `data-[checked]:` / `data-[unchecked]:`; `data-checked:` generates no CSS. */
function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 outline-none transition-[background-color,border-color,box-shadow] duration-200",
        "after:absolute after:-inset-x-3 after:-inset-y-2",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "aria-invalid:border-destructive",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        // OFF
        "data-[unchecked]:border-muted-foreground data-[unchecked]:bg-zinc-950",
        "data-[unchecked]:shadow-[inset_0_2px_4px_rgba(0,0,0,0.45)]",
        // ON — full mint track (impossible to miss vs OFF)
        "data-[checked]:border-[#00c896] data-[checked]:bg-[#00c896]",
        "data-[checked]:shadow-[0_0_18px_-2px_rgba(0,200,150,0.65)]",
        size === "default" && "h-8 w-[3.25rem] px-0.5",
        size === "sm" && "h-6 w-11 px-0.5",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full shadow-md ring-2 ring-black/30 transition-transform duration-200 ease-out",
          "data-[unchecked]:translate-x-0.5 data-[unchecked]:bg-white",
          "data-[checked]:translate-x-[1.75rem] data-[checked]:bg-[#09101f] data-[checked]:ring-[#09101f]/50",
          size === "default" && "size-5",
          size === "sm" &&
            "size-[1.05rem] data-[unchecked]:translate-x-0 data-[checked]:translate-x-[1.2rem]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
