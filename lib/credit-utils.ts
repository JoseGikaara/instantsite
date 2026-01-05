/**
 * Credit Utility Functions
 * 
 * Handles all credit-related operations with proper transaction safety
 */

import { prisma } from '@/lib/prisma'
import { CREDIT_COSTS, AGENT_LIMITS, hasSufficientCredits } from '@/lib/credits'

export interface CreditCheckResult {
  success: boolean
  error?: string
  currentBalance?: number
  requiredCredits?: number
}

/**
 * Check if agent can perform an action that costs credits
 */
export async function checkCreditAvailability(
  agentId: string,
  requiredCredits: number
): Promise<CreditCheckResult> {
  const agent = await prisma.agent.findUnique({
    where: { id: agentId },
    select: { credit_balance: true },
  })

  if (!agent) {
    return {
      success: false,
      error: 'Agent not found',
    }
  }

  if (!hasSufficientCredits(agent.credit_balance, requiredCredits)) {
    return {
      success: false,
      error: `Insufficient credits. Required: ${requiredCredits}, Available: ${agent.credit_balance}`,
      currentBalance: agent.credit_balance,
      requiredCredits,
    }
  }

  return {
    success: true,
    currentBalance: agent.credit_balance,
    requiredCredits,
  }
}

/**
 * Deduct credits from agent balance (with transaction safety)
 */
export async function deductCredits(
  agentId: string,
  amount: number,
  reason?: string
): Promise<{ success: boolean; newBalance?: number; error?: string }> {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // Lock the agent row for update
      const agent = await tx.agent.findUnique({
        where: { id: agentId },
        select: { credit_balance: true },
      })

      if (!agent) {
        throw new Error('Agent not found')
      }

      if (agent.credit_balance < amount) {
        throw new Error(
          `Insufficient credits. Required: ${amount}, Available: ${agent.credit_balance}`
        )
      }

      const updated = await tx.agent.update({
        where: { id: agentId },
        data: {
          credit_balance: {
            decrement: amount,
          },
        },
        select: { credit_balance: true },
      })

      return updated.credit_balance
    })

    return {
      success: true,
      newBalance: result,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to deduct credits',
    }
  }
}

/**
 * Check if agent can deploy a new website
 */
export async function canDeployWebsite(agentId: string): Promise<{
  canDeploy: boolean
  error?: string
  liveSitesCount?: number
  currentBalance?: number
}> {
  const [agent, liveSites] = await Promise.all([
    prisma.agent.findUnique({
      where: { id: agentId },
      select: { credit_balance: true },
    }),
    prisma.websitePreview.count({
      where: {
        agent_id: agentId,
        status: 'LIVE',
      },
    }),
  ])

  if (!agent) {
    return {
      canDeploy: false,
      error: 'Agent not found',
    }
  }

  // Check max LIVE sites limit
  if (liveSites >= AGENT_LIMITS.MAX_LIVE_SITES) {
    return {
      canDeploy: false,
      error: `Maximum ${AGENT_LIMITS.MAX_LIVE_SITES} live websites allowed per agent`,
      liveSitesCount: liveSites,
      currentBalance: agent.credit_balance,
    }
  }

  // Check credit balance
  if (!hasSufficientCredits(agent.credit_balance, CREDIT_COSTS.DEPLOY_WEBSITE_BASE)) {
    return {
      canDeploy: false,
      error: `Insufficient credits for deployment. Required: ${CREDIT_COSTS.DEPLOY_WEBSITE_BASE}, Available: ${agent.credit_balance}`,
      liveSitesCount: liveSites,
      currentBalance: agent.credit_balance,
    }
  }

  return {
    canDeploy: true,
    liveSitesCount: liveSites,
    currentBalance: agent.credit_balance,
  }
}

/**
 * Get agent's live websites count
 */
export async function getLiveWebsitesCount(agentId: string): Promise<number> {
  return prisma.websitePreview.count({
    where: {
      agent_id: agentId,
      status: 'LIVE',
    },
  })
}

/**
 * Get agent's hosting cost summary
 */
export async function getHostingCostSummary(agentId: string): Promise<{
  liveSitesCount: number
  monthlyCost: number
  annualCost: number
  totalMonthlyEquivalent: number
  nextChargeDate: Date | null
  sitesByPlan: {
    monthly: number
    annual: number
  }
}> {
  const liveSites = await prisma.websitePreview.findMany({
    where: {
      agent_id: agentId,
      status: 'LIVE',
    },
    select: {
      hosting_plan: true,
      last_hosting_charged_at: true,
    },
  })

  const liveSitesCount = liveSites.length
  
  // Count sites by plan
  const monthlySites = liveSites.filter(s => s.hosting_plan === 'MONTHLY' || !s.hosting_plan).length
  const annualSites = liveSites.filter(s => s.hosting_plan === 'ANNUAL').length
  
  // Calculate costs
  const monthlyCost = monthlySites * CREDIT_COSTS.MONTHLY_HOSTING
  const annualCost = annualSites * CREDIT_COSTS.ANNUAL_HOSTING
  // Total monthly equivalent (annual cost / 12 months)
  const totalMonthlyEquivalent = monthlyCost + (annualCost / 12)

  // Calculate next charge date
  // For monthly: 30 days from last charge
  // For annual: 365 days from last charge
  const nextChargeDate = liveSitesCount > 0
    ? new Date(
        Math.min(
          ...liveSites
            .map((site) => {
              if (!site.last_hosting_charged_at) return Date.now()
              const daysUntilCharge = site.hosting_plan === 'ANNUAL' ? 365 : 30
              return new Date(site.last_hosting_charged_at).getTime() + daysUntilCharge * 24 * 60 * 60 * 1000
            })
        )
      )
    : null

  return {
    liveSitesCount,
    monthlyCost,
    annualCost,
    totalMonthlyEquivalent,
    nextChargeDate,
    sitesByPlan: {
      monthly: monthlySites,
      annual: annualSites,
    },
  }
}

