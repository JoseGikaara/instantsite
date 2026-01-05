export interface SectionConfig {
  type: string
  id: string
  order: number
}

export interface SectionDefinition {
  name: string
  required?: boolean
  cost: number
  needsAI: boolean
  description: string
  fields: string[]
  icon?: string
  websiteTypes?: string[] // Which website types this section is available for
}

// Website type constants
export const WEBSITE_TYPES = {
  LOCAL_BUSINESS: 'Local Business Website',
  WHATSAPP_LEAD: 'WhatsApp Lead Website',
  LANDING_PAGE: 'Landing Page',
  DIRECTORY: 'Directory Listing Page',
  EVENT: 'Event Website',
  RESTAURANT: 'Restaurant/Menu Website',
  PORTFOLIO: 'Portfolio Website',
  CHURCH_NGO: 'Church/NGO Website',
} as const

// Get sections available for a website type
export function getSectionsForType(websiteType: string): SectionDefinition[] {
  return Object.values(AVAILABLE_SECTIONS).filter(
    (section) => !section.websiteTypes || section.websiteTypes.includes(websiteType)
  )
}

export const AVAILABLE_SECTIONS: Record<string, SectionDefinition> = {
  // ========== COMMON SECTIONS (Available for all types) ==========
  hero: {
    name: 'Hero Section',
    required: true,
    cost: 0,
    needsAI: true,
    description: 'Compelling first impression with headline and CTA',
    fields: ['headline', 'subheadline', 'ctaText', 'heroImage'],
    icon: '🎯',
  },
  features: {
    name: 'Features Grid',
    cost: 0,
    needsAI: true,
    description: '3-6 feature highlights with icons',
    fields: ['features[]'],
    icon: '✨',
  },
  testimonials: {
    name: 'Customer Testimonials',
    cost: 0,
    needsAI: true,
    description: '3-5 customer reviews with photos',
    fields: ['testimonials[]'],
    icon: '💬',
  },
  gallery: {
    name: 'Image Gallery',
    cost: 0,
    needsAI: false,
    description: 'Photo grid showcasing work/products',
    fields: ['images[]'],
    icon: '📸',
  },
  pricing: {
    name: 'Pricing Table',
    cost: 0,
    needsAI: true,
    description: 'Service/product pricing tiers',
    fields: ['pricingTiers[]'],
    icon: '💰',
  },
  contact: {
    name: 'Contact Form',
    cost: 0,
    needsAI: false,
    description: 'Lead capture form',
    fields: ['formFields'],
    icon: '📧',
  },
  about: {
    name: 'About Section',
    cost: 0,
    needsAI: true,
    description: 'Company story and team',
    fields: ['aboutText', 'teamMembers[]'],
    icon: '👥',
  },
  faq: {
    name: 'FAQ Section',
    cost: 0,
    needsAI: true,
    description: 'Common questions answered',
    fields: ['faqs[]'],
    icon: '❓',
  },
  cta: {
    name: 'Call-to-Action Banner',
    cost: 0,
    needsAI: true,
    description: 'Conversion-focused banner',
    fields: ['ctaHeadline', 'ctaText', 'ctaButton'],
    icon: '🚀',
  },
  stats: {
    name: 'Statistics Counter',
    cost: 0,
    needsAI: true,
    description: 'Key metrics and achievements',
    fields: ['stats[]'],
    icon: '📊',
  },
  process: {
    name: 'How It Works',
    cost: 0,
    needsAI: true,
    description: 'Step-by-step process flow',
    fields: ['steps[]'],
    icon: '⚙️',
  },
  blog: {
    name: 'Blog Preview',
    cost: 0,
    needsAI: true,
    description: 'Latest articles/news',
    fields: ['posts[]'],
    icon: '📝',
  },

  // ========== WHATSAPP LEAD SECTIONS ==========
  whyWhatsApp: {
    name: 'Why WhatsApp Section',
    cost: 0,
    needsAI: true,
    description: '4 benefits of WhatsApp communication',
    fields: ['benefits[]'],
    icon: '💚',
    websiteTypes: [WEBSITE_TYPES.WHATSAPP_LEAD],
  },
  servicePackages: {
    name: 'Service Packages',
    cost: 0,
    needsAI: true,
    description: '3-4 service tiers with WhatsApp CTAs',
    fields: ['packages[]'],
    icon: '📦',
    websiteTypes: [WEBSITE_TYPES.WHATSAPP_LEAD],
  },
  whatsappConversation: {
    name: 'WhatsApp Conversation Preview',
    cost: 0,
    needsAI: true,
    description: 'Mock WhatsApp chat showing customer interaction',
    fields: ['messages[]'],
    icon: '💬',
    websiteTypes: [WEBSITE_TYPES.WHATSAPP_LEAD],
  },
  quickResponseGuarantee: {
    name: 'Quick Response Guarantee',
    cost: 0,
    needsAI: true,
    description: 'Response time guarantee banner with operating hours',
    fields: ['guaranteeText', 'responseTime', 'operatingHours'],
    icon: '⚡',
    websiteTypes: [WEBSITE_TYPES.WHATSAPP_LEAD],
  },

  // ========== LANDING PAGE SECTIONS ==========
  videoHero: {
    name: 'Video Hero Section',
    cost: 0,
    needsAI: true,
    description: 'Hero with video embed (YouTube/Vimeo) or image fallback',
    fields: ['headline', 'subheadline', 'videoUrl', 'ctaText'],
    icon: '🎥',
    websiteTypes: [WEBSITE_TYPES.LANDING_PAGE],
  },
  problemSolution: {
    name: 'Problem-Solution Framework',
    cost: 0,
    needsAI: true,
    description: 'Pain points and corresponding solutions',
    fields: ['problems[]', 'solutions[]'],
    icon: '🎯',
    websiteTypes: [WEBSITE_TYPES.LANDING_PAGE],
  },
  countdownTimer: {
    name: 'Countdown Timer',
    cost: 0,
    needsAI: true,
    description: 'Visual countdown with urgency messaging',
    fields: ['endDate', 'urgencyText'],
    icon: '⏰',
    websiteTypes: [WEBSITE_TYPES.LANDING_PAGE],
  },
  comparisonBeforeAfter: {
    name: 'Before & After Comparison',
    cost: 0,
    needsAI: true,
    description: 'Side-by-side comparison showing transformation',
    fields: ['before', 'after'],
    icon: '⚖️',
    websiteTypes: [WEBSITE_TYPES.LANDING_PAGE],
  },
  socialProofBar: {
    name: 'Social Proof Bar',
    cost: 0,
    needsAI: true,
    description: 'Follower counts, customer numbers, trust badges',
    fields: ['stats[]', 'badges[]'],
    icon: '⭐',
    websiteTypes: [WEBSITE_TYPES.LANDING_PAGE],
  },
  trustBadges: {
    name: 'Trust Badges',
    cost: 0,
    needsAI: true,
    description: 'Payment methods, guarantees, security badges',
    fields: ['badges[]', 'guaranteeText'],
    icon: '🛡️',
    websiteTypes: [WEBSITE_TYPES.LANDING_PAGE],
  },

  // ========== DIRECTORY SECTIONS ==========
  searchFilterBar: {
    name: 'Search & Filter Bar',
    cost: 0,
    needsAI: false,
    description: 'Search by name, filter by category and location',
    fields: ['categories[]', 'locations[]'],
    icon: '🔍',
    websiteTypes: [WEBSITE_TYPES.DIRECTORY],
  },
  categoryGrid: {
    name: 'Category Grid',
    cost: 0,
    needsAI: true,
    description: '8-12 category tiles with business counts',
    fields: ['categories[]'],
    icon: '📂',
    websiteTypes: [WEBSITE_TYPES.DIRECTORY],
  },
  featuredListings: {
    name: 'Featured Listings',
    cost: 0,
    needsAI: true,
    description: '3-4 premium/sponsored businesses',
    fields: ['businesses[]'],
    icon: '⭐',
    websiteTypes: [WEBSITE_TYPES.DIRECTORY],
  },
  businessListingsGrid: {
    name: 'Business Listings Grid',
    cost: 0,
    needsAI: true,
    description: '20-50 business cards with ratings and contact info',
    fields: ['businesses[]'],
    icon: '🏢',
    websiteTypes: [WEBSITE_TYPES.DIRECTORY],
  },
  mapView: {
    name: 'Map View',
    cost: 0,
    needsAI: false,
    description: 'Interactive map showing business locations',
    fields: ['businesses[]'],
    icon: '🗺️',
    websiteTypes: [WEBSITE_TYPES.DIRECTORY],
  },
  addBusinessCTA: {
    name: 'Add Your Business CTA',
    cost: 0,
    needsAI: true,
    description: 'Prominent section for business owners to list',
    fields: ['ctaText', 'contactInfo'],
    icon: '➕',
    websiteTypes: [WEBSITE_TYPES.DIRECTORY],
  },

  // ========== EVENT SECTIONS ==========
  eventHero: {
    name: 'Event Hero',
    cost: 0,
    needsAI: true,
    description: 'Event name, date, time, venue with CTA',
    fields: ['eventName', 'date', 'time', 'venue', 'ctaText'],
    icon: '🎉',
    websiteTypes: [WEBSITE_TYPES.EVENT],
  },
  eventDetails: {
    name: 'Event Details',
    cost: 0,
    needsAI: true,
    description: 'When, where, dress code, parking info',
    fields: ['date', 'time', 'venue', 'dressCode', 'parking'],
    icon: '📅',
    websiteTypes: [WEBSITE_TYPES.EVENT],
  },
  scheduleAgenda: {
    name: 'Schedule/Agenda',
    cost: 0,
    needsAI: true,
    description: 'Timeline of events with speakers/performers',
    fields: ['sessions[]'],
    icon: '📋',
    websiteTypes: [WEBSITE_TYPES.EVENT],
  },
  speakersPerformers: {
    name: 'Speakers/Performers',
    cost: 0,
    needsAI: true,
    description: '3-6 featured individuals with photos and bios',
    fields: ['speakers[]'],
    icon: '🎤',
    websiteTypes: [WEBSITE_TYPES.EVENT],
  },
  ticketPricing: {
    name: 'Ticket/Pricing Tiers',
    cost: 0,
    needsAI: true,
    description: 'Early bird, Regular, VIP options with benefits',
    fields: ['tiers[]'],
    icon: '🎫',
    websiteTypes: [WEBSITE_TYPES.EVENT],
  },
  venueSection: {
    name: 'Venue Section',
    cost: 0,
    needsAI: true,
    description: 'Venue photos, address, directions, parking',
    fields: ['venueName', 'address', 'directions', 'parking'],
    icon: '📍',
    websiteTypes: [WEBSITE_TYPES.EVENT],
  },
  rsvpForm: {
    name: 'RSVP/Registration Form',
    cost: 0,
    needsAI: true,
    description: 'Registration form with WhatsApp confirmation',
    fields: ['formFields', 'confirmationText'],
    icon: '✍️',
    websiteTypes: [WEBSITE_TYPES.EVENT],
  },
  sponsors: {
    name: 'Sponsors Section',
    cost: 0,
    needsAI: false,
    description: 'Sponsor logos in tiers with CTA',
    fields: ['sponsors[]'],
    icon: '🤝',
    websiteTypes: [WEBSITE_TYPES.EVENT],
  },

  // ========== RESTAURANT SECTIONS ==========
  restaurantHero: {
    name: 'Restaurant Hero',
    cost: 0,
    needsAI: true,
    description: 'Restaurant name, tagline, hero food image, hours',
    fields: ['restaurantName', 'tagline', 'heroImage', 'openingHours'],
    icon: '🍽️',
    websiteTypes: [WEBSITE_TYPES.RESTAURANT],
  },
  menuSection: {
    name: 'Menu Section',
    cost: 0,
    needsAI: true,
    description: '25-30 menu items across categories with prices',
    fields: ['menuItems[]'],
    icon: '📋',
    websiteTypes: [WEBSITE_TYPES.RESTAURANT],
  },
  aboutRestaurant: {
    name: 'About the Restaurant',
    cost: 0,
    needsAI: true,
    description: 'Story, chef info, cuisine style',
    fields: ['story', 'chefInfo', 'cuisineStyle'],
    icon: '👨‍🍳',
    websiteTypes: [WEBSITE_TYPES.RESTAURANT],
  },
  locationHours: {
    name: 'Location & Hours',
    cost: 0,
    needsAI: true,
    description: 'Address, map, opening hours, contact',
    fields: ['address', 'hours', 'phone', 'whatsapp'],
    icon: '🕐',
    websiteTypes: [WEBSITE_TYPES.RESTAURANT],
  },
  onlineOrderingCTA: {
    name: 'Online Ordering CTA',
    cost: 0,
    needsAI: true,
    description: 'Ordering options and delivery areas',
    fields: ['orderingOptions[]', 'deliveryAreas[]'],
    icon: '🛒',
    websiteTypes: [WEBSITE_TYPES.RESTAURANT],
  },
  specialOffers: {
    name: 'Special Offers/Daily Specials',
    cost: 0,
    needsAI: true,
    description: 'Today\'s special, happy hour, loyalty program',
    fields: ['offers[]'],
    icon: '🎁',
    websiteTypes: [WEBSITE_TYPES.RESTAURANT],
  },

  // ========== PORTFOLIO SECTIONS ==========
  portfolioHero: {
    name: 'Portfolio Hero',
    cost: 0,
    needsAI: true,
    description: 'Professional headshot, name, title, tagline',
    fields: ['name', 'title', 'tagline', 'headshot'],
    icon: '👤',
    websiteTypes: [WEBSITE_TYPES.PORTFOLIO],
  },
  workGallery: {
    name: 'Work/Projects Gallery',
    cost: 0,
    needsAI: true,
    description: '9-20 project cards with images and details',
    fields: ['projects[]'],
    icon: '🎨',
    websiteTypes: [WEBSITE_TYPES.PORTFOLIO],
  },
  aboutMe: {
    name: 'About Me',
    cost: 0,
    needsAI: true,
    description: 'Extended bio, skills, experience, awards',
    fields: ['bio', 'skills[]', 'experience[]', 'awards[]'],
    icon: '📖',
    websiteTypes: [WEBSITE_TYPES.PORTFOLIO],
  },
  servicesOffered: {
    name: 'Services Offered',
    cost: 0,
    needsAI: true,
    description: '3-6 service cards with pricing',
    fields: ['services[]'],
    icon: '💼',
    websiteTypes: [WEBSITE_TYPES.PORTFOLIO],
  },
  skillsExpertise: {
    name: 'Skills/Expertise',
    cost: 0,
    needsAI: true,
    description: '8-10 professional skills with proficiency',
    fields: ['skills[]'],
    icon: '🎯',
    websiteTypes: [WEBSITE_TYPES.PORTFOLIO],
  },
  processSection: {
    name: 'Process/How I Work',
    cost: 0,
    needsAI: true,
    description: '4-6 step work process',
    fields: ['steps[]'],
    icon: '⚙️',
    websiteTypes: [WEBSITE_TYPES.PORTFOLIO],
  },
  hireMe: {
    name: 'Contact/Hire Me',
    cost: 0,
    needsAI: true,
    description: 'Contact form, availability, social links',
    fields: ['contactInfo', 'availability', 'socialLinks[]'],
    icon: '📞',
    websiteTypes: [WEBSITE_TYPES.PORTFOLIO],
  },

  // ========== CHURCH/NGO SECTIONS ==========
  organizationHero: {
    name: 'Organization Hero',
    cost: 0,
    needsAI: true,
    description: 'Organization name, mission statement, hero image',
    fields: ['organizationName', 'missionStatement', 'heroImage'],
    icon: '⛪',
    websiteTypes: [WEBSITE_TYPES.CHURCH_NGO],
  },
  missionSection: {
    name: 'About Our Mission',
    cost: 0,
    needsAI: true,
    description: 'History, vision, values, leadership',
    fields: ['history', 'vision', 'values[]', 'leadership[]'],
    icon: '🎯',
    websiteTypes: [WEBSITE_TYPES.CHURCH_NGO],
  },
  programsServices: {
    name: 'Programs/Services',
    cost: 0,
    needsAI: true,
    description: 'Weekly services or programs with schedules',
    fields: ['programs[]'],
    icon: '📅',
    websiteTypes: [WEBSITE_TYPES.CHURCH_NGO],
  },
  upcomingEventsList: {
    name: 'Upcoming Events',
    cost: 0,
    needsAI: true,
    description: 'Event cards with dates and RSVP links',
    fields: ['events[]'],
    icon: '📆',
    websiteTypes: [WEBSITE_TYPES.CHURCH_NGO],
  },
  sermonsResources: {
    name: 'Sermons/Resources',
    cost: 0,
    needsAI: true,
    description: 'Latest sermons, audio/video links, materials',
    fields: ['sermons[]'],
    icon: '📚',
    websiteTypes: [WEBSITE_TYPES.CHURCH_NGO],
  },
  impactProjects: {
    name: 'Impact/Projects',
    cost: 0,
    needsAI: true,
    description: 'Current projects, success stories, statistics',
    fields: ['projects[]', 'statistics[]'],
    icon: '💪',
    websiteTypes: [WEBSITE_TYPES.CHURCH_NGO],
  },
  donationSection: {
    name: 'Donation Section',
    cost: 0,
    needsAI: true,
    description: 'Why donate, tiers, M-Pesa details, transparency',
    fields: ['donationTiers[]', 'mpesaDetails', 'transparency'],
    icon: '💝',
    websiteTypes: [WEBSITE_TYPES.CHURCH_NGO],
  },
  volunteerSection: {
    name: 'Volunteer Section',
    cost: 0,
    needsAI: true,
    description: 'Volunteer opportunities and sign-up',
    fields: ['opportunities[]', 'signupForm'],
    icon: '🤝',
    websiteTypes: [WEBSITE_TYPES.CHURCH_NGO],
  },
  storiesTestimonials: {
    name: 'Stories/Testimonials',
    cost: 0,
    needsAI: true,
    description: 'Member testimonies or beneficiary stories',
    fields: ['stories[]'],
    icon: '💬',
    websiteTypes: [WEBSITE_TYPES.CHURCH_NGO],
  },
}

export const GLOBAL_FEATURES = {
  whatsappFloat: {
    name: 'Floating WhatsApp Button',
    cost: 0,
    description: 'Sticky WhatsApp chat button',
    icon: '💬',
  },
  newsletter: {
    name: 'Newsletter Popup',
    cost: 0,
    description: 'Email capture popup',
    icon: '📬',
  },
}

// AI Prompts organized by section type
export const SECTION_PROMPTS: Record<string, (businessInfo: any) => string> = {
  // ========== COMMON PROMPTS ==========
  hero: (info) => {
    if (info.websiteType === WEBSITE_TYPES.WHATSAPP_LEAD) {
      return `Generate a compelling headline for a ${info.businessName} (${info.websiteType}) that emphasizes quick WhatsApp response and personalized service in Kenya.
Services: ${info.services}
Location: ${info.location || 'Kenya'}

Return JSON:
{
  "headline": "6-8 word headline emphasizing WhatsApp communication",
  "subheadline": "15-20 word description highlighting instant connection",
  "ctaText": "Chat on WhatsApp",
  "heroImage": "Description of ideal hero image",
  "responseTimeBadge": "We respond within 1 hour"
}`
    }
    return `Generate compelling hero section content for a ${info.websiteType} website.
Business: ${info.businessName}
Services: ${info.services}
Location: ${info.location || 'Kenya'}

Return JSON:
{
  "headline": "Powerful 6-8 word headline",
  "subheadline": "Compelling 15-20 word description",
  "ctaText": "Strong CTA button text",
  "heroImage": "Description of ideal hero image"
}`
  },

  testimonials: (info) => `Generate 4 realistic customer testimonials for ${info.businessName}.
Industry: ${info.websiteType}
Services: ${info.services}
Location/Region: ${info.location || 'Kenya'}

IMPORTANT: Use realistic names that match the region/country. For Kenya/East Africa, use names like:
- First names: James, Mary, John, Sarah, Peter, Grace, David, Jane, Joseph, Elizabeth, Michael, Susan
- Last names: Ochieng, Wanjiru, Kamau, Njeri, Otieno, Muthoni, Kipchoge, Akinyi, Omondi, Wambui

Return JSON array:
[
  {
    "name": "Realistic regional name (e.g., 'James Ochieng' for Kenya)",
    "role": "Their role/title",
    "image": "avatar-1",
    "rating": 5,
    "text": "2-3 sentence authentic review in natural language",
    "location": "City from the region (e.g., 'Nairobi, Kenya')"
  }
]`,

  features: (info) => `Generate 4-6 key features for ${info.businessName}.
Services: ${info.services}
Industry: ${info.websiteType}
Location: ${info.location || 'Kenya'}

Return JSON array:
[
  {
    "title": "Feature name",
    "description": "2 sentence benefit",
    "icon": "icon-name"
  }
]`,

  pricing: (info) => `Generate 3 pricing tiers for ${info.businessName}.
Services: ${info.services}
Location: ${info.location || 'Kenya'}

IMPORTANT: All prices must be in KES (Kenyan Shillings). Use format "KES X,XXX"

Return JSON array:
[
  {
    "name": "Tier name",
    "price": "KES X,XXX",
    "features": ["feature1", "feature2"],
    "popular": false
  }
]`,

  about: (info) => `Generate about section content for ${info.businessName}.
Location: ${info.location || 'Kenya'}
Services: ${info.services}

Return JSON:
{
  "aboutText": "2-3 paragraph company story",
  "mission": "Company mission statement",
  "values": ["value1", "value2", "value3"]
}`,

  faq: (info) => `Generate 5-7 FAQs for ${info.businessName}.
Services: ${info.services}
Industry: ${info.websiteType}
Location: ${info.location || 'Kenya'}

Return JSON array:
[
  {
    "question": "Common question",
    "answer": "2-3 sentence answer"
  }
]`,

  stats: (info) => `Generate 4 key statistics for ${info.businessName}.
Industry: ${info.websiteType}
Location: ${info.location || 'Kenya'}

Return JSON array:
[
  {
    "number": "1000+",
    "label": "Statistic label",
    "icon": "icon-name"
  }
]`,

  process: (info) => `Generate 4-5 step process for ${info.businessName}.
Services: ${info.services}
Location: ${info.location || 'Kenya'}

Return JSON array:
[
  {
    "step": 1,
    "title": "Step title",
    "description": "Step description"
  }
]`,

  cta: (info) => `Generate CTA banner content for ${info.businessName}.
Services: ${info.services}
Location: ${info.location || 'Kenya'}

Return JSON:
{
  "ctaHeadline": "Compelling headline",
  "ctaText": "Supporting text",
  "ctaButton": "Button text"
}`,

  blog: (info) => `Generate 3 blog post previews for ${info.businessName}.
Industry: ${info.websiteType}
Location: ${info.location || 'Kenya'}

Return JSON array:
[
  {
    "title": "Post title",
    "excerpt": "2 sentence excerpt",
    "date": "Recent date",
    "image": "post-image"
  }
]`,

  // ========== WHATSAPP LEAD PROMPTS ==========
  whyWhatsApp: (info) => `Generate 4 benefits of using WhatsApp for ${info.businessName} (${info.services}) services in Kenya.
Focus on: Speed, Personal connection, Security, Convenience

Return JSON array:
[
  {
    "title": "Benefit name (e.g., 'Instant Response')",
    "description": "2 sentence explanation",
    "icon": "icon-name"
  }
]`,

  servicePackages: (info) => `Generate 3 service packages for ${info.businessName} (${info.services}) in Kenya with names, prices in KES, and 4-5 features each.
Location: ${info.location || 'Kenya'}

Return JSON array:
[
  {
    "name": "Package name",
    "price": "KES X,XXX",
    "features": ["feature1", "feature2", "feature3", "feature4"],
    "whatsappCTA": "Chat on WhatsApp"
  }
]`,

  whatsappConversation: (info) => `Generate a realistic WhatsApp conversation between a customer and ${info.businessName} (${info.services}) in Kenya, showing 4-6 message exchanges about the service.
Location: ${info.location || 'Kenya'}

Return JSON array:
[
  {
    "sender": "customer" | "business",
    "message": "Message text",
    "time": "HH:MM"
  }
]`,

  quickResponseGuarantee: (info) => `Generate trust-building text for response guarantee for ${info.businessName} (${info.services}) in Kenya.
Include: Response time (1 hour), operating hours, guarantee statement

Return JSON:
{
  "guaranteeText": "Get a response in under 1 hour - Guaranteed",
  "responseTime": "1 hour",
  "operatingHours": "Mon-Fri: 8am-8pm, Sat: 9am-5pm",
  "ctaText": "Start Chatting Now"
}`,

  // ========== LANDING PAGE PROMPTS ==========
  videoHero: (info) => `Generate a compelling headline and subheadline for a ${info.websiteType} landing page targeting ${info.services} audience in Kenya.
Product/Offer: ${info.businessName}
Location: ${info.location || 'Kenya'}

Return JSON:
{
  "headline": "Powerful headline",
  "subheadline": "Compelling description",
  "videoUrl": "Optional YouTube/Vimeo URL",
  "ctaText": "Strong CTA button"
}`,

  problemSolution: (info) => `Generate 3-4 problems that ${info.services} audience faces in Kenya and the solutions that ${info.businessName} provides.

Return JSON:
{
  "problems": [
    {
      "title": "Problem title",
      "description": "Problem description"
    }
  ],
  "solutions": [
    {
      "title": "Solution title",
      "description": "How we solve it"
    }
  ]
}`,

  countdownTimer: (info) => `Generate urgency-driven copy for a limited-time offer for ${info.businessName} (${info.services}) in Kenya.

Return JSON:
{
  "endDate": "YYYY-MM-DD",
  "urgencyText": "Offer ends in...",
  "ctaText": "Claim Your Spot Now"
}`,

  comparisonBeforeAfter: (info) => `Generate a comparison showing life before and after using ${info.businessName} (${info.services}) for ${info.services} audience in Kenya.

Return JSON:
{
  "before": {
    "title": "Without us",
    "points": ["point1", "point2", "point3"]
  },
  "after": {
    "title": "With us",
    "points": ["point1", "point2", "point3"]
  }
}`,

  socialProofBar: (info) => `Generate compelling social proof statistics for ${info.businessName} (${info.websiteType}) in Kenya.

Return JSON:
{
  "stats": [
    {"label": "Happy Customers", "value": "1000+"},
    {"label": "5-Star Reviews", "value": "500+"}
  ],
  "badges": ["As featured in...", "Trusted by..."]
}`,

  trustBadges: (info) => `Generate trust-building guarantee text for ${info.businessName} (${info.services}) in Kenya.

Return JSON:
{
  "badges": ["M-Pesa Accepted", "Secure Checkout", "Money-Back Guarantee"],
  "guaranteeText": "30-day money-back guarantee",
  "paymentMethods": ["M-Pesa", "Card", "Bank Transfer"]
}`,

  // ========== DIRECTORY PROMPTS ==========
  categoryGrid: (info) => `Generate 8-12 relevant business categories for a ${info.services} directory in Kenya.

Return JSON array:
[
  {
    "name": "Category name",
    "icon": "icon-name",
    "count": 15
  }
]`,

  featuredListings: (info) => `Generate detailed business profiles for 3 featured ${info.services} businesses in Kenya including name, tagline, services, contact.

Return JSON array:
[
  {
    "name": "Business name",
    "tagline": "Business tagline",
    "description": "Short description",
    "rating": 4.5,
    "location": "Nairobi area",
    "phone": "+254...",
    "whatsapp": "+254...",
    "website": "website.com"
  }
]`,

  businessListingsGrid: (info) => `Generate 20 realistic business listings for ${info.services} category in Kenya with name, description, location, phone, and rating.

Return JSON array:
[
  {
    "name": "Business name",
    "description": "2 sentence description",
    "category": "Category",
    "location": "Nairobi area",
    "phone": "+254...",
    "rating": 4.0,
    "reviews": 25,
    "featured": false
  }
]`,

  addBusinessCTA: (info) => `Generate compelling copy encouraging business owners to list their ${info.services} business in this directory in Kenya.

Return JSON:
{
  "headline": "List Your Business",
  "description": "2-3 sentence benefits",
  "ctaText": "Add Your Business",
  "contactInfo": "WhatsApp or email"
}`,

  // ========== EVENT PROMPTS ==========
  eventHero: (info) => `Generate an exciting headline and description for a ${info.services} event happening in ${info.location || 'Nairobi'}, Kenya on ${info.date || 'specified date'}.

Return JSON:
{
  "eventName": "${info.businessName}",
  "headline": "Exciting headline",
  "description": "Event description",
  "date": "Date",
  "time": "Time",
  "venue": "Venue name",
  "ctaText": "Register Now"
}`,

  eventDetails: (info) => `Generate detailed event information for ${info.services} event including venue details, timing, and what attendees should bring/wear.

Location: ${info.location || 'Kenya'}

Return JSON:
{
  "date": "Full date",
  "time": "Start and end time",
  "venue": {
    "name": "Venue name",
    "address": "Full address",
    "directions": "How to get there"
  },
  "dressCode": "Dress code or requirements",
  "parking": "Parking information"
}`,

  scheduleAgenda: (info) => `Generate a detailed event schedule for ${info.services} event with 5-8 activities/sessions including times and descriptions.

Return JSON array:
[
  {
    "time": "HH:MM - HH:MM",
    "title": "Session title",
    "description": "Session description",
    "speaker": "Speaker name (optional)"
  }
]`,

  speakersPerformers: (info) => `Generate profiles for 3-4 speakers/performers for ${info.services} event in Kenya including names, titles, and short bios.

Return JSON array:
[
  {
    "name": "Speaker name",
    "title": "Their title/role",
    "bio": "2-3 sentence bio",
    "image": "speaker-image",
    "socialLinks": {}
  }
]`,

  ticketPricing: (info) => `Generate 3 ticket tiers for ${info.services} event in Kenya with names, prices in KES, and included benefits.

Return JSON array:
[
  {
    "name": "Early Bird / Regular / VIP",
    "price": "KES X,XXX",
    "features": ["feature1", "feature2"],
    "available": true
  }
]`,

  venueSection: (info) => `Generate venue description and directions for ${info.location || 'venue'} in ${info.location || 'Nairobi'}, Kenya.

Return JSON:
{
  "venueName": "Venue name",
  "address": "Full address",
  "description": "Venue description",
  "directions": "How to get there",
  "parking": "Parking details",
  "mapUrl": "Optional map URL"
}`,

  rsvpForm: (info) => `Generate friendly RSVP confirmation text for ${info.services} event in Kenya.

Return JSON:
{
  "formFields": ["name", "email", "phone", "ticketQuantity"],
  "confirmationText": "Thank you message",
  "whatsappOption": "Optional WhatsApp confirmation"
}`,

  // ========== RESTAURANT PROMPTS ==========
  restaurantHero: (info) => `Generate an appetizing headline and tagline for a ${info.services} restaurant in ${info.location || 'Nairobi'}, Kenya.

Return JSON:
{
  "restaurantName": "${info.businessName}",
  "tagline": "Appetizing tagline",
  "headline": "Compelling headline",
  "openingHours": "Mon-Sun: 8am-10pm",
  "ctaText": "View Menu"
}`,

  menuSection: (info) => `Generate a menu for a ${info.services} restaurant in Kenya with 25 items across categories (Appetizers, Main Course, Desserts, Drinks) including names, descriptions, and prices in KES.

Return JSON:
{
  "categories": [
    {
      "name": "Category name",
      "items": [
        {
          "name": "Item name",
          "description": "Item description",
          "price": "KES X,XXX",
          "dietaryTags": ["Vegetarian", "Spicy", etc.]
        }
      ]
    }
  ]
}`,

  aboutRestaurant: (info) => `Generate an engaging 'About Us' story for a ${info.services} restaurant in ${info.location || 'Nairobi'}, Kenya.

Return JSON:
{
  "story": "2-3 paragraph restaurant story",
  "chefInfo": "Chef information",
  "cuisineStyle": "Cuisine style and ingredients"
}`,

  locationHours: (info) => `Generate welcoming text for restaurant location and hours section for ${info.businessName} in ${info.location || 'Nairobi'}, Kenya.

Return JSON:
{
  "address": "Full address",
  "hours": {
    "monday": "8am-10pm",
    "tuesday": "8am-10pm",
    // etc.
  },
  "phone": "+254...",
  "whatsapp": "+254...",
  "email": "email@example.com"
}`,

  onlineOrderingCTA: (info) => `Generate compelling text encouraging customers to order from ${info.businessName} (${info.services}) in Kenya.

Return JSON:
{
  "headline": "Order Now",
  "description": "Ordering options",
  "options": ["Order on Glovo", "Call to Order", "WhatsApp Your Order"],
  "deliveryAreas": ["Area1", "Area2"]
}`,

  specialOffers: (info) => `Generate 3 special offers or promotions for ${info.services} restaurant in Kenya.

Return JSON array:
[
  {
    "title": "Offer title",
    "description": "Offer description",
    "validUntil": "Date",
    "terms": "Terms and conditions"
  }
]`,

  // ========== PORTFOLIO PROMPTS ==========
  portfolioHero: (info) => `Generate a professional headline and bio for a ${info.services} professional based in ${info.location || 'Nairobi'}, Kenya.

Return JSON:
{
  "name": "${info.businessName}",
  "title": "Professional title",
  "tagline": "Award-winning [profession]",
  "headline": "Compelling headline",
  "bio": "2-3 sentence professional bio"
}`,

  workGallery: (info) => `Generate 12 portfolio project descriptions for a ${info.services} professional including project names, categories, and brief descriptions.

Return JSON array:
[
  {
    "title": "Project name",
    "category": "Category",
    "description": "Project description",
    "image": "project-image",
    "client": "Client name (optional)"
  }
]`,

  aboutMe: (info) => `Generate a compelling 'About Me' section for a ${info.services} professional with experience in Kenya.

Return JSON:
{
  "bio": "Extended bio (3-4 paragraphs)",
  "experience": "Years of experience",
  "education": ["Education1", "Education2"],
  "awards": ["Award1", "Award2"]
}`,

  servicesOffered: (info) => `Generate 4 services offered by a ${info.services} professional in Kenya with descriptions and pricing guidance.

Return JSON array:
[
  {
    "name": "Service name",
    "description": "Service description",
    "deliverables": ["deliverable1", "deliverable2"],
    "startingPrice": "KES X,XXX" or "Get Quote"
  }
]`,

  skillsExpertise: (info) => `Generate 8-10 professional skills for a ${info.services} professional.

Return JSON array:
[
  {
    "name": "Skill name",
    "proficiency": "Expert" | "Advanced" | "Intermediate",
    "icon": "icon-name"
  }
]`,

  processSection: (info) => `Generate a 4-step work process for a ${info.services} professional.

Return JSON array:
[
  {
    "step": 1,
    "title": "Step title (e.g., 'Discovery')",
    "description": "Step description"
  }
]`,

  hireMe: (info) => `Generate compelling 'Hire Me' call-to-action text for a ${info.services} professional in Kenya.

Return JSON:
{
  "headline": "Let's Work Together",
  "description": "Availability and contact info",
  "availability": "Available for new projects",
  "contactMethods": ["email", "phone", "whatsapp"],
  "socialLinks": {
    "instagram": "handle",
    "linkedin": "handle",
    "behance": "handle"
  }
}`,

  // ========== CHURCH/NGO PROMPTS ==========
  organizationHero: (info) => `Generate an inspiring mission statement and welcome message for a ${info.services} (${info.websiteType}) in ${info.location || 'Nairobi'}, Kenya.

Return JSON:
{
  "organizationName": "${info.businessName}",
  "missionStatement": "Inspiring mission statement",
  "welcomeMessage": "Welcome message",
  "ctaText": "Join Us" or "Donate"
}`,

  missionSection: (info) => `Generate an 'About Us' section for a ${info.services} (${info.websiteType}) in Kenya including history, mission, and impact.

Return JSON:
{
  "history": "Organization history (2-3 paragraphs)",
  "vision": "Vision statement",
  "values": ["value1", "value2", "value3"],
  "leadership": [
    {
      "name": "Leader name",
      "role": "Role",
      "bio": "Short bio"
    }
  ]
}`,

  programsServices: (info) => `Generate 5-6 programs or services offered by a ${info.services} (${info.websiteType}) in Kenya with descriptions and schedules.

Return JSON array:
[
  {
    "name": "Program/Service name",
    "description": "Program description",
    "schedule": "Day and time",
    "location": "Location"
  }
]`,

  upcomingEventsList: (info) => `Generate 4 upcoming events for a ${info.services} (${info.websiteType}) in Kenya including dates, descriptions, and purposes.

Return JSON array:
[
  {
    "title": "Event title",
    "date": "Date",
    "time": "Time",
    "description": "Event description",
    "purpose": "Event purpose",
    "rsvpLink": "Optional RSVP link"
  }
]`,

  sermonsResources: (info) => `Generate descriptions for recent sermons or teachings at ${info.businessName} in Kenya.

Return JSON array:
[
  {
    "title": "Sermon/Teaching title",
    "date": "Date",
    "speaker": "Speaker name",
    "description": "Description",
    "audioUrl": "Optional audio link",
    "videoUrl": "Optional video link"
  }
]`,

  impactProjects: (info) => `Generate compelling impact statistics and project descriptions for a ${info.services} organization in Kenya.

Return JSON:
{
  "statistics": [
    {"label": "People Helped", "value": "1000+"},
    {"label": "Funds Raised", "value": "KES 500,000+"}
  ],
  "projects": [
    {
      "name": "Project name",
      "description": "Project description",
      "impact": "Impact achieved"
    }
  ]
}`,

  donationSection: (info) => `Generate compelling donation appeal text for ${info.businessName} (${info.services}) explaining impact and need in Kenya.

Return JSON:
{
  "headline": "Support Our Mission",
  "description": "Why donate (2-3 paragraphs)",
  "donationTiers": [
    {
      "name": "One-time",
      "amounts": ["KES 500", "KES 1,000", "KES 5,000"],
      "description": "One-time donation"
    },
    {
      "name": "Monthly",
      "amounts": ["KES 500/month", "KES 1,000/month"],
      "description": "Recurring monthly support"
    }
  ],
  "mpesaDetails": {
    "paybill": "Paybill number",
    "account": "Account number",
    "instructions": "M-Pesa payment instructions"
  },
  "transparency": "How funds are used"
}`,

  volunteerSection: (info) => `Generate volunteer opportunity descriptions for ${info.businessName} (${info.services}) in Kenya.

Return JSON:
{
  "headline": "Get Involved",
  "description": "Why volunteer",
  "opportunities": [
    {
      "title": "Opportunity title",
      "description": "What volunteers will do",
      "timeCommitment": "Time required",
      "requirements": ["requirement1", "requirement2"]
    }
  ],
  "signupForm": "Contact info for signup"
}`,

  storiesTestimonials: (info) => `Generate 3 testimonials from members/beneficiaries of ${info.businessName} (${info.services}) in Kenya sharing their positive experiences.

Use realistic Kenyan names.

Return JSON array:
[
  {
    "name": "Member/Beneficiary name",
    "role": "Member" or "Beneficiary",
    "story": "2-3 sentence testimonial",
    "image": "avatar-image"
  }
]`,
}
