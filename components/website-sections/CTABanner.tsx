'use client'

interface CTABannerProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function CTABanner({ content, primaryColor, accentColor, theme, phone }: CTABannerProps) {
  const ctaHeadline = content?.ctaHeadline || content?.headline || 'Ready to Get Started?'
  const ctaText = content?.ctaText || content?.text || 'Let\'s work together'
  const ctaButton = content?.ctaButton || content?.button || 'Contact Us Now'

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div
          className="p-8 sm:p-12 md:p-16 rounded-xl sm:rounded-2xl text-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
            border: `1px solid ${primaryColor}40`,
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/grid.svg')]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">{ctaHeadline}</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">{ctaText}</p>
            {phone ? (
              <a
                href={`tel:${phone}`}
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg text-white hover:scale-105 transition-all shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                }}
              >
                {ctaButton}
              </a>
            ) : (
              <button
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg text-white hover:scale-105 transition-all shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                }}
              >
                {ctaButton}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

