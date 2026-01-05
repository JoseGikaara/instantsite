'use client'

interface ServicesOfferedSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function ServicesOfferedSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: ServicesOfferedSectionProps) {
  const services = content?.services || [
    {
      name: 'Service 1',
      description: 'Service description',
      deliverables: ['Deliverable 1', 'Deliverable 2'],
      startingPrice: 'KES 5,000',
    },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Services I Offer
          </h2>
          <p className="text-gray-400 text-lg">What I can do for you</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: any, index: number) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-white/10 backdrop-blur hover:border-purple-500/50 transition"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
              }}
            >
              <h3 className="text-xl font-bold mb-3 text-white">{service.name}</h3>
              <p className="text-gray-300 text-sm mb-4">{service.description}</p>

              {service.deliverables && service.deliverables.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-2">Includes:</p>
                  <ul className="space-y-1">
                    {service.deliverables.map((deliverable: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-white/10">
                <div className="text-lg font-bold" style={{ color: accentColor }}>
                  {service.startingPrice || 'Get Quote'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

