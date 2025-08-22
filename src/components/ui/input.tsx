import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Reusable stylable input component that renders a native <input> and forwards all native input props.
 *
 * The component applies a comprehensive default set of utility classes (layout, typography, borders, dark mode,
 * focus/ARIA states, file-input styles, etc.) and merges any additional classes provided via `className`.
 * It also sets `data-slot="input"` on the rendered element.
 *
 * @param className - Additional CSS class names to merge with the component's default classes.
 * @param type - The HTML input `type` attribute (e.g., "text", "email", "password"); other native input props
 *               may be passed via `...props`.
 * @returns The rendered input element.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
