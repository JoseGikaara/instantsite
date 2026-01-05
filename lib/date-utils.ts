/**
 * Date formatting utilities
 * Ensures consistent date formatting across server and client
 */

/**
 * Format date to YYYY-MM-DD format (consistent across server/client)
 */
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return 'N/A'
  
  try {
    const d = typeof date === 'string' ? new Date(date) : date
    if (isNaN(d.getTime())) return 'N/A'
    
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    
    return `${year}-${month}-${day}`
  } catch {
    return 'N/A'
  }
}

/**
 * Format date to readable format (e.g., "Jan 2, 2026")
 * Uses consistent formatting to avoid hydration mismatches
 */
export function formatDateReadable(date: string | Date | null | undefined): string {
  if (!date) return 'N/A'
  
  try {
    const d = typeof date === 'string' ? new Date(date) : date
    if (isNaN(d.getTime())) return 'N/A'
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = months[d.getMonth()]
    const day = d.getDate()
    const year = d.getFullYear()
    
    return `${month} ${day}, ${year}`
  } catch {
    return 'N/A'
  }
}

