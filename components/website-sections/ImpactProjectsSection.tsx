'use client'

interface ImpactProjectsSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function ImpactProjectsSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: ImpactProjectsSectionProps) {
  const data = content || {
    statistics: [
      { label: 'People Helped', value: '1000+' },
      { label: 'Funds Raised', value: 'KES 500,000+' },
    ],
    projects: [
      { name: 'Project Name', description: 'Project description', impact: 'Impact achieved' },
    ],
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Our Impact
          </h2>
          <p className="text-gray-400 text-lg">Making a difference in our community</p>
        </div>

        {/* Statistics */}
        {data.statistics && data.statistics.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {data.statistics.map((stat: any, index: number) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-white/10 backdrop-blur text-center"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
                }}
              >
                <div className="text-4xl font-bold mb-2" style={{ color: accentColor }}>
                  {stat.value}
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {data.projects.map((project: any, index: number) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-white/10 backdrop-blur"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
                }}
              >
                <h3 className="text-xl font-bold mb-2 text-white">{project.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/30">
                  <div className="text-xs text-green-300 mb-1">Impact:</div>
                  <div className="text-sm text-white">{project.impact}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

