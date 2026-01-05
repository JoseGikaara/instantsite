'use client'

interface TrustBadgesSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function TrustBadgesSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: TrustBadgesSectionProps) {
  const data = content || {
    badges: ['M-Pesa Accepted', 'Secure Checkout', 'Money-Back Guarantee'],
    guaranteeText: '30-day money-back guarantee',
    paymentMethods: ['M-Pesa', 'Card', 'Bank Transfer'],
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-16 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: primaryColor }}>
            Trusted & Secure
          </h2>
        </div>

        {/* Trust Badges */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {data.badges.map((badge: string, index: number) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-white/10 text-center backdrop-blur"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
              }}
            >
              <div className="text-3xl mb-3">🛡️</div>
              <div className="text-white font-semibold">{badge}</div>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="text-center mb-6">
          <p className="text-gray-400 mb-4">Accepted Payment Methods:</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {data.paymentMethods.map((method: string, index: number) => (
              <div
                key={index}
                className="px-6 py-3 rounded-full border border-white/20 bg-white/5"
              >
                <span className="text-white font-medium">{method}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        {data.guaranteeText && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/20 border border-green-500/30">
              <span className="text-2xl">✓</span>
              <span className="text-green-400 font-semibold">{data.guaranteeText}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

