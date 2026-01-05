import { redirect } from 'next/navigation'
import { getCurrentAgent } from '@/lib/get-agent'
import { prisma } from '@/lib/prisma'
import DashboardClient from './dashboard-client'
import { getHostingCostSummary } from '@/lib/credit-utils'

// Timeout wrapper to prevent hanging queries
function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 5000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Query timeout')), timeoutMs)
    ),
  ])
}

export default async function DashboardPage() {
  try {
    const agent = await getCurrentAgent()

    if (!agent) {
      redirect('/login')
      return null
    }

    // Fetch data with error handling - use Promise.allSettled to prevent blocking
    // Add timeout to prevent hanging
    const [previewsResult, auditsResult, hostingSummaryResult] = await Promise.allSettled([
      withTimeout(
        prisma.websitePreview.findMany({
          where: { agent_id: agent.id },
          orderBy: { created_at: 'desc' },
          take: 20,
        }),
        5000
      ).catch(() => []),
      withTimeout(
        prisma.audit.findMany({
          where: { agent_id: agent.id },
          orderBy: { created_at: 'desc' },
          take: 20,
        }),
        5000
      ).catch(() => []),
      withTimeout(
        getHostingCostSummary(agent.id),
        5000
      ).catch(() => ({
        liveSitesCount: 0,
        monthlyCost: 0,
        annualCost: 0,
        totalMonthlyEquivalent: 0,
        nextChargeDate: null,
        sitesByPlan: { monthly: 0, annual: 0 },
      })),
    ])

    const previews = previewsResult.status === 'fulfilled' ? previewsResult.value : []
    const audits = auditsResult.status === 'fulfilled' ? auditsResult.value : []
    const hostingSummary = hostingSummaryResult.status === 'fulfilled' 
      ? hostingSummaryResult.value 
      : {
          liveSitesCount: 0,
          monthlyCost: 0,
          annualCost: 0,
          totalMonthlyEquivalent: 0,
          nextChargeDate: null,
          sitesByPlan: { monthly: 0, annual: 0 },
        }

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
      hosting_plan: p.hosting_plan || 'MONTHLY',
      custom_domain: p.custom_domain || null,
      domain_status: p.domain_status || null,
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

    // Serialize hosting summary dates for client
    const serializedHostingSummary = {
      ...hostingSummary,
      nextChargeDate: hostingSummary.nextChargeDate 
        ? (hostingSummary.nextChargeDate instanceof Date 
            ? hostingSummary.nextChargeDate.toISOString() 
            : new Date(hostingSummary.nextChargeDate).toISOString())
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

