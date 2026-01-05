/**
 * Hosting Charge System
 * 
 * This endpoint should be called by a cron job or scheduled task
 * to charge hosting fees for all LIVE websites.
 * 
 * Logic:
 * - Find all LIVE websites that need charging based on their hosting plan:
 *   - MONTHLY: Charge if last_hosting_charged_at is > 30 days ago (or null)
 *   - ANNUAL: Charge if last_hosting_charged_at is > 365 days ago (or null)
 * - For each website, deduct appropriate credits (MONTHLY_HOSTING or ANNUAL_HOSTING)
 * - If insufficient credits, pause the website (status → PAUSED)
 * - Update last_hosting_charged_at timestamp
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CREDIT_COSTS } from '@/lib/credits'
import { deductCredits } from '@/lib/credit-utils'

// Optional: Add API key authentication for cron jobs
const CRON_SECRET = process.env.CRON_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    // Optional: Verify cron secret
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const threeSixtyFiveDaysAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)

    // Find all LIVE websites that need charging
    // MONTHLY: Charge if last_hosting_charged_at is > 30 days ago (or null)
    // ANNUAL: Charge if last_hosting_charged_at is > 365 days ago (or null)
    const websitesToCharge = await prisma.websitePreview.findMany({
      where: {
        status: 'LIVE',
        OR: [
          // Never charged
          { last_hosting_charged_at: null },
          // Monthly plans: charge after 30 days
          {
            AND: [
              { hosting_plan: 'MONTHLY' },
              { last_hosting_charged_at: { lt: thirtyDaysAgo } },
            ],
          },
          // Annual plans: charge after 365 days
          {
            AND: [
              { hosting_plan: 'ANNUAL' },
              { last_hosting_charged_at: { lt: threeSixtyFiveDaysAgo } },
            ],
          },
        ],
      },
      include: {
        agent: {
          select: {
            id: true,
            credit_balance: true,
            email: true,
          },
        },
      },
    })

    const results = {
      charged: 0,
      paused: 0,
      errors: 0,
      details: [] as Array<{
        websiteId: string
        businessName: string
        agentEmail: string
        action: 'charged' | 'paused' | 'error'
        message: string
      }>,
    }

    for (const website of websitesToCharge) {
      try {
        // Determine hosting cost based on plan
        const hostingPlan = website.hosting_plan || 'MONTHLY' // Default to monthly if null
        const hostingCost = hostingPlan === 'ANNUAL' 
          ? CREDIT_COSTS.ANNUAL_HOSTING 
          : CREDIT_COSTS.MONTHLY_HOSTING

        // Check if agent has sufficient credits
        if (website.agent.credit_balance >= hostingCost) {
          // Deduct credits
          const deductionResult = await deductCredits(
            website.agent.id,
            hostingCost,
            `${hostingPlan === 'ANNUAL' ? 'Annual' : 'Monthly'} hosting for ${website.business_name}`
          )

          if (deductionResult.success) {
            // Update website with new charge date
            await prisma.websitePreview.update({
              where: { id: website.id },
              data: {
                last_hosting_charged_at: now,
              },
            })

            results.charged++
            results.details.push({
              websiteId: website.id,
              businessName: website.business_name,
              agentEmail: website.agent.email,
              action: 'charged',
              message: `Charged ${hostingCost} credits (${hostingPlan.toLowerCase()} plan)`,
            })
          } else {
            // If deduction failed, pause the website
            await prisma.websitePreview.update({
              where: { id: website.id },
              data: {
                status: 'PAUSED',
              },
            })

            results.paused++
            results.details.push({
              websiteId: website.id,
              businessName: website.business_name,
              agentEmail: website.agent.email,
              action: 'paused',
              message: `Insufficient credits. Paused website.`,
            })
          }
        } else {
          // Insufficient credits - pause the website
          await prisma.websitePreview.update({
            where: { id: website.id },
            data: {
              status: 'PAUSED',
            },
          })

          results.paused++
          results.details.push({
            websiteId: website.id,
            businessName: website.business_name,
            agentEmail: website.agent.email,
            action: 'paused',
            message: `Insufficient credits (${website.agent.credit_balance}/${hostingCost}). Paused website.`,
          })
        }
      } catch (error) {
        console.error(`Error processing website ${website.id}:`, error)
        results.errors++
        results.details.push({
          websiteId: website.id,
          businessName: website.business_name,
          agentEmail: website.agent.email,
          action: 'error',
          message: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: now.toISOString(),
      summary: {
        totalProcessed: websitesToCharge.length,
        charged: results.charged,
        paused: results.paused,
        errors: results.errors,
      },
      details: results.details,
    })
  } catch (error) {
    console.error('Hosting charge error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Resume paused websites when agent has sufficient credits
 * This can be called manually or automatically when credits are added
 */
export async function PUT(request: NextRequest) {
  try {
    const { agentId } = await request.json()

    if (!agentId) {
      return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 })
    }

    // Get agent's paused websites
    const pausedWebsites = await prisma.websitePreview.findMany({
      where: {
        agent_id: agentId,
        status: 'PAUSED',
      },
      select: {
        id: true,
        hosting_plan: true,
      },
    })

    if (pausedWebsites.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No paused websites found',
        resumed: 0,
      })
    }

    // Get agent's current balance
    const agent = await prisma.agent.findUnique({
      where: { id: agentId },
      select: { credit_balance: true },
    })

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }

    // Calculate total hosting cost for all paused websites based on their plans
    const totalHostingCost = pausedWebsites.reduce((total, site) => {
      const plan = site.hosting_plan || 'MONTHLY'
      return total + (plan === 'ANNUAL' ? CREDIT_COSTS.ANNUAL_HOSTING : CREDIT_COSTS.MONTHLY_HOSTING)
    }, 0)

    // Check if agent has sufficient credits
    if (agent.credit_balance < totalHostingCost) {
      return NextResponse.json(
        {
          error: `Insufficient credits to resume all websites. Required: ${totalHostingCost}, Available: ${agent.credit_balance}`,
          requiredCredits: totalHostingCost,
          currentBalance: agent.credit_balance,
        },
        { status: 400 }
      )
    }

    // Deduct credits and resume websites
    const deductionResult = await deductCredits(
      agentId,
      totalHostingCost,
      `Resume ${pausedWebsites.length} paused website(s)`
    )

    if (!deductionResult.success) {
      return NextResponse.json(
        { error: deductionResult.error || 'Failed to deduct credits' },
        { status: 400 }
      )
    }

    // Resume all paused websites (keep their original hosting plans)
    await prisma.websitePreview.updateMany({
      where: {
        agent_id: agentId,
        status: 'PAUSED',
      },
      data: {
        status: 'LIVE',
        last_hosting_charged_at: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: `Resumed ${pausedWebsites.length} website(s)`,
      resumed: pausedWebsites.length,
      creditsDeducted: totalHostingCost,
      newBalance: deductionResult.newBalance,
    })
  } catch (error) {
    console.error('Resume websites error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

