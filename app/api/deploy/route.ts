/**
 * Deploy Website API
 * 
 * Deploys a preview website to LIVE status.
 * - Deducts DEPLOY_WEBSITE_BASE credits (20)
 * - Sets status to LIVE
 * - Records deployed_at timestamp
 * - Enforces max LIVE sites limit
 */

import { NextRequest, NextResponse } from 'next/server'
import { getCurrentAgent } from '@/lib/get-agent'
import { prisma } from '@/lib/prisma'
import { CREDIT_COSTS } from '@/lib/credits'
import { canDeployWebsite, deductCredits } from '@/lib/credit-utils'

export async function POST(request: NextRequest) {
  try {
    const agent = await getCurrentAgent()
    if (!agent) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { previewId, hostingPlan = 'MONTHLY' } = await request.json()

    if (!previewId) {
      return NextResponse.json({ error: 'Preview ID is required' }, { status: 400 })
    }

    // Validate hosting plan
    if (hostingPlan !== 'MONTHLY' && hostingPlan !== 'ANNUAL') {
      return NextResponse.json(
        { error: 'Invalid hosting plan. Must be MONTHLY or ANNUAL' },
        { status: 400 }
      )
    }

    // Calculate total deployment cost (base + hosting plan)
    const hostingCost = hostingPlan === 'ANNUAL' 
      ? CREDIT_COSTS.ANNUAL_HOSTING 
      : CREDIT_COSTS.MONTHLY_HOSTING
    const totalDeploymentCost = CREDIT_COSTS.DEPLOY_WEBSITE_BASE + hostingCost

    // Get the preview
    const preview = await prisma.websitePreview.findUnique({
      where: { preview_url: previewId },
    })

    if (!preview) {
      return NextResponse.json({ error: 'Preview not found' }, { status: 404 })
    }

    // Verify ownership
    if (preview.agent_id !== agent.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Check if already deployed
    if (preview.status === 'LIVE') {
      return NextResponse.json(
        { error: 'Website is already deployed' },
        { status: 400 }
      )
    }

    // Check if paused (can't deploy from paused, must resume first)
    if (preview.status === 'PAUSED') {
      return NextResponse.json(
        { error: 'Website is paused. Please resume it first or create a new deployment.' },
        { status: 400 }
      )
    }

    // Check if agent has sufficient credits for deployment + hosting plan
    if (agent.credit_balance < totalDeploymentCost) {
      return NextResponse.json(
        {
          error: `Insufficient credits. Required: ${totalDeploymentCost} (${CREDIT_COSTS.DEPLOY_WEBSITE_BASE} deployment + ${hostingCost} ${hostingPlan.toLowerCase()} hosting), Available: ${agent.credit_balance}`,
          currentBalance: agent.credit_balance,
          requiredCredits: totalDeploymentCost,
          breakdown: {
            deployment: CREDIT_COSTS.DEPLOY_WEBSITE_BASE,
            hosting: hostingCost,
            plan: hostingPlan,
          },
        },
        { status: 400 }
      )
    }

    // Check deployment eligibility (max sites limit)
    const deploymentCheck = await canDeployWebsite(agent.id)
    if (!deploymentCheck.canDeploy) {
      return NextResponse.json(
        {
          error: deploymentCheck.error,
          liveSitesCount: deploymentCheck.liveSitesCount,
          currentBalance: deploymentCheck.currentBalance,
        },
        { status: 400 }
      )
    }

    // Deduct credits and deploy in a transaction
    const deductionResult = await deductCredits(
      agent.id,
      totalDeploymentCost,
      `Website deployment with ${hostingPlan.toLowerCase()} hosting`
    )

    if (!deductionResult.success) {
      return NextResponse.json(
        { error: deductionResult.error || 'Failed to deduct credits' },
        { status: 400 }
      )
    }

    // Update preview to LIVE status with hosting plan
    const deployed = await prisma.websitePreview.update({
      where: { id: preview.id },
      data: {
        status: 'LIVE',
        hosting_plan: hostingPlan,
        deployed_at: new Date(),
        // Set initial hosting charge date to now
        // Monthly: will be charged again in 30 days
        // Annual: will be charged again in 365 days
        last_hosting_charged_at: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: `Website deployed successfully with ${hostingPlan.toLowerCase()} hosting`,
      preview: {
        id: deployed.id,
        preview_url: deployed.preview_url,
        status: deployed.status,
        hosting_plan: deployed.hosting_plan,
        deployed_at: deployed.deployed_at,
      },
      newBalance: deductionResult.newBalance,
      creditsDeducted: totalDeploymentCost,
      breakdown: {
        deployment: CREDIT_COSTS.DEPLOY_WEBSITE_BASE,
        hosting: hostingCost,
        plan: hostingPlan,
      },
    })
  } catch (error) {
    console.error('Deploy error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

