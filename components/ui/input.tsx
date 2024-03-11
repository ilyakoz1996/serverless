import * as React from "react"

import { cn } from "@/lib/utils"
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          error && "focus-visible:ring-red-500 border-red-500 focus-visible:border-border"
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
