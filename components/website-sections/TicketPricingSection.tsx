'use client'

interface TicketPricingSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function TicketPricingSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: TicketPricingSectionProps) {
  const tiers = content?.tiers || [
    {
      name: 'Early Bird',
      price: 'KES 2,000',
      features: ['Full access', 'Lunch included', 'Networking'],
      available: true,
    },
    {
      name: 'Regular',
      price: 'KES 3,000',
      features: ['Full access', 'Lunch included', 'Networking', 'Goodie bag'],
      available: true,
      popular: true,
    },
    {
      name: 'VIP',
      price: 'KES 5,000',
      features: ['Full access', 'Lunch included', 'Networking', 'Goodie bag', 'VIP seating'],
      available: true,
    },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Get Your Tickets
          </h2>
          <p className="text-gray-400 text-lg">Choose the ticket that's right for you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier: any, index: number) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border transition ${
                tier.popular
                  ? 'border-purple-500/50 shadow-xl shadow-purple-500/20 scale-105'
                  : 'border-white/10 hover:border-purple-500/30'
              }`}
              style={{
                background: tier.popular
                  ? `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`
                  : `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
              }}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-500 rounded-full text-xs font-bold text-white">
                  MOST POPULAR
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
                  {tier.name}
                </h3>
                <div className="text-4xl font-bold mb-4">{tier.price}</div>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#rsvp"
                className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition ${
                  tier.available
                    ? 'hover:shadow-lg'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                style={{
                  backgroundColor: tier.available ? accentColor : 'gray',
                  color: 'white',
                }}
              >
                {tier.available ? 'Buy Now' : 'Sold Out'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

