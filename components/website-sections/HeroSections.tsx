'use client'

interface HeroProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
}

export function HeroFullScreen({ content, primaryColor, accentColor, theme }: HeroProps) {
  const headline = content?.headline || 'Welcome to Our Business'
  const subheadline = content?.subheadline || 'We provide exceptional service'
  const ctaText = content?.ctaText || 'Get Started'

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in">
          <span 
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
            }}
          >
            {headline}
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto px-4 animate-slide-up">
          {subheadline}
        </p>
        <button
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg text-white hover:scale-105 transition-all shadow-2xl animate-fade-in"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
          }}
        >
          {ctaText}
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

export function HeroSplit({ content, primaryColor, accentColor, theme }: HeroProps) {
  const headline = content?.headline || 'Welcome to Our Business'
  const subheadline = content?.subheadline || 'We provide exceptional service'
  const ctaText = content?.ctaText || 'Get Started'

  return (
    <section className="min-h-screen flex items-center py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
        {/* Left: Content */}
        <div className="animate-fade-in order-2 md:order-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
              }}
            >
              {headline}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 leading-relaxed">
            {subheadline}
          </p>
          <button
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base text-white hover:scale-105 transition-all shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
            }}
          >
            {ctaText}
          </button>
        </div>

        {/* Right: Image placeholder */}
        <div className="relative animate-slide-up order-1 md:order-2">
          <div 
            className="w-full h-64 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm sm:text-base">
              Hero Image
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HeroMinimal({ content, primaryColor, accentColor, theme }: HeroProps) {
  const headline = content?.headline || 'Welcome to Our Business'
  const subheadline = content?.subheadline || 'We provide exceptional service'
  const ctaText = content?.ctaText || 'Get Started'

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-1 sm:py-2 rounded-full border backdrop-blur"
          style={{ borderColor: `${primaryColor}40` }}>
          <span className="text-xs sm:text-sm font-medium" style={{ color: primaryColor }}>
            ✨ Premium Service
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in px-4">
          {headline}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          {subheadline}
        </p>
        <button
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base text-white hover:shadow-lg transition-all"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
          }}
        >
          {ctaText}
        </button>
      </div>
    </section>
  )
}

