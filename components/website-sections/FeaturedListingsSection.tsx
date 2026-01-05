'use client'

interface FeaturedListingsSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function FeaturedListingsSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: FeaturedListingsSectionProps) {
  const businesses = content?.businesses || [
    {
      name: 'Business Name',
      tagline: 'Business tagline',
      description: 'Short description',
      rating: 4.5,
      location: 'Nairobi',
      phone: '+254...',
      whatsapp: '+254...',
      website: 'website.com',
    },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full mb-4">
            <span className="text-yellow-400 font-semibold">⭐ FEATURED</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Featured Businesses
          </h2>
          <p className="text-gray-400 text-lg">Top-rated businesses in our directory</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business: any, index: number) => (
            <div
              key={index}
              className="p-6 rounded-2xl border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent backdrop-blur hover:border-yellow-500/50 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1 text-white">{business.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">{business.tagline}</p>
                </div>
                <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs text-yellow-400 font-bold">
                  FEATURED
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4">{business.description}</p>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < Math.floor(business.rating) ? 'text-yellow-400' : 'text-gray-600'}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-400">{business.rating}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-400">{business.location}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {business.phone && (
                  <a
                    href={`tel:${business.phone}`}
                    className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs text-white hover:bg-white/20 transition"
                  >
                    📞 Call
                  </a>
                )}
                {business.whatsapp && (
                  <a
                    href={`https://wa.me/${business.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/30 text-xs text-green-300 hover:bg-green-500/30 transition"
                  >
                    💬 WhatsApp
                  </a>
                )}
                {business.website && (
                  <a
                    href={`https://${business.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/30 text-xs text-purple-300 hover:bg-purple-500/30 transition"
                  >
                    🌐 Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

