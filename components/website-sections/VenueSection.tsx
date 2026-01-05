'use client'

interface VenueSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function VenueSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: VenueSectionProps) {
  const venue = content || {
    venueName: 'Venue Name',
    address: '123 Main Street, Nairobi, Kenya',
    description: 'Beautiful venue description',
    directions: 'How to get there',
    parking: 'Parking information',
    mapUrl: '',
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Venue Information
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Venue Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2 text-white">{venue.venueName}</h3>
              <p className="text-gray-300 mb-4">{venue.description}</p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 backdrop-blur">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">📍</span>
                <div>
                  <div className="font-semibold mb-1">Address</div>
                  <div className="text-gray-300 text-sm">{venue.address}</div>
                </div>
              </div>

              {venue.directions && (
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl">🧭</span>
                  <div>
                    <div className="font-semibold mb-1">Directions</div>
                    <div className="text-gray-300 text-sm">{venue.directions}</div>
                  </div>
                </div>
              )}

              {venue.parking && (
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🅿️</span>
                  <div>
                    <div className="font-semibold mb-1">Parking</div>
                    <div className="text-gray-300 text-sm">{venue.parking}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-white/10">
            {venue.mapUrl ? (
              <iframe
                src={venue.mapUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <div
                className="w-full h-96 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
                }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-gray-400">Map will be displayed here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

