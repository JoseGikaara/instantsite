import { AIContent } from '@/lib/deepseek'
import Footer from '@/components/website-sections/Footer'

interface Preview {
  business_name: string
  phone: string
  location: string
  services: string
  ai_content?: AIContent | null
}

export default function LocalBusinessTemplate({ preview }: { preview: Preview }) {
  const aiContent = preview.ai_content as AIContent | null | undefined
  const title = aiContent?.title || preview.business_name
  const headline = aiContent?.hero?.headline || preview.business_name
  const subheadline = aiContent?.hero?.subheadline || preview.location
  const about = aiContent?.about || `Welcome to ${preview.business_name}. We are located in ${preview.location} and are committed to providing excellent service to our customers.`
  const servicesList = aiContent?.services || preview.services.split(',').map(s => s.trim())
  const contactIntro = aiContent?.contact?.intro || 'Get in Touch'
  const contactCallout = aiContent?.contact?.callout || `Call Us: ${preview.phone}`
  const primaryCTA = aiContent?.ctas?.[0] || `Call Us: ${preview.phone}`

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{headline}</h1>
          <p className="text-gray-600">{subheadline}</p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About Us</h2>
          <p className="text-gray-700 leading-relaxed">{about}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Services</h2>
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

        <div className="bg-blue-600 rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">{contactIntro}</h2>
          <a
            href={`tel:${preview.phone}`}
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            {primaryCTA}
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
