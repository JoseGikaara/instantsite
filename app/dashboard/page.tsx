import { redirect } from 'next/navigation'
import { getCurrentAgent } from '@/lib/get-agent'
import { prisma } from '@/lib/prisma'
import DashboardClient from './dashboard-client'
import { getHostingCostSummary } from '@/lib/credit-utils'

export default async function DashboardPage() {
  try {
    const agent = await getCurrentAgent()

    if (!agent) {
      redirect('/login')
    }

    // Fetch data with error handling - use Promise.allSettled to prevent blocking
    const [previewsResult, auditsResult] = await Promise.allSettled([
      prisma.websitePreview.findMany({
        where: { agent_id: agent.id },
        orderBy: { created_at: 'desc' },
        take: 20,
      }).catch(() => []),
      prisma.audit.findMany({
        where: { agent_id: agent.id },
        orderBy: { created_at: 'desc' },
        take: 20,
      }).catch(() => []),
    ])

    const previews = previewsResult.status === 'fulfilled' ? previewsResult.value : []
    const audits = auditsResult.status === 'fulfilled' ? auditsResult.value : []

    // Serialize dates and ensure data is safe for client
    const serializedPreviews = (previews || []).map((p: any) => ({
      id: p.id || '',
      business_name: p.business_name || '',
      website_type: p.website_type || '',
      preview_url: p.preview_url || null,
      status: p.status || 'PREVIEW',
      created_at: p.created_at ? new Date(p.created_at).toISOString() : null,
      ai_content: p.ai_content || null,
      sections: p.sections || [],
      primary_color: p.primary_color || '#8B5CF6',
      accent_color: p.accent_color || '#EF4D8E',
      theme: p.theme || 'dark',
    }))

    const serializedAudits = (audits || []).map((a: any) => ({
      id: a.id || '',
      business_name: a.business_name || '',
      location: a.location || '',
      found: a.found || false,
      completeness_score: a.completeness_score || 0,
      reviews_present: a.reviews_present || false,
      photos_present: a.photos_present || false,
      created_at: a.created_at ? new Date(a.created_at).toISOString() : null,
    }))

    // Get hosting cost summary
    const hostingSummary = await getHostingCostSummary(agent.id)

    // Serialize hosting summary dates for client
    const serializedHostingSummary = {
      ...hostingSummary,
      nextChargeDate: hostingSummary.nextChargeDate 
        ? hostingSummary.nextChargeDate.toISOString() 
        : null,
    }

    return (
      <DashboardClient
        agent={agent}
        previews={serializedPreviews}
        audits={serializedAudits}
        hostingSummary={serializedHostingSummary}
      />
    )
  } catch (error) {
    console.error('Dashboard page error:', error)
    redirect('/login')
  }
}

