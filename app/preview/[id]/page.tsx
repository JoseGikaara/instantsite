import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getCurrentAgent } from '@/lib/get-agent'
import LocalBusinessTemplate from '@/components/templates/LocalBusinessTemplate'
import WhatsAppLeadTemplate from '@/components/templates/WhatsAppLeadTemplate'
import LandingPageTemplate from '@/components/templates/LandingPageTemplate'
import DirectoryListingTemplate from '@/components/templates/DirectoryListingTemplate'
import DynamicWebsite from '@/components/templates/DynamicWebsite'
import PreviewEnhancer from '@/components/PreviewEnhancer'
import PausedSitePage from '@/components/PausedSitePage'

export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const preview = await prisma.websitePreview.findUnique({
    where: { preview_url: id },
  })

  if (!preview) {
    notFound()
  }

  // Handle PAUSED status - return 402 Payment Required
  if (preview.status === 'PAUSED') {
    const agent = await prisma.agent.findUnique({
      where: { id: preview.agent_id },
      select: { email: true },
    })

    return (
      <>
        <PausedSitePage
          businessName={preview.business_name}
          agentEmail={agent?.email}
        />
      </>
    )
  }

  // Get agent for enhancer (optional - enhancer will handle auth)
  const agent = await getCurrentAgent()
  const isEnhanced = !!preview.ai_content
  const agentCredits = agent?.credit_balance || 0

  // Check if this is a new modular website (has sections) or old template
  const sections = preview.sections as any
  const hasSections = sections && Array.isArray(sections) && sections.length > 0

  // Use new dynamic renderer if sections exist, otherwise use old templates
  if (hasSections) {
    return (
      <div>
        {agent && (
          <div className="fixed top-4 right-4 z-50">
            <PreviewEnhancer
              previewId={id}
              isEnhanced={isEnhanced}
              agentCredits={agentCredits}
            />
          </div>
        )}
        <DynamicWebsite
          sections={sections}
          aiContent={(preview.ai_content as any) || {}}
          primaryColor={(preview as any).primary_color || '#8B5CF6'}
          accentColor={(preview as any).accent_color || '#EF4D8E'}
          theme={(preview as any).theme || 'dark'}
          globalFeatures={(preview as any).global_features || {}}
          phone={preview.phone || undefined}
          businessName={preview.business_name}
          location={preview.location || undefined}
          previewId={id}
        />
      </div>
    )
  }

  // Fallback to old templates for backward compatibility
  const templateMap: Record<string, React.ComponentType<any>> = {
    'Local Business Website': LocalBusinessTemplate,
    'WhatsApp Lead Website': WhatsAppLeadTemplate,
    'Landing Page': LandingPageTemplate,
    'Directory Listing Page': DirectoryListingTemplate,
  }

  const Template = templateMap[preview.website_type] || LocalBusinessTemplate

  return (
    <div>
      {agent && (
        <div className="fixed top-4 right-4 z-50">
          <PreviewEnhancer
            previewId={id}
            isEnhanced={isEnhanced}
            agentCredits={agentCredits}
          />
        </div>
      )}
      <Template preview={preview} />
    </div>
  )
}

