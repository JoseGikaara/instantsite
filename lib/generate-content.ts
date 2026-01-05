import { generateWebsiteContent } from './deepseek'
import { SECTION_PROMPTS, AVAILABLE_SECTIONS } from './section-types'

interface BusinessInfo {
  businessName: string
  phone?: string
  location?: string
  services: string
  websiteType: string
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
      return null
    }

    // Use DeepSeek API to generate content
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-c817cdf01ae84afcab78fd6d08b29f12'
    const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1'

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
      console.error('DeepSeek API error:', response.status)
      return null
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      console.error('No content in DeepSeek response')
      return null
    }

    // Parse JSON response
    let jsonContent = content.trim()
    if (jsonContent.startsWith('```')) {
      jsonContent = jsonContent.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
    }

    return JSON.parse(jsonContent)
  } catch (error) {
    console.error(`Error generating content for ${sectionType}:`, error)
    return null
  }
}

/**
 * Generate AI content for all selected sections
 */
export async function generateAllSectionContent(
  sections: string[],
  businessInfo: BusinessInfo
): Promise<Record<string, any>> {
  const aiContent: Record<string, any> = {}

  // Generate content for each section that needs AI
  for (const sectionType of sections) {
    const sectionDef = AVAILABLE_SECTIONS[sectionType]
    
    if (sectionDef?.needsAI) {
      console.log(`Generating AI content for ${sectionType}...`)
      const content = await generateSectionContent(sectionType, businessInfo)
      if (content) {
        aiContent[sectionType] = content
      }
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  return aiContent
}

