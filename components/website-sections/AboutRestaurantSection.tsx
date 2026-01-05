'use client'

interface AboutRestaurantSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function AboutRestaurantSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: AboutRestaurantSectionProps) {
  const about = content || {
    story: 'Our restaurant story...',
    chefInfo: 'Chef information...',
    cuisineStyle: 'Cuisine style and ingredients...',
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            About Our Restaurant
          </h2>
        </div>

        <div className="space-y-8">
          {/* Story */}
          <div className="p-8 rounded-2xl border border-white/10 backdrop-blur">
            <h3 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
              Our Story
            </h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{about.story}</p>
          </div>

          {/* Chef Info */}
          {about.chefInfo && (
            <div className="p-8 rounded-2xl border border-white/10 backdrop-blur">
              <div className="flex items-start gap-6">
                <div className="text-5xl">👨‍🍳</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: primaryColor }}>
                    Our Chef
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{about.chefInfo}</p>
                </div>
              </div>
            </div>
          )}

          {/* Cuisine Style */}
          {about.cuisineStyle && (
            <div className="p-8 rounded-2xl border border-white/10 backdrop-blur">
              <h3 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
                Our Cuisine
              </h3>
              <p className="text-gray-300 leading-relaxed">{about.cuisineStyle}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

