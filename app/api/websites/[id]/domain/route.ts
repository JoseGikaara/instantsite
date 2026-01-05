import { NextRequest, NextResponse } from 'next/server'
import { getCurrentAgent } from '@/lib/get-agent'
import { prisma } from '@/lib/prisma'
import { getDomainStatus } from '@/lib/dns-verification'

/**
 * POST /api/websites/[id]/domain
 * Connect a custom domain to a website
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const agent = await getCurrentAgent()
    if (!agent) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { domain } = await request.json()

    if (!domain || typeof domain !== 'string') {
      return NextResponse.json(
        { error: 'Domain is required' },
        { status: 400 }
      )
    }

    // Basic domain validation
    const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i
    if (!domainRegex.test(domain.trim())) {
      return NextResponse.json(
        { error: 'Invalid domain format' },
        { status: 400 }
      )
    }

    const cleanDomain = domain.trim().toLowerCase()

    // Find website by preview_url (id)
    const website = await prisma.websitePreview.findUnique({
      where: { preview_url: params.id },
    })

    if (!website) {
      return NextResponse.json(
        { error: 'Website not found' },
        { status: 404 }
      )
    }

    // Verify ownership
    if (website.agent_id !== agent.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Verify domain is not already in use by another website
    const existingDomain = await prisma.websitePreview.findFirst({
      where: {
        custom_domain: cleanDomain,
        id: { not: website.id },
      },
    })

    if (existingDomain) {
      return NextResponse.json(
        { error: 'Domain is already connected to another website' },
        { status: 400 }
      )
    }

    // Check initial domain status
    const initialStatus = await getDomainStatus(cleanDomain)

    // Update website with domain
    const updated = await prisma.websitePreview.update({
      where: { id: website.id },
      data: {
        custom_domain: cleanDomain,
        domain_status: initialStatus,
      },
    })

    return NextResponse.json({
      success: true,
      domain: cleanDomain,
      status: initialStatus,
      website: updated,
    })
  } catch (error) {
    console.error('Domain connection error:', error)
    return NextResponse.json(
      { error: 'Failed to connect domain' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/websites/[id]/domain
 * Check domain connection status
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const agent = await getCurrentAgent()
    if (!agent) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find website by preview_url (id)
    const website = await prisma.websitePreview.findUnique({
      where: { preview_url: params.id },
    })

    if (!website) {
      return NextResponse.json(
        { error: 'Website not found' },
        { status: 404 }
      )
    }

    // Verify ownership
    if (website.agent_id !== agent.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    if (!website.custom_domain) {
      return NextResponse.json({
        domain: null,
        status: 'PENDING',
      })
    }

    // Check current domain status
    const currentStatus = await getDomainStatus(website.custom_domain)

    // Update status in database if it changed
    if (currentStatus !== website.domain_status) {
      await prisma.websitePreview.update({
        where: { id: website.id },
        data: { domain_status: currentStatus },
      })
    }

    return NextResponse.json({
      domain: website.custom_domain,
      status: currentStatus,
    })
  } catch (error) {
    console.error('Domain status check error:', error)
    return NextResponse.json(
      { error: 'Failed to check domain status' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/websites/[id]/domain
 * Remove custom domain from website
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const agent = await getCurrentAgent()
    if (!agent) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find website by preview_url (id)
    const website = await prisma.websitePreview.findUnique({
      where: { preview_url: params.id },
    })

    if (!website) {
      return NextResponse.json(
        { error: 'Website not found' },
        { status: 404 }
      )
    }

    // Verify ownership
    if (website.agent_id !== agent.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Remove domain
    await prisma.websitePreview.update({
      where: { id: website.id },
      data: {
        custom_domain: null,
        domain_status: null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Domain removal error:', error)
    return NextResponse.json(
      { error: 'Failed to remove domain' },
      { status: 500 }
    )
  }
}

