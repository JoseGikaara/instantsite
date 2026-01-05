'use client'

interface BusinessListingsGridSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function BusinessListingsGridSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: BusinessListingsGridSectionProps) {
  const businesses = content?.businesses || Array.from({ length: 20 }, (_, i) => ({
    name: `Business ${i + 1}`,
    description: 'Business description',
    category: 'Category',
    location: 'Nairobi',
    phone: '+254...',
    rating: 4.0,
    reviews: 25,
    featured: false,
  }))

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: primaryColor }}>
            All Businesses
          </h2>
          <div className="text-gray-400 text-sm">
            Showing {businesses.length} businesses
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business: any, index: number) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-purple-500/50 transition backdrop-blur"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1 text-white">{business.name}</h3>
                  <p className="text-xs text-gray-400 mb-2">{business.category}</p>
                </div>
                {business.featured && (
                  <div className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded text-xs text-yellow-400 font-bold">
                    ⭐
                  </div>
                )}
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{business.description}</p>

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
                <span className="text-xs text-gray-400">
                  {business.rating} ({business.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">📍 {business.location}</span>
                {business.phone && (
                  <a
                    href={`tel:${business.phone}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-80 transition"
                    style={{ backgroundColor: primaryColor, color: 'white' }}
                  >
                    Contact
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

