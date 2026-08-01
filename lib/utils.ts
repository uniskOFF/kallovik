import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names with Tailwind CSS classes
 * @param inputs - Class names to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a unique ID
 * @param prefix - Optional prefix for the ID
 * @returns Unique ID string
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Debounce a function
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, delay)
  }
}

/**
 * Throttle a function
 * @param fn - Function to throttle
 * @param limit - Limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Format a number with spaces as thousand separators
 * @param num - Number to format
 * @returns Formatted string
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

/**
 * Truncate text to a specified length
 * @param text - Text to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated text
 */
export function truncateText(text: string, length: number, suffix = '...'): string {
  if (text.length <= length) return text
  return text.substring(0, length) + suffix
}

/**
 * Convert a string to slug
 * @param text - Text to convert
 * @returns Slug string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param value - Value to check
 * @returns Boolean
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * Get the initials from a name
 * @param name - Full name
 * @returns Initials (max 2 characters)
 */
export function getInitials(name: string): string {
  if (!name) return ''
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

/**
 * Safe JSON parse
 * @param json - JSON string to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed value or fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T
  } catch {
    return fallback
  }
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves to boolean indicating success
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * Get the current year
 * @returns Current year as string
 */
export function getCurrentYear(): string {
  return new Date().getFullYear().toString()
}

/**
 * Scroll to an element
 * @param elementId - ID of the element to scroll to
 * @param options - Scroll options
 */
export function scrollToElement(
  elementId: string,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }
): void {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView(options)
  }
}

/**
 * Detect if the user is on a mobile device
 * @returns Boolean
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

/**
 * Detect if the user is on a touch device
 * @returns Boolean
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Wait for a specified time
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after the specified time
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Format a date to a readable string
 * @param date - Date object or string
 * @param locale - Locale (default: 'ru-RU')
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, locale = 'ru-RU'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}