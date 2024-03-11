import * as React from "react"

import { cn } from "@/lib/utils"
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, ...props }, ref) => {
    console.log('props.value', props.value)
    return (
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            error && "focus-visible:ring-red-500 border-red-500 focus-visible:border-border"
          )}
          ref={ref}
          {...props}
        />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
