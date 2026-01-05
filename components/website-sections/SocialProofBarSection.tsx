'use client'

interface SocialProofBarSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function SocialProofBarSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: SocialProofBarSectionProps) {
  const data = content || {
    stats: [
      { label: 'Happy Customers', value: '1000+' },
      { label: '5-Star Reviews', value: '500+' },
    ],
    badges: ['As featured in...', 'Trusted by...'],
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-12 border-y border-white/10 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-8">
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-8">
            {data.stats.map((stat: any, index: number) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: primaryColor }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-4">
            {data.badges.map((badge: string, index: number) => (
              <div
                key={index}
                className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm text-gray-300"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

