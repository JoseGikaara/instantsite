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
// WhatsApp Lead sections
import WhyWhatsAppSection from '@/components/website-sections/WhyWhatsAppSection'
import ServicePackagesSection from '@/components/website-sections/ServicePackagesSection'
import WhatsAppConversationSection from '@/components/website-sections/WhatsAppConversationSection'
import QuickResponseSection from '@/components/website-sections/QuickResponseSection'
// Landing Page sections
import VideoHeroSection from '@/components/website-sections/VideoHeroSection'
import ProblemSolutionSection from '@/components/website-sections/ProblemSolutionSection'
import CountdownTimerSection from '@/components/website-sections/CountdownTimerSection'
import ComparisonSection from '@/components/website-sections/ComparisonSection'
import TrustBadgesSection from '@/components/website-sections/TrustBadgesSection'
import SocialProofBarSection from '@/components/website-sections/SocialProofBarSection'
// Directory sections
import SearchFilterBar from '@/components/website-sections/SearchFilterBar'
import CategoryGridSection from '@/components/website-sections/CategoryGridSection'
import FeaturedListingsSection from '@/components/website-sections/FeaturedListingsSection'
import BusinessListingsGridSection from '@/components/website-sections/BusinessListingsGridSection'
import AddBusinessCTASection from '@/components/website-sections/AddBusinessCTASection'
// Event sections
import EventHeroSection from '@/components/website-sections/EventHeroSection'
import EventDetailsSection from '@/components/website-sections/EventDetailsSection'
import ScheduleSection from '@/components/website-sections/ScheduleSection'
import SpeakersSection from '@/components/website-sections/SpeakersSection'
import TicketPricingSection from '@/components/website-sections/TicketPricingSection'
import VenueSection from '@/components/website-sections/VenueSection'
import RSVPFormSection from '@/components/website-sections/RSVPFormSection'
import SponsorsSection from '@/components/website-sections/SponsorsSection'
// Restaurant sections
import RestaurantHeroSection from '@/components/website-sections/RestaurantHeroSection'
import MenuSection from '@/components/website-sections/MenuSection'
import AboutRestaurantSection from '@/components/website-sections/AboutRestaurantSection'
import LocationHoursSection from '@/components/website-sections/LocationHoursSection'
import OnlineOrderingCTASection from '@/components/website-sections/OnlineOrderingCTASection'
import SpecialOffersSection from '@/components/website-sections/SpecialOffersSection'
// Portfolio sections
import PortfolioHeroSection from '@/components/website-sections/PortfolioHeroSection'
import WorkGallerySection from '@/components/website-sections/WorkGallerySection'
import AboutMeSection from '@/components/website-sections/AboutMeSection'
import ServicesOfferedSection from '@/components/website-sections/ServicesOfferedSection'
import SkillsExpertiseSection from '@/components/website-sections/SkillsExpertiseSection'
import ProcessWorkSection from '@/components/website-sections/ProcessWorkSection'
import HireMeSection from '@/components/website-sections/HireMeSection'
// Church/NGO sections
import OrganizationHeroSection from '@/components/website-sections/OrganizationHeroSection'
import MissionSection from '@/components/website-sections/MissionSection'
import ProgramsServicesSection from '@/components/website-sections/ProgramsServicesSection'
import UpcomingEventsListSection from '@/components/website-sections/UpcomingEventsListSection'
import SermonsResourcesSection from '@/components/website-sections/SermonsResourcesSection'
import ImpactProjectsSection from '@/components/website-sections/ImpactProjectsSection'
import DonationSection from '@/components/website-sections/DonationSection'
import VolunteerSection from '@/components/website-sections/VolunteerSection'
import StoriesTestimonialsSection from '@/components/website-sections/StoriesTestimonialsSection'

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
  // Common sections
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
  // WhatsApp Lead sections
  whyWhatsApp: WhyWhatsAppSection,
  servicePackages: ServicePackagesSection,
  whatsappConversation: WhatsAppConversationSection,
  quickResponseGuarantee: QuickResponseSection,
  // Landing Page sections
  videoHero: VideoHeroSection,
  problemSolution: ProblemSolutionSection,
  countdownTimer: CountdownTimerSection,
  comparisonBeforeAfter: ComparisonSection,
  trustBadges: TrustBadgesSection,
  socialProofBar: SocialProofBarSection,
  // Directory sections
  searchFilterBar: SearchFilterBar,
  categoryGrid: CategoryGridSection,
  featuredListings: FeaturedListingsSection,
  businessListingsGrid: BusinessListingsGridSection,
  addBusinessCTA: AddBusinessCTASection,
  // Event sections
  eventHero: EventHeroSection,
  eventDetails: EventDetailsSection,
  scheduleAgenda: ScheduleSection,
  speakersPerformers: SpeakersSection,
  ticketPricing: TicketPricingSection,
  venueSection: VenueSection,
  rsvpForm: RSVPFormSection,
  sponsors: SponsorsSection,
  // Restaurant sections
  restaurantHero: RestaurantHeroSection,
  menuSection: MenuSection,
  aboutRestaurant: AboutRestaurantSection,
  locationHours: LocationHoursSection,
  onlineOrderingCTA: OnlineOrderingCTASection,
  specialOffers: SpecialOffersSection,
  // Portfolio sections
  portfolioHero: PortfolioHeroSection,
  workGallery: WorkGallerySection,
  aboutMe: AboutMeSection,
  servicesOffered: ServicesOfferedSection,
  skillsExpertise: SkillsExpertiseSection,
  processSection: ProcessWorkSection,
  hireMe: HireMeSection,
  // Church/NGO sections
  organizationHero: OrganizationHeroSection,
  missionSection: MissionSection,
  programsServices: ProgramsServicesSection,
  upcomingEventsList: UpcomingEventsListSection,
  sermonsResources: SermonsResourcesSection,
  impactProjects: ImpactProjectsSection,
  donationSection: DonationSection,
  volunteerSection: VolunteerSection,
  storiesTestimonials: StoriesTestimonialsSection,
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

