'use client'

interface ProcessWorkSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function ProcessWorkSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: ProcessWorkSectionProps) {
  const steps = content?.steps || [
    { step: 1, title: 'Discovery', description: 'We discuss your needs' },
    { step: 2, title: 'Design', description: 'I create the design' },
    { step: 3, title: 'Review', description: 'You review and provide feedback' },
    { step: 4, title: 'Delivery', description: 'Final delivery and support' },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            How I Work
          </h2>
          <p className="text-gray-400 text-lg">My process for delivering great results</p>
        </div>

        <div className="space-y-6">
          {steps.map((stepItem: any, index: number) => (
            <div
              key={index}
              className="flex gap-6 p-6 rounded-2xl border border-white/10 backdrop-blur hover:border-purple-500/50 transition"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
              }}
            >
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  {stepItem.step || index + 1}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-white">{stepItem.title}</h3>
                <p className="text-gray-300">{stepItem.description}</p>
              </div>

              {/* Arrow (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center text-gray-500">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

