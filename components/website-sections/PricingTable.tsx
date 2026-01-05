'use client'

interface PricingTier {
  name: string
  price: string
  features: string[]
  popular?: boolean
}

interface PricingTableProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
}

export default function PricingTable({ content, primaryColor, accentColor, theme }: PricingTableProps) {
  const tiers: PricingTier[] = Array.isArray(content) ? content : (content?.pricingTiers || [])

  if (!tiers || tiers.length === 0) {
    return null
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
            Choose Your Plan
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">
            Select the perfect package for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative p-6 sm:p-8 rounded-xl sm:rounded-2xl border backdrop-blur transition-all ${
                tier.popular ? 'sm:scale-105' : ''
              }`}
              style={{
                borderColor: tier.popular ? primaryColor : `${primaryColor}20`,
                borderWidth: tier.popular ? '2px' : '1px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = tier.popular ? 'scale-110' : 'scale-105'
                e.currentTarget.style.boxShadow = `0 20px 40px ${primaryColor}30`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = tier.popular ? 'scale-105' : 'scale-100'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {tier.popular && (
                <div
                  className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                  }}
                >
                  Popular
                </div>
              )}

              <h3 className="text-xl sm:text-2xl font-bold mb-2">{tier.name}</h3>
              <div className="mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold">{tier.price}</span>
                <span className="text-gray-400 text-sm sm:text-base">/month</span>
              </div>

              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: primaryColor }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all ${
                  tier.popular
                    ? 'text-white hover:scale-105'
                    : 'border-2 hover:bg-white/5'
                }`}
                style={
                  tier.popular
                    ? {
                        background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                      }
                    : {
                        borderColor: primaryColor,
                        color: primaryColor,
                      }
                }
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

