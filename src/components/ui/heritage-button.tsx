import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const heritageButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 active:scale-95",
        heritage: "bg-heritage-gradient text-white shadow-lg hover:shadow-xl animate-heritage-glow active:scale-95",
        temple: "bg-temple-gradient text-white shadow-lg hover:shadow-xl active:scale-95",
        sunrise: "bg-sunrise-gradient text-white shadow-lg hover:shadow-xl active:scale-95",
        outline: "border border-heritage-bronze text-heritage-bronze hover:bg-heritage-bronze hover:text-white",
        ghost: "text-heritage-bronze hover:bg-heritage-stone hover:text-heritage-bronze",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface HeritageButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof heritageButtonVariants> {
  asChild?: boolean
}

const HeritageButton = React.forwardRef<HTMLButtonElement, HeritageButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(heritageButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
HeritageButton.displayName = "HeritageButton"

export { HeritageButton, heritageButtonVariants }