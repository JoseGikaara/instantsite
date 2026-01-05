'use client'

interface QuickResponseSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function QuickResponseSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: QuickResponseSectionProps) {
  const guarantee = content || {
    guaranteeText: 'Get a response in under 1 hour - Guaranteed',
    responseTime: '1 hour',
    operatingHours: 'Mon-Fri: 8am-8pm, Sat: 9am-5pm',
    ctaText: 'Start Chatting Now',
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section
      className={`py-16 ${themeClass}`}
      style={{
        background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
      }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-3xl p-8 text-center backdrop-blur">
          <div className="text-6xl mb-4">⚡</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {guarantee.guaranteeText}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6 text-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏱️</span>
              <span>Response Time: <strong>{guarantee.responseTime}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🕐</span>
              <span>{guarantee.operatingHours}</span>
            </div>
          </div>
          {phone && (
            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
              style={{ backgroundColor: '#25D366' }}
            >
              <span>💬</span>
              <span>{guarantee.ctaText}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

