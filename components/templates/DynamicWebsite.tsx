'use client'

import { HeroFullScreen, HeroSplit, HeroMinimal } from '@/components/website-sections/HeroSections'
import FeaturesGrid from '@/components/website-sections/FeaturesGrid'
import Testimonials from '@/components/website-sections/Testimonials'
import ContactForm from '@/components/website-sections/ContactForm'
import PricingTable from '@/components/website-sections/PricingTable'
import FAQ from '@/components/website-sections/FAQ'
import StatsCounter from '@/components/website-sections/StatsCounter'
import AboutSection from '@/components/website-sections/AboutSection'
import ProcessSteps from '@/components/website-sections/ProcessSteps'
import CTABanner from '@/components/website-sections/CTABanner'
import GalleryGrid from '@/components/website-sections/GalleryGrid'
import WhatsAppFloat from '@/components/website-sections/WhatsAppFloat'
import NewsletterPopup from '@/components/website-sections/NewsletterPopup'
import Footer from '@/components/website-sections/Footer'

interface SectionConfig {
  type: string
  id: string
  order: number
}

interface DynamicWebsiteProps {
  sections: SectionConfig[]
  aiContent: any
  primaryColor: string
  accentColor: string
  theme: string
  globalFeatures?: any
  phone?: string
  businessName?: string
  location?: string
  previewId?: string
}

const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
  hero: HeroFullScreen,
  features: FeaturesGrid,
  testimonials: Testimonials,
  contact: ContactForm,
  pricing: PricingTable,
  faq: FAQ,
  stats: StatsCounter,
  about: AboutSection,
  process: ProcessSteps,
  cta: CTABanner,
  gallery: GalleryGrid,
}

export default function DynamicWebsite({
  sections,
  aiContent,
  primaryColor,
  accentColor,
  theme,
  globalFeatures,
  phone,
  businessName,
  location,
  previewId,
}: DynamicWebsiteProps) {
  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order)

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <div className={`min-h-screen ${themeClass}`}>
      {sortedSections.map((section, index) => {
        const Component = SECTION_COMPONENTS[section.type]
        
        if (!Component) {
          console.warn(`No component found for section type: ${section.type}`)
          return null
        }

        const content = aiContent?.[section.type] || {}

        return (
          <Component
            key={section.id || index}
            content={content}
            primaryColor={primaryColor}
            accentColor={accentColor}
            theme={theme}
            phone={phone}
            previewId={previewId}
          />
        )
      })}

      {/* Global Features */}
      {globalFeatures?.whatsappFloat && phone && (
        <WhatsAppFloat phone={phone} primaryColor="#25D366" />
      )}
      {globalFeatures?.newsletter && (
        <NewsletterPopup primaryColor={primaryColor} accentColor={accentColor} />
      )}

      {/* Footer - Always included */}
      <Footer
        businessName={businessName}
        phone={phone}
        location={location}
        primaryColor={primaryColor}
        accentColor={accentColor}
        theme={theme}
      />
    </div>
  )
}

