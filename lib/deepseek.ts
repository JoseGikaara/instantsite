export interface AIContent {
  title: string
  hero: {
    headline: string
    subheadline: string
  }
  about: string
  services: string[]
  contact: {
    intro: string
    callout: string
  }
  ctas: string[]
  seo: {
    description: string
    keywords: string[]
  }
}

interface BusinessData {
  business_name: string
  phone: string
  location: string
  services: string
  website_type: string
}

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-c817cdf01ae84afcab78fd6d08b29f12'
const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1'

/**
 * Generate website content using DeepSeek API
 */
export async function generateWebsiteContent(
  businessData: BusinessData
): Promise<AIContent | null> {
  if (!DEEPSEEK_API_KEY) {
    console.warn('DeepSeek API key not configured')
    return null
  }

  try {
    const prompt = `You are a professional website content writer. Generate compelling website content for a business.

Business Information:
- Name: ${businessData.business_name}
- Phone: ${businessData.phone}
- Location: ${businessData.location}
- Services: ${businessData.services}
- Website Type: ${businessData.website_type}

Generate a JSON response with the following structure:
{
  "title": "SEO-optimized page title (max 60 characters)",
  "hero": {
    "headline": "Compelling main headline (max 10 words)",
    "subheadline": "Supporting subheadline (max 20 words)"
  },
  "about": "Engaging about section (2-3 sentences, max 200 characters)",
  "services": ["Service 1", "Service 2", "Service 3"],
  "contact": {
    "intro": "Contact section introduction (1 sentence)",
    "callout": "Call-to-action text (max 10 words)"
  },
  "ctas": ["Primary CTA text", "Secondary CTA text"],
  "seo": {
    "description": "Meta description (max 160 characters)",
    "keywords": ["keyword1", "keyword2", "keyword3"]
  }
}

Return ONLY valid JSON, no markdown, no code blocks.`

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
            content: 'You are a professional website content writer. Always respond with valid JSON only, no markdown formatting.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('DeepSeek API error:', response.status, errorData)
      return null
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      console.error('No content in DeepSeek response')
      return null
    }

    // Parse JSON response (handle markdown code blocks if present)
    let jsonContent = content.trim()
    if (jsonContent.startsWith('```')) {
      jsonContent = jsonContent.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
    }

    const aiContent: AIContent = JSON.parse(jsonContent)

    // Validate structure
    if (
      !aiContent.title ||
      !aiContent.hero?.headline ||
      !aiContent.about ||
      !Array.isArray(aiContent.services)
    ) {
      console.error('Invalid AI content structure')
      return null
    }

    return aiContent
  } catch (error) {
    console.error('Error generating AI content:', error)
    return null
  }
}

/**
 * Rate limiting check (simple in-memory cache)
 * Max 10 requests per minute per agent
 */
const rateLimitCache = new Map<string, number[]>()

export function checkRateLimit(agentId: string): boolean {
  const now = Date.now()
  const oneMinuteAgo = now - 60000

  const requests = rateLimitCache.get(agentId) || []
  const recentRequests = requests.filter((time) => time > oneMinuteAgo)

  if (recentRequests.length >= 10) {
    return false // Rate limit exceeded
  }

  recentRequests.push(now)
  rateLimitCache.set(agentId, recentRequests)
  return true
}

