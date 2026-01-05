/**
 * Credit Economics Configuration
 * 
 * Credits are treated as currency, not UI points.
 * 1 credit = KES 150 (configurable via CREDIT_VALUE_KES env var)
 */

// Credit value in KES (Kenyan Shillings)
export const CREDIT_VALUE_KES = parseInt(process.env.CREDIT_VALUE_KES || '150', 10)

/**
 * Credit Costs for Different Actions
 * 
 * These costs represent the platform's operational expenses:
 * - Preview generation: AI API calls, storage
 * - AI enhancement: Additional AI processing
 * - Section addition: Content generation overhead
 * - Deployment: Infrastructure setup, domain provisioning
 * - Monthly hosting: Server costs, bandwidth, maintenance
 */
export const CREDIT_COSTS = {
  // Preview actions (one-time)
  PREVIEW_GENERATION: 1,
  AI_ENHANCEMENT: 1,
  SECTION_ADDITION: 1,

  // Deployment (one-time)
  DEPLOY_WEBSITE_BASE: 20,

  // Recurring hosting
  MONTHLY_HOSTING: 5,
  ANNUAL_HOSTING: 50, // 50 credits for 12 months (saves 10 credits vs monthly)
} as const

/**
 * Agent Restrictions
 */
export const AGENT_LIMITS = {
  MAX_LIVE_SITES: parseInt(process.env.MAX_LIVE_SITES_PER_AGENT || '10', 10),
} as const

/**
 * Convert credits to KES
 */
export function creditsToKES(credits: number): number {
  return credits * CREDIT_VALUE_KES
}

/**
 * Convert KES to credits
 */
export function kesToCredits(kes: number): number {
  return Math.floor(kes / CREDIT_VALUE_KES)
}

/**
 * Calculate total monthly hosting cost for an agent
 */
export function calculateMonthlyHostingCost(liveSitesCount: number): number {
  return liveSitesCount * CREDIT_COSTS.MONTHLY_HOSTING
}

/**
 * Check if agent has sufficient credits for an action
 */
export function hasSufficientCredits(
  currentBalance: number,
  requiredCredits: number
): boolean {
  return currentBalance >= requiredCredits
}

/**
 * Get credit cost for an action
 */
export function getCreditCost(action: keyof typeof CREDIT_COSTS): number {
  return CREDIT_COSTS[action]
}

