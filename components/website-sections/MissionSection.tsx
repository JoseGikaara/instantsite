'use client'

interface MissionSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function MissionSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: MissionSectionProps) {
  const mission = content || {
    history: 'Organization history...',
    vision: 'Vision statement',
    values: ['Value 1', 'Value 2', 'Value 3'],
    leadership: [
      { name: 'Leader Name', role: 'Role', bio: 'Bio' },
    ],
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            About Our Mission
          </h2>
        </div>

        <div className="space-y-8">
          {/* History */}
          <div className="p-8 rounded-2xl border border-white/10 backdrop-blur">
            <h3 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
              Our History
            </h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{mission.history}</p>
          </div>

          {/* Vision */}
          {mission.vision && (
            <div className="p-8 rounded-2xl border border-white/10 backdrop-blur">
              <h3 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
                Our Vision
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">{mission.vision}</p>
            </div>
          )}

          {/* Values */}
          {mission.values && mission.values.length > 0 && (
            <div className="p-8 rounded-2xl border border-white/10 backdrop-blur">
              <h3 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>
                Our Values
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {mission.values.map((value: string, index: number) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
                  >
                    <span className="text-gray-300">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leadership */}
          {mission.leadership && mission.leadership.length > 0 && (
            <div className="p-8 rounded-2xl border border-white/10 backdrop-blur">
              <h3 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>
                Leadership Team
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {mission.leadership.map((leader: any, index: number) => (
                  <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-lg font-bold mb-1 text-white">{leader.name}</h4>
                    <p className="text-sm mb-2" style={{ color: primaryColor }}>
                      {leader.role}
                    </p>
                    <p className="text-gray-300 text-sm">{leader.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

