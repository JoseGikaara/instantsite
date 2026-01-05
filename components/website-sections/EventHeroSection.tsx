'use client'

interface EventHeroSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function EventHeroSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: EventHeroSectionProps) {
  const event = content || {
    eventName: 'Event Name',
    headline: 'Join Us for an Amazing Event',
    description: 'Event description',
    date: 'January 15, 2026',
    time: '10:00 AM - 6:00 PM',
    venue: 'Venue Name',
    ctaText: 'Register Now',
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section
      className={`relative min-h-[70vh] flex items-center justify-center overflow-hidden ${themeClass}`}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 w-full h-full opacity-90"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
          {event.eventName || event.headline}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-white/90">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📅</span>
            <span className="font-semibold">{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🕐</span>
            <span className="font-semibold">{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📍</span>
            <span className="font-semibold">{event.venue}</span>
          </div>
        </div>

        <a
          href="#rsvp"
          className="inline-block px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
          style={{ backgroundColor: accentColor }}
        >
          {event.ctaText}
        </a>
      </div>
    </section>
  )
}

