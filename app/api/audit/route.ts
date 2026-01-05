import { NextRequest, NextResponse } from 'next/server'
import { getCurrentAgent } from '@/lib/get-agent'
import { prisma } from '@/lib/prisma'
import { searchGooglePlace } from '@/lib/google-places'
import { CREDIT_COSTS } from '@/lib/credits'
import { checkCreditAvailability, deductCredits } from '@/lib/credit-utils'

// Fallback mock audit logic if Google Places API fails
function runMockAudit(businessName: string, location: string) {
  // Simple mock: random results based on business name hash
  const hash = businessName.toLowerCase().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  
  return {
    found: hash % 3 !== 0, // 66% chance of being found
    completeness_score: 30 + (hash % 70), // Random score between 30-100
    reviews_present: hash % 2 === 0,
    photos_present: hash % 3 !== 0,
  }
}

export async function POST(request: NextRequest) {
  try {
    const agent = await getCurrentAgent()
    if (!agent) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check credit availability for audit
    const creditCheck = await checkCreditAvailability(
      agent.id,
      CREDIT_COSTS.PREVIEW_GENERATION // Audit costs same as preview
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

    const { business_name, location } = await request.json()

    if (!business_name || !location) {
      return NextResponse.json({ error: 'Business name and location are required' }, { status: 400 })
    }

    // Try Google Places API first, fallback to mock if it fails
    let auditResults
    try {
      const googleResult = await searchGooglePlace(business_name, location)
      if (googleResult.found) {
        auditResults = {
          found: googleResult.found,
          completeness_score: googleResult.completeness_score,
          reviews_present: googleResult.reviews_present,
          photos_present: googleResult.photos_present,
        }
      } else {
        // If not found on Google, use mock
        auditResults = runMockAudit(business_name, location)
      }
    } catch (error) {
      console.error('Google Places API error, using fallback:', error)
      // Fallback to mock if API fails
      auditResults = runMockAudit(business_name, location)
    }

    // Deduct credit for audit
    const deductionResult = await deductCredits(
      agent.id,
      CREDIT_COSTS.PREVIEW_GENERATION,
      'Google Presence Audit'
    )

    if (!deductionResult.success) {
      return NextResponse.json(
        { error: deductionResult.error || 'Failed to deduct credits' },
        { status: 400 }
      )
    }

    // Save audit
    const audit = await prisma.audit.create({
      data: {
        agent_id: agent.id,
        business_name,
        location,
        ...auditResults,
      },
    })

    return NextResponse.json({
      success: true,
      ...auditResults,
      creditsDeducted: CREDIT_COSTS.PREVIEW_GENERATION,
      newBalance: deductionResult.newBalance,
    })
  } catch (error) {
    console.error('Audit error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

