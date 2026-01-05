'use client'

interface ScheduleSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function ScheduleSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: ScheduleSectionProps) {
  const sessions = content?.sessions || [
    {
      time: '10:00 AM - 11:00 AM',
      title: 'Welcome & Registration',
      description: 'Check-in and networking',
      speaker: '',
    },
    {
      time: '11:00 AM - 12:00 PM',
      title: 'Opening Keynote',
      description: 'Keynote address',
      speaker: 'Speaker Name',
    },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Event Schedule
          </h2>
          <p className="text-gray-400 text-lg">What to expect throughout the day</p>
        </div>

        <div className="space-y-6">
          {sessions.map((session: any, index: number) => (
            <div
              key={index}
              className="flex gap-6 p-6 rounded-2xl border border-white/10 backdrop-blur hover:border-purple-500/50 transition"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
              }}
            >
              {/* Time */}
              <div className="flex-shrink-0 w-32 text-center">
                <div className="text-sm font-bold" style={{ color: primaryColor }}>
                  {session.time}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 text-white">{session.title}</h3>
                <p className="text-gray-300 mb-2">{session.description}</p>
                {session.speaker && (
                  <p className="text-sm text-gray-400">
                    <span className="text-purple-400">👤</span> {session.speaker}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

