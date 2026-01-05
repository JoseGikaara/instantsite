'use client'

interface OnlineOrderingCTASectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function OnlineOrderingCTASection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: OnlineOrderingCTASectionProps) {
  const data = content || {
    headline: 'Order Now',
    description: 'Get your favorite dishes delivered to your door',
    options: ['Order on Glovo', 'Call to Order', 'WhatsApp Your Order'],
    deliveryAreas: ['Nairobi', 'Westlands', 'Kileleshwa'],
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section
      className={`py-20 ${themeClass}`}
      style={{
        background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{data.headline}</h2>
        <p className="text-gray-300 text-lg mb-8">{data.description}</p>

        {/* Ordering Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {data.options.map((option: string, index: number) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-white/20 backdrop-blur hover:border-purple-500/50 transition"
            >
              <div className="text-4xl mb-3">
                {option.includes('Glovo') ? '🚴' : option.includes('Call') ? '📞' : '💬'}
              </div>
              <div className="text-white font-semibold">{option}</div>
            </div>
          ))}
        </div>

        {/* Delivery Areas */}
        {data.deliveryAreas && data.deliveryAreas.length > 0 && (
          <div className="mb-8">
            <p className="text-gray-400 mb-4">We deliver to:</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {data.deliveryAreas.map((area: string, index: number) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm"
                >
                  {area}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {phone && (
            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hi, I'd like to place an order`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
              style={{ backgroundColor: '#25D366' }}
            >
              <span>💬</span>
              <span>Order via WhatsApp</span>
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white/30 text-white font-bold text-lg hover:bg-white/10 transition"
            >
              <span>📞</span>
              <span>Call to Order</span>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

