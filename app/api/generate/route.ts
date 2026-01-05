import { NextRequest, NextResponse } from 'next/server'
import { getCurrentAgent } from '@/lib/get-agent'
import { prisma } from '@/lib/prisma'
import { generateAllSectionContent } from '@/lib/generate-content'
import { AVAILABLE_SECTIONS } from '@/lib/section-types'
import { CREDIT_COSTS } from '@/lib/credits'
import { checkCreditAvailability, deductCredits } from '@/lib/credit-utils'

export async function POST(request: NextRequest) {
  try {
    const agent = await getCurrentAgent()
    if (!agent) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check credit availability for preview generation
    const creditCheck = await checkCreditAvailability(
      agent.id,
      CREDIT_COSTS.PREVIEW_GENERATION
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

    const {
      website_type,
      business_name,
      phone,
      location,
      services,
      primary_color = '#8B5CF6',
      accent_color = '#EF4D8E',
      theme = 'dark',
      sections = [],
      global_features = {},
    } = await request.json()

    if (!website_type || !business_name || !phone || !location || !services) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (!sections || sections.length === 0) {
      return NextResponse.json({ error: 'Please select at least one section' }, { status: 400 })
    }

    // Ensure hero is included
    const hasHero = sections.some((s: any) => s.type === 'hero')
    if (!hasHero) {
      sections.unshift({ type: 'hero', id: 'hero-1', order: 0 })
    }

    // Deduct credit for preview generation
    const deductionResult = await deductCredits(
      agent.id,
      CREDIT_COSTS.PREVIEW_GENERATION,
      'Preview generation'
    )

    if (!deductionResult.success) {
      return NextResponse.json(
        { error: deductionResult.error || 'Failed to deduct credits' },
        { status: 400 }
      )
    }

    // Generate AI content for each section
    const sectionTypes = sections.map((s: any) => s.type)
    let aiContent = {}
    
    try {
      aiContent = await generateAllSectionContent(sectionTypes, {
        businessName: business_name,
        phone,
        location,
        services,
        websiteType: website_type,
      })
      
      // Track AI credits used
      const aiSectionsCount = sectionTypes.filter((type: string) => 
        AVAILABLE_SECTIONS[type]?.needsAI
      ).length
      
      if (Object.keys(aiContent).length > 0) {
        await prisma.agent.update({
          where: { id: agent.id },
          data: { ai_credits_used: { increment: Object.keys(aiContent).length } },
        })
      }
    } catch (error) {
      console.error('AI content generation failed, continuing without AI:', error)
      // Continue without AI content
    }

    // Generate preview URL
    const previewId = `preview-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Create preview with new schema
    const preview = await prisma.websitePreview.create({
      data: {
        agent_id: agent.id,
        website_type,
        business_name,
        phone,
        location,
        services,
        primary_color,
        accent_color,
        theme,
        sections: JSON.parse(JSON.stringify(sections)),
        ai_content: JSON.parse(JSON.stringify(aiContent)),
        global_features: JSON.parse(JSON.stringify(global_features)),
        preview_url: previewId,
        status: 'PREVIEW',
      },
    })

    return NextResponse.json({
      success: true,
      preview_id: previewId,
      preview,
      ai_enhanced: Object.keys(aiContent).length > 0,
      creditsDeducted: CREDIT_COSTS.PREVIEW_GENERATION,
      newBalance: deductionResult.newBalance,
    })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    )
  }
}

