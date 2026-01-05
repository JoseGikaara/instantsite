'use client'

interface DonationSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function DonationSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: DonationSectionProps) {
  const data = content || {
    headline: 'Support Our Mission',
    description: 'Why donate...',
    donationTiers: [
      {
        name: 'One-time',
        amounts: ['KES 500', 'KES 1,000', 'KES 5,000'],
        description: 'One-time donation',
      },
      {
        name: 'Monthly',
        amounts: ['KES 500/month', 'KES 1,000/month'],
        description: 'Recurring monthly support',
      },
    ],
    mpesaDetails: {
      paybill: '123456',
      account: 'Account Number',
      instructions: 'M-Pesa payment instructions',
    },
    transparency: 'How funds are used',
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`} id="donate">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">💝</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{data.headline}</h2>
          <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
            {data.description}
          </p>
        </div>

        {/* Donation Tiers */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {data.donationTiers.map((tier: any, index: number) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-white/10 backdrop-blur"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
              }}
            >
              <h3 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>
                {tier.name}
              </h3>
              <p className="text-gray-300 text-sm mb-4">{tier.description}</p>
              <div className="space-y-2">
                {tier.amounts.map((amount: string, idx: number) => (
                  <button
                    key={idx}
                    className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/5 text-white hover:bg-white/10 transition text-left"
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* M-Pesa Details */}
        {data.mpesaDetails && (
          <div className="p-6 rounded-2xl border-2 border-green-500/30 bg-green-500/10 mb-6">
            <h3 className="text-xl font-bold mb-4 text-white">M-Pesa Donation</h3>
            <div className="space-y-3 text-gray-300">
              <div>
                <strong>Paybill:</strong> {data.mpesaDetails.paybill}
              </div>
              <div>
                <strong>Account:</strong> {data.mpesaDetails.account}
              </div>
              <p className="text-sm mt-4">{data.mpesaDetails.instructions}</p>
            </div>
          </div>
        )}

        {/* Transparency */}
        {data.transparency && (
          <div className="p-6 rounded-2xl border border-white/10 backdrop-blur">
            <h3 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>
              How Funds Are Used
            </h3>
            <p className="text-gray-300 text-sm">{data.transparency}</p>
          </div>
        )}
      </div>
    </section>
  )
}

