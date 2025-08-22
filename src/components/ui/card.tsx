import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Root container for a card layout.
 *
 * Renders a div with data-slot="card" and default card styling (background, foreground,
 * rounded corners, border, padding, shadow, and vertical spacing). All other props are
 * forwarded to the underlying div.
 *
 * @param className - Additional CSS class names that are merged with the component's default classes.
 * @returns The card container element.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Header section for a Card.
 *
 * Renders a div with `data-slot="card-header"` and a responsive grid layout used for the card's header content.
 * Applies default spacing and grid classes and merges any provided `className`. When a `card-action` slot is present
 * (data-slot="card-action" on a child), the grid switches to two columns (`1fr` / `auto`) to place actions to the right.
 * All other props are forwarded to the underlying div.
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders the card title slot with emphasized typography.
 *
 * Merges the provided `className` with the default `leading-none font-semibold` styles,
 * forwards all other div props to the underlying element, and sets `data-slot="card-title"`
 * to enable slot-based styling.
 *
 * @param className - Additional CSS classes to append to the default styles.
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Presentational component that renders a card description slot.
 *
 * Renders a div with `data-slot="card-description"` and default muted small-text styling;
 * accepts and merges a `className` and forwards all other div props to the underlying element.
 *
 * @returns The JSX element for the card description slot.
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Action area inside a Card for placing controls (e.g., buttons).
 *
 * Renders a div with data-slot="card-action" and default layout classes that position actions within the card header.
 * Any provided `className` is merged with the component's defaults; all other div props are forwarded to the underlying element.
 *
 * @param className - Additional CSS classes to merge with the default layout classes
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * CardContent — main content region for a Card.
 *
 * Renders a div with `data-slot="card-content"` and horizontal padding; accepts standard div props
 * (e.g., `children`, `className`) which are merged with the default padding class.
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * Footer region for a Card.
 *
 * Renders a div with `data-slot="card-footer"` and default classes for horizontal padding and center-aligned flex layout. Merges the provided `className` with the defaults and forwards all other div props. Adds extra top padding when a top border is present.
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
