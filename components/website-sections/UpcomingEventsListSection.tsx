'use client'

interface UpcomingEventsListSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function UpcomingEventsListSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: UpcomingEventsListSectionProps) {
  const events = content?.events || [
    {
      title: 'Event Title',
      date: '2026-01-15',
      time: '10:00 AM',
      description: 'Event description',
      purpose: 'Event purpose',
      rsvpLink: '',
    },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Upcoming Events
          </h2>
          <p className="text-gray-400 text-lg">Join us for these special occasions</p>
        </div>

        <div className="space-y-6">
          {events.map((event: any, index: number) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-white/10 backdrop-blur hover:border-purple-500/50 transition"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Date */}
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="text-3xl font-bold" style={{ color: primaryColor }}>
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
                  <p className="text-gray-300 text-sm mb-2">{event.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <span>🕐 {event.time}</span>
                    {event.purpose && <span>• {event.purpose}</span>}
                  </div>
                </div>

                {/* RSVP Button */}
                {event.rsvpLink && (
                  <div className="flex-shrink-0">
                    <a
                      href={event.rsvpLink}
                      className="px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
                      style={{ backgroundColor: accentColor, color: 'white' }}
                    >
                      RSVP
                    </a>
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

