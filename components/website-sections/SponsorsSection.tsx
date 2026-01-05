'use client'

interface SponsorsSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function SponsorsSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: SponsorsSectionProps) {
  const sponsors = content?.sponsors || [
    { name: 'Sponsor 1', logo: '', tier: 'platinum' },
    { name: 'Sponsor 2', logo: '', tier: 'gold' },
    { name: 'Sponsor 3', logo: '', tier: 'silver' },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  // Group sponsors by tier
  const groupedSponsors = sponsors.reduce((acc: any, sponsor: any) => {
    const tier = sponsor.tier || 'other'
    if (!acc[tier]) acc[tier] = []
    acc[tier].push(sponsor)
    return acc
  }, {})

  const tierOrder = ['platinum', 'gold', 'silver', 'bronze', 'other']
  const tierLabels: Record<string, string> = {
    platinum: 'Platinum Sponsors',
    gold: 'Gold Sponsors',
    silver: 'Silver Sponsors',
    bronze: 'Bronze Sponsors',
    other: 'Our Sponsors',
  }

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Our Sponsors
          </h2>
          <p className="text-gray-400 text-lg mb-6">Thank you to our amazing sponsors</p>
          <a
            href="#contact"
            className="inline-block px-6 py-3 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition"
          >
            Become a Sponsor
          </a>
        </div>

        {tierOrder.map((tier) => {
          if (!groupedSponsors[tier] || groupedSponsors[tier].length === 0) return null

          return (
            <div key={tier} className="mb-12">
              <h3 className="text-xl font-bold mb-6 text-center" style={{ color: primaryColor }}>
                {tierLabels[tier] || 'Our Sponsors'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groupedSponsors[tier].map((sponsor: any, index: number) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl border border-white/10 backdrop-blur hover:border-purple-500/50 transition text-center"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
                    }}
                  >
                    {sponsor.logo ? (
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="w-full h-20 object-contain mb-3"
                      />
                    ) : (
                      <div className="w-full h-20 flex items-center justify-center mb-3">
                        <span className="text-4xl">🏢</span>
                      </div>
                    )}
                    <div className="text-sm text-gray-300">{sponsor.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

