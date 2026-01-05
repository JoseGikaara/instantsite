import { SECTION_PROMPTS, AVAILABLE_SECTIONS } from './section-types'

interface BusinessInfo {
  businessName: string
  phone?: string
  location?: string
  services: string
  websiteType: string
  date?: string // For events
  // Section configurations for enhanced AI generation
  heroConfig?: any
  galleryConfig?: any
  contactConfig?: any
  [key: string]: any // Allow additional configs
}

/**
 * Get appropriate max_tokens based on section type
 */
function getMaxTokensForSection(sectionType: string): number {
  // Sections that need more content
  const largeSections = [
    'menuSection',
    'businessListingsGrid',
    'workGallery',
    'scheduleAgenda',
    'programsServices',
  ]
  
  if (largeSections.includes(sectionType)) {
    return 2000 // More tokens for complex sections
  }
  
  return 1500 // Default for most sections
}

/**
 * Generate fallback content for a section if AI fails
 */
function getFallbackContent(sectionType: string, businessInfo: BusinessInfo): any {
  const fallbacks: Record<string, any> = {
    // Common sections
    hero: {
      headline: `Welcome to ${businessInfo.businessName}`,
      subheadline: `Your trusted partner in ${businessInfo.services}`,
      ctaText: 'Get Started',
      heroImage: 'Professional business image',
    },
    features: [
      { title: 'Quality Service', description: 'We deliver exceptional quality', icon: '✨' },
      { title: 'Expert Team', description: 'Experienced professionals', icon: '👥' },
      { title: 'Fast Delivery', description: 'Quick turnaround times', icon: '⚡' },
      { title: 'Great Support', description: '24/7 customer support', icon: '💬' },
    ],
    testimonials: [
      {
        name: 'John Doe',
        role: 'Customer',
        image: 'avatar-1',
        rating: 5,
        text: 'Great service and excellent results!',
        location: businessInfo.location || 'Kenya',
      },
    ],
    pricing: [
      {
        name: 'Basic',
        price: 'KES 5,000',
        features: ['Feature 1', 'Feature 2'],
        popular: false,
      },
    ],
    // WhatsApp Lead sections
    whyWhatsApp: {
      benefits: [
        { title: 'Instant Response', description: 'Get answers immediately', icon: '⚡' },
        { title: 'Personal Connection', description: 'One-on-one conversation', icon: '💬' },
        { title: 'Secure & Private', description: 'Your data is protected', icon: '🔒' },
        { title: 'Convenient', description: 'Chat anytime, anywhere', icon: '📱' },
      ],
    },
    servicePackages: {
      packages: [
        { name: 'Basic Package', price: 'KES 5,000', features: ['Feature 1', 'Feature 2', 'Feature 3'], whatsappCTA: 'Chat on WhatsApp' },
        { name: 'Professional Package', price: 'KES 10,000', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], whatsappCTA: 'Chat on WhatsApp', popular: true },
      ],
    },
    quickResponseGuarantee: {
      guaranteeText: 'Get a response in under 1 hour - Guaranteed',
      responseTime: '1 hour',
      operatingHours: 'Mon-Fri: 8am-8pm, Sat: 9am-5pm',
      ctaText: 'Start Chatting Now',
    },
    // Landing Page sections
    videoHero: {
      headline: 'Transform Your Business Today',
      subheadline: 'Join thousands of successful entrepreneurs',
      ctaText: 'Get Started Now',
    },
    problemSolution: {
      problems: [
        { title: 'Problem 1', description: 'Description of problem' },
        { title: 'Problem 2', description: 'Description of problem' },
      ],
      solutions: [
        { title: 'Solution 1', description: 'How we solve it' },
        { title: 'Solution 2', description: 'How we solve it' },
      ],
    },
    countdownTimer: {
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      urgencyText: 'Limited Time Offer - Ends Soon!',
      ctaText: 'Claim Your Spot Now',
    },
    trustBadges: {
      badges: ['M-Pesa Accepted', 'Secure Checkout', 'Money-Back Guarantee'],
      guaranteeText: '30-day money-back guarantee',
      paymentMethods: ['M-Pesa', 'Card', 'Bank Transfer'],
    },
    // Event sections
    eventHero: {
      eventName: businessInfo.businessName,
      headline: 'Join Us for an Amazing Event',
      description: 'An unforgettable experience awaits',
      date: 'January 15, 2026',
      time: '10:00 AM - 6:00 PM',
      venue: businessInfo.location || 'Nairobi',
      ctaText: 'Register Now',
    },
    scheduleAgenda: {
      sessions: [
        { time: '10:00 AM - 11:00 AM', title: 'Welcome & Registration', description: 'Check-in and networking' },
        { time: '11:00 AM - 12:00 PM', title: 'Opening Keynote', description: 'Keynote address' },
      ],
    },
    ticketPricing: {
      tiers: [
        { name: 'Early Bird', price: 'KES 2,000', features: ['Full access', 'Lunch included'], available: true },
        { name: 'Regular', price: 'KES 3,000', features: ['Full access', 'Lunch included', 'Goodie bag'], available: true, popular: true },
      ],
    },
    // Restaurant sections
    restaurantHero: {
      restaurantName: businessInfo.businessName,
      tagline: 'Delicious food, great atmosphere',
      headline: 'Welcome to Our Restaurant',
      openingHours: 'Mon-Sun: 8am-10pm',
      ctaText: 'View Menu',
    },
    menuSection: {
      categories: [
        {
          name: 'Appetizers',
          items: [
            { name: 'Sample Appetizer', description: 'Delicious starter', price: 'KES 500', dietaryTags: [] },
          ],
        },
        {
          name: 'Main Course',
          items: [
            { name: 'Sample Main', description: 'Hearty main dish', price: 'KES 1,200', dietaryTags: [] },
          ],
        },
      ],
    },
    // Portfolio sections
    portfolioHero: {
      name: businessInfo.businessName,
      title: 'Professional Title',
      tagline: 'Award-winning professional',
      headline: 'Creative Professional',
      bio: 'Experienced professional with a passion for excellence',
    },
    workGallery: {
      projects: Array.from({ length: 9 }, (_, i) => ({
        title: `Project ${i + 1}`,
        category: 'Category',
        description: 'Project description',
        image: '',
      })),
    },
    servicesOffered: {
      services: [
        { name: 'Service 1', description: 'Service description', deliverables: ['Deliverable 1'], startingPrice: 'KES 5,000' },
        { name: 'Service 2', description: 'Service description', deliverables: ['Deliverable 1'], startingPrice: 'KES 10,000' },
      ],
    },
    // Church/NGO sections
    organizationHero: {
      organizationName: businessInfo.businessName,
      missionStatement: 'Our mission is to serve the community',
      welcomeMessage: 'Welcome to our organization',
      ctaText: 'Join Us',
    },
    donationSection: {
      headline: 'Support Our Mission',
      description: 'Your donation makes a difference',
      donationTiers: [
        { name: 'One-time', amounts: ['KES 500', 'KES 1,000'], description: 'One-time donation' },
        { name: 'Monthly', amounts: ['KES 500/month'], description: 'Recurring monthly support' },
      ],
      mpesaDetails: {
        paybill: '123456',
        account: 'Account Number',
        instructions: 'Go to M-Pesa, select Pay Bill, enter paybill number and account',
      },
      transparency: 'Funds are used for community programs and services',
    },
  }
  
  return fallbacks[sectionType] || null
}

/**
 * Generate AI content for a specific section
 */
export async function generateSectionContent(
  sectionType: string,
  businessInfo: BusinessInfo
): Promise<any> {
  try {
    const prompt = SECTION_PROMPTS[sectionType]?.(businessInfo)
    
    if (!prompt) {
      console.warn(`No prompt found for section type: ${sectionType}`)
      // Try to return fallback content
      return getFallbackContent(sectionType, businessInfo)
    }

    // Use DeepSeek API to generate content
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-c817cdf01ae84afcab78fd6d08b29f12'
    const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1'

    if (!DEEPSEEK_API_KEY) {
      console.warn('DeepSeek API key not configured, using fallback content')
      return getFallbackContent(sectionType, businessInfo)
    }

    const maxTokens = getMaxTokensForSection(sectionType)

    const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a professional website content writer specializing in Kenya/East Africa market. Always respond with valid JSON only, no markdown formatting, no code blocks. Ensure all prices are in KES (Kenyan Shillings). Use realistic Kenyan names and locations when appropriate.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: maxTokens,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`DeepSeek API error for ${sectionType}:`, response.status, errorText)
      return getFallbackContent(sectionType, businessInfo)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      console.error(`No content in DeepSeek response for ${sectionType}`)
      return getFallbackContent(sectionType, businessInfo)
    }

    // Parse JSON response - handle various formats
    let jsonContent = content.trim()
    
    // Remove markdown code blocks if present
    if (jsonContent.startsWith('```')) {
      jsonContent = jsonContent.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
    }
    
    // Remove any leading/trailing whitespace
    jsonContent = jsonContent.trim()

    try {
      const parsed = JSON.parse(jsonContent)
      
      // Validate that we got actual content
      if (parsed && typeof parsed === 'object') {
        return parsed
      }
      
      console.warn(`Invalid JSON structure for ${sectionType}, using fallback`)
      return getFallbackContent(sectionType, businessInfo)
    } catch (parseError) {
      console.error(`JSON parse error for ${sectionType}:`, parseError)
      console.error('Raw content:', jsonContent.substring(0, 200))
      return getFallbackContent(sectionType, businessInfo)
    }
  } catch (error) {
    console.error(`Error generating content for ${sectionType}:`, error)
    return getFallbackContent(sectionType, businessInfo)
  }
}

/**
 * Generate AI content for all selected sections
 * Uses parallel generation with batching to improve performance
 */
export async function generateAllSectionContent(
  sections: string[],
  businessInfo: BusinessInfo
): Promise<Record<string, any>> {
  const aiContent: Record<string, any> = {}

  // Filter sections that need AI
  const sectionsNeedingAI = sections.filter((sectionType) => {
    const sectionDef = AVAILABLE_SECTIONS[sectionType]
    return sectionDef?.needsAI
  })

  if (sectionsNeedingAI.length === 0) {
    return aiContent
  }

  console.log(`Generating AI content for ${sectionsNeedingAI.length} sections...`)

  // Generate content in batches to avoid overwhelming the API
  const batchSize = 3
  for (let i = 0; i < sectionsNeedingAI.length; i += batchSize) {
    const batch = sectionsNeedingAI.slice(i, i + batchSize)
    
    // Generate in parallel for this batch
    const batchPromises = batch.map(async (sectionType) => {
      try {
        const content = await generateSectionContent(sectionType, businessInfo)
        return { sectionType, content }
      } catch (error) {
        console.error(`Failed to generate content for ${sectionType}:`, error)
        return { sectionType, content: null }
      }
    })

    const batchResults = await Promise.all(batchPromises)
    
    // Store successful results
    for (const { sectionType, content } of batchResults) {
      if (content) {
        aiContent[sectionType] = content
      }
    }

    // Small delay between batches to avoid rate limiting
    if (i + batchSize < sectionsNeedingAI.length) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  console.log(`Successfully generated content for ${Object.keys(aiContent).length} sections`)
  return aiContent
}

