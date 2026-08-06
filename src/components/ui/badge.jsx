import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-orange-500 text-white shadow-xs hover:bg-orange-600",
        secondary:
          "border-transparent bg-orange-100 text-orange-700 hover:bg-orange-200/80",
        destructive:
          "border-transparent bg-red-500 text-white shadow-xs hover:bg-red-600",
        outline: "text-slate-950 border-slate-200",
        success: "border-transparent bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
