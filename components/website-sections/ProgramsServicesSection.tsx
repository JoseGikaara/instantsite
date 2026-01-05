'use client'

interface ProgramsServicesSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function ProgramsServicesSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: ProgramsServicesSectionProps) {
  const programs = content?.programs || [
    {
      name: 'Program Name',
      description: 'Program description',
      schedule: 'Day and time',
      location: 'Location',
    },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Programs & Services
          </h2>
          <p className="text-gray-400 text-lg">What we offer to our community</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program: any, index: number) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-white/10 backdrop-blur hover:border-purple-500/50 transition"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
              }}
            >
              <h3 className="text-xl font-bold mb-2 text-white">{program.name}</h3>
              <p className="text-gray-300 text-sm mb-4">{program.description}</p>
              <div className="space-y-2 text-sm">
                {program.schedule && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>🕐</span>
                    <span>{program.schedule}</span>
                  </div>
                )}
                {program.location && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <span>📍</span>
                    <span>{program.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

