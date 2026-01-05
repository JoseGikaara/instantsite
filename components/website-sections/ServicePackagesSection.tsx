'use client'

interface ServicePackagesSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function ServicePackagesSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: ServicePackagesSectionProps) {
  const packages = content?.packages || [
    {
      name: 'Basic Package',
      price: 'KES 5,000',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
      whatsappCTA: 'Chat on WhatsApp',
    },
    {
      name: 'Professional Package',
      price: 'KES 10,000',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
      whatsappCTA: 'Chat on WhatsApp',
      popular: true,
    },
    {
      name: 'Premium Package',
      price: 'KES 20,000',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5', 'Feature 6'],
      whatsappCTA: 'Chat on WhatsApp',
    },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Our Service Packages
          </h2>
          <p className="text-gray-400 text-lg">Choose the perfect package for your needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg: any, index: number) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border transition ${
                pkg.popular
                  ? 'border-green-500/50 shadow-xl shadow-green-500/20 scale-105'
                  : 'border-white/10 hover:border-green-500/30'
              }`}
              style={{
                background: pkg.popular
                  ? `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`
                  : `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
              }}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 rounded-full text-xs font-bold text-white">
                  MOST POPULAR
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
                  {pkg.name}
                </h3>
                <div className="text-3xl font-bold mb-4">{pkg.price}</div>
              </div>

              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {phone && (
                <a
                  href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in the ${pkg.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition"
                  style={{ backgroundColor: '#25D366' }}
                >
                  {pkg.whatsappCTA || 'Chat on WhatsApp'}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

