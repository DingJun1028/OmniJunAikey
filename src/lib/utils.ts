import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Normalizes a set of class values and returns a merged Tailwind-compatible class string.
 *
 * Takes the same kinds of inputs supported by `clsx` (strings, arrays, objects, etc.), normalizes them into a single class string, and resolves Tailwind CSS duplicate/conflicting classes using `tailwind-merge`.
 *
 * @param inputs - One or more class values (string | string[] | Record<string, any> | etc.) compatible with `clsx`
 * @returns A single className string with Tailwind classes deduplicated and conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
