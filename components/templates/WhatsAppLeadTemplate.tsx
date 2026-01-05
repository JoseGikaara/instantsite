import { AIContent } from '@/lib/deepseek'
import Footer from '@/components/website-sections/Footer'

interface Preview {
  business_name: string
  phone: string
  location: string
  services: string
  ai_content?: AIContent | null
}

export default function WhatsAppLeadTemplate({ preview }: { preview: Preview }) {
  const whatsappLink = `https://wa.me/${preview.phone.replace(/\D/g, '')}`
  const aiContent = preview.ai_content as AIContent | null | undefined
  const headline = aiContent?.hero?.headline || preview.business_name
  const subheadline = aiContent?.hero?.subheadline || preview.location
  const about = aiContent?.about || `Welcome to ${preview.business_name}. We are located in ${preview.location} and are committed to providing excellent service to our customers.`
  const servicesList = aiContent?.services || preview.services.split(',').map(s => s.trim())
  const primaryCTA = aiContent?.ctas?.[0] || '💬 Chat on WhatsApp'

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{headline}</h1>
            <p className="text-gray-600">{subheadline}</p>
          </div>

          {about && (
            <div className="mb-8">
              <p className="text-gray-700 mb-6">{about}</p>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Services</h2>
            {Array.isArray(servicesList) ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {servicesList.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 whitespace-pre-line mb-6">{preview.services}</p>
            )}
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 transition shadow-lg"
          >
            {primaryCTA}
          </a>

          <p className="text-sm text-gray-500 mt-4">Click to start a conversation</p>
        </div>
      </div>

      <Footer
        businessName={preview.business_name}
        phone={preview.phone}
        location={preview.location}
        primaryColor="#10B981"
        accentColor="#059669"
        theme="light"
      />
    </div>
  )
}
