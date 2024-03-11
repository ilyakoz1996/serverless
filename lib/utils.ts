import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const numberMask = (value: number | 'custom' | undefined) => {
  if (!value || value === 'custom') return value
  return Number(value).toLocaleString()
}
