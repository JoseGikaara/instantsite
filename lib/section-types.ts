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
}

export const AVAILABLE_SECTIONS: Record<string, SectionDefinition> = {
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

export const SECTION_PROMPTS: Record<string, (businessInfo: any) => string> = {
  hero: (info) => `
Generate compelling hero section content for a ${info.websiteType} website.
Business: ${info.businessName}
Services: ${info.services}
Location: ${info.location}

Return JSON with:
{
  "headline": "Powerful 6-8 word headline",
  "subheadline": "Compelling 15-20 word description",
  "ctaText": "Strong CTA button text",
  "heroImage": "Description of ideal hero image"
}
`,

  testimonials: (info) => `
Generate 4 realistic customer testimonials for ${info.businessName}.
Industry: ${info.websiteType}
Services: ${info.services}
Location/Region: ${info.location || 'Kenya'}

IMPORTANT: Use realistic names that match the region/country. For Kenya/East Africa, use names like:
- First names: James, Mary, John, Sarah, Peter, Grace, David, Jane, Joseph, Elizabeth, Michael, Susan
- Last names: Ochieng, Wanjiru, Kamau, Njeri, Otieno, Muthoni, Kipchoge, Akinyi, Omondi, Wambui

For other regions, use culturally appropriate names for that location.

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
]
`,

  features: (info) => `
Generate 4-6 key features for ${info.businessName}.
Services: ${info.services}
Industry: ${info.websiteType}

Return JSON array:
[
  {
    "title": "Feature name",
    "description": "2 sentence benefit",
    "icon": "icon-name"
  }
]
`,

  pricing: (info) => `
Generate 3 pricing tiers for ${info.businessName}.
Services: ${info.services}

Return JSON array:
[
  {
    "name": "Tier name",
    "price": "$XX",
    "features": ["feature1", "feature2"],
    "popular": false
  }
]
`,

  about: (info) => `
Generate about section content for ${info.businessName}.
Location: ${info.location}
Services: ${info.services}

Return JSON:
{
  "aboutText": "2-3 paragraph company story",
  "mission": "Company mission statement",
  "values": ["value1", "value2", "value3"]
}
`,

  faq: (info) => `
Generate 5-7 FAQs for ${info.businessName}.
Services: ${info.services}
Industry: ${info.websiteType}

Return JSON array:
[
  {
    "question": "Common question",
    "answer": "2-3 sentence answer"
  }
]
`,

  stats: (info) => `
Generate 4 key statistics for ${info.businessName}.
Industry: ${info.websiteType}

Return JSON array:
[
  {
    "number": "1000+",
    "label": "Statistic label",
    "icon": "icon-name"
  }
]
`,

  process: (info) => `
Generate 4-5 step process for ${info.businessName}.
Services: ${info.services}

Return JSON array:
[
  {
    "step": 1,
    "title": "Step title",
    "description": "Step description"
  }
]
`,

  cta: (info) => `
Generate CTA banner content for ${info.businessName}.
Services: ${info.services}

Return JSON:
{
  "ctaHeadline": "Compelling headline",
  "ctaText": "Supporting text",
  "ctaButton": "Button text"
}
`,

  blog: (info) => `
Generate 3 blog post previews for ${info.businessName}.
Industry: ${info.websiteType}

Return JSON array:
[
  {
    "title": "Post title",
    "excerpt": "2 sentence excerpt",
    "date": "Recent date",
    "image": "post-image"
  }
]
`,
}

