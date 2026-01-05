'use client'

interface SpecialOffersSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function SpecialOffersSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: SpecialOffersSectionProps) {
  const offers = content?.offers || [
    {
      title: 'Today\'s Special',
      description: 'Special offer description',
      validUntil: '2026-12-31',
      terms: 'Terms and conditions apply',
    },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Special Offers
          </h2>
          <p className="text-gray-400 text-lg">Don't miss out on these amazing deals</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer: any, index: number) => (
            <div
              key={index}
              className="p-6 rounded-2xl border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-transparent backdrop-blur hover:border-yellow-500/50 transition"
            >
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-bold mb-2 text-white">{offer.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{offer.description}</p>
              {offer.validUntil && (
                <p className="text-xs text-gray-400 mb-2">
                  Valid until: {new Date(offer.validUntil).toLocaleDateString()}
                </p>
              )}
              {offer.terms && (
                <p className="text-xs text-gray-500 italic">{offer.terms}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

