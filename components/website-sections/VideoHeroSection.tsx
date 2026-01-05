'use client'

interface VideoHeroSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function VideoHeroSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: VideoHeroSectionProps) {
  const hero = content || {
    headline: 'Transform Your Business Today',
    subheadline: 'Join thousands of successful entrepreneurs',
    videoUrl: '',
    ctaText: 'Get Started Now',
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  // Extract YouTube/Vimeo video ID
  const getVideoEmbedUrl = (url: string) => {
    if (!url) return null
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      const id = url.includes('youtu.be/')
        ? url.split('youtu.be/')[1].split('?')[0]
        : url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${id}`
    }
    if (url.includes('vimeo.com/')) {
      const id = url.split('vimeo.com/')[1].split('?')[0]
      return `https://player.vimeo.com/video/${id}`
    }
    return null
  }

  const embedUrl = getVideoEmbedUrl(hero.videoUrl)

  return (
    <section className={`relative min-h-[80vh] flex items-center justify-center overflow-hidden ${themeClass}`}>
      {/* Video Background or Gradient */}
      {embedUrl ? (
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src={embedUrl}
            className="w-full h-full object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ filter: 'brightness(0.4)' }}
          />
        </div>
      ) : (
        <div
          className="absolute inset-0 w-full h-full opacity-90"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
          }}
        />
      )}

      {/* Overlay Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
          {hero.headline}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
          {hero.subheadline}
        </p>
        <a
          href="#cta"
          className="inline-block px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
          style={{ backgroundColor: accentColor }}
        >
          {hero.ctaText}
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}

