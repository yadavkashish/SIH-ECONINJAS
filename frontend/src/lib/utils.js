import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind + conditional class names
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
