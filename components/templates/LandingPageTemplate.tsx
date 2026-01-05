import { AIContent } from '@/lib/deepseek'
import Footer from '@/components/website-sections/Footer'

interface Preview {
  business_name: string
  phone: string
  location: string
  services: string
  ai_content?: AIContent | null
}

export default function LandingPageTemplate({ preview }: { preview: Preview }) {
  const aiContent = preview.ai_content as AIContent | null | undefined
  const headline = aiContent?.hero?.headline || preview.business_name
  const subheadline = aiContent?.hero?.subheadline || preview.location
  const about = aiContent?.about || `Welcome to ${preview.business_name}. We are located in ${preview.location} and are committed to providing excellent service to our customers.`
  const servicesList = aiContent?.services || preview.services.split(',').map(s => s.trim())
  const primaryCTA = aiContent?.ctas?.[0] || 'Contact Us Now'
  const secondaryCTA = aiContent?.ctas?.[1] || `Call: ${preview.phone}`
  const contactIntro = aiContent?.contact?.intro || 'Ready to Get Started?'
  const contactCallout = aiContent?.contact?.callout || 'Contact Us Today'

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{headline}</h1>
          <p className="text-xl text-gray-600 mb-8">{subheadline}</p>
          <a
            href={`tel:${preview.phone}`}
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow-lg"
          >
            {primaryCTA}
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
            {Array.isArray(servicesList) ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {servicesList.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 whitespace-pre-line">{preview.services}</p>
            )}
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get Started</h2>
            <p className="text-gray-700 mb-4">{about}</p>
            <a
              href={`tel:${preview.phone}`}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              {secondaryCTA}
            </a>
          </div>
        </div>

        <div className="text-center bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{contactIntro}</h2>
          <a
            href={`tel:${preview.phone}`}
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          >
            {contactCallout}
          </a>
        </div>
      </div>

      <Footer
        businessName={preview.business_name}
        phone={preview.phone}
        location={preview.location}
        primaryColor="#3B82F6"
        accentColor="#8B5CF6"
        theme="light"
      />
    </div>
  )
}
