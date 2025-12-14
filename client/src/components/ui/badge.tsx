import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const difficultyColors = {
  beginner:
    "bg-sky-50 text-sky-700 dark:text-sky-200 border border-sky-100 dark:border-0 dark:bg-slate-900/80",
  intermediate:
    "bg-emerald-50 text-emerald-700 dark:text-emerald-200 border border-emerald-100 dark:border-0 dark:bg-slate-900/80",
  advanced:
    "bg-amber-50 text-amber-700 dark:text-amber-200 border border-amber-100 dark:border-0 dark:bg-slate-900/80",
  expert:
    "bg-rose-50 text-rose-700 dark:text-rose-200 border border-rose-100 dark:border-0 dark:bg-slate-900/80",
};

const quizTypeColors = {
  "multiple choice":
    "bg-indigo-50 text-indigo-700 dark:text-indigo-200 border border-indigo-100 dark:border-0 dark:bg-slate-900/80",
  identification:
    "bg-violet-50 text-violet-700 dark:text-violet-200 border border-violet-100 dark:border-0 dark:bg-slate-900/80",
  enumeration:
    "bg-pink-50 text-pink-700 dark:text-pink-200 border border-pink-100 dark:border-0 dark:bg-slate-900/80",
  mixed:
    "bg-teal-50 text-teal-700 dark:text-teal-200 border border-teal-100 dark:border-0 dark:bg-slate-900/80",
}


const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
       ...difficultyColors,
       ...quizTypeColors,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type KeyOfVariants =
  | keyof typeof difficultyColors
  | keyof typeof quizTypeColors;


export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
