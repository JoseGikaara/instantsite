'use client'

interface PortfolioHeroSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function PortfolioHeroSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: PortfolioHeroSectionProps) {
  const portfolio = content || {
    name: 'Your Name',
    title: 'Professional Title',
    tagline: 'Award-winning professional',
    headline: 'Creative Professional',
    bio: 'Short professional bio',
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-6xl">
              👤
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: primaryColor }}>
              {portfolio.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-2">{portfolio.title}</p>
            <p className="text-lg text-gray-400 mb-4">{portfolio.tagline}</p>
            <p className="text-gray-300 mb-6">{portfolio.bio}</p>
            <a
              href="#work"
              className="inline-block px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
              style={{ backgroundColor: accentColor }}
            >
              View My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

