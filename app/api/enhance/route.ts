import { NextRequest, NextResponse } from 'next/server'
import { getCurrentAgent } from '@/lib/get-agent'
import { prisma } from '@/lib/prisma'
import { generateWebsiteContent, checkRateLimit } from '@/lib/deepseek'
import { CREDIT_COSTS } from '@/lib/credits'
import { checkCreditAvailability, deductCredits } from '@/lib/credit-utils'

export async function POST(request: NextRequest) {
  try {
    const agent = await getCurrentAgent()
    if (!agent) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check credit availability for AI enhancement
    const creditCheck = await checkCreditAvailability(
      agent.id,
      CREDIT_COSTS.AI_ENHANCEMENT
    )
    if (!creditCheck.success) {
      return NextResponse.json(
        {
          error: creditCheck.error || 'Insufficient credits',
          currentBalance: creditCheck.currentBalance,
          requiredCredits: creditCheck.requiredCredits,
        },
        { status: 400 }
      )
    }

    // Check rate limit
    if (!checkRateLimit(agent.id)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Max 10 AI requests per minute.' },
        { status: 429 }
      )
    }

    const { previewId } = await request.json()

    if (!previewId) {
      return NextResponse.json({ error: 'Preview ID is required' }, { status: 400 })
    }

    // Get existing preview
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

    // Generate AI content
    const aiContent = await generateWebsiteContent({
      business_name: preview.business_name,
      phone: preview.phone,
      location: preview.location,
      services: preview.services,
      website_type: preview.website_type,
    })

    if (!aiContent) {
      return NextResponse.json(
        { error: 'Failed to generate AI content. Please try again.' },
        { status: 500 }
      )
    }

    // Deduct credit for AI enhancement
    const deductionResult = await deductCredits(
      agent.id,
      CREDIT_COSTS.AI_ENHANCEMENT,
      'AI enhancement'
    )

    if (!deductionResult.success) {
      return NextResponse.json(
        { error: deductionResult.error || 'Failed to deduct credits' },
        { status: 400 }
      )
    }

    // Update AI credits used and preview content
    await prisma.$transaction([
      prisma.agent.update({
        where: { id: agent.id },
        data: {
          ai_credits_used: { increment: 1 },
        },
      }),
      prisma.websitePreview.update({
        where: { id: preview.id },
        data: {
          ai_content: JSON.parse(JSON.stringify(aiContent)),
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      message: 'Preview enhanced with AI content',
      ai_content: aiContent,
      creditsDeducted: CREDIT_COSTS.AI_ENHANCEMENT,
      newBalance: deductionResult.newBalance,
    })
  } catch (error) {
    console.error('Enhance error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

