'use client'

interface EventDetailsSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function EventDetailsSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: EventDetailsSectionProps) {
  const details = content || {
    date: 'January 15, 2026',
    time: '10:00 AM - 6:00 PM',
    venue: {
      name: 'Venue Name',
      address: '123 Main Street, Nairobi, Kenya',
      directions: 'Located in the city center, easily accessible by public transport',
    },
    dressCode: 'Business Casual',
    parking: 'Free parking available on-site',
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Event Details
          </h2>
          <p className="text-gray-400 text-lg">Everything you need to know</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* When */}
          <div className="p-6 rounded-2xl border border-white/10 backdrop-blur">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>
              When
            </h3>
            <p className="text-gray-300 mb-1">
              <strong>Date:</strong> {details.date}
            </p>
            <p className="text-gray-300">
              <strong>Time:</strong> {details.time}
            </p>
          </div>

          {/* Where */}
          <div className="p-6 rounded-2xl border border-white/10 backdrop-blur">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>
              Where
            </h3>
            <p className="text-gray-300 mb-1">
              <strong>{details.venue.name}</strong>
            </p>
            <p className="text-gray-300 text-sm mb-2">{details.venue.address}</p>
            <p className="text-gray-400 text-xs">{details.venue.directions}</p>
          </div>

          {/* Dress Code */}
          {details.dressCode && (
            <div className="p-6 rounded-2xl border border-white/10 backdrop-blur">
              <div className="text-4xl mb-4">👔</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>
                Dress Code
              </h3>
              <p className="text-gray-300">{details.dressCode}</p>
            </div>
          )}

          {/* Parking */}
          {details.parking && (
            <div className="p-6 rounded-2xl border border-white/10 backdrop-blur">
              <div className="text-4xl mb-4">🅿️</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>
                Parking
              </h3>
              <p className="text-gray-300">{details.parking}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

