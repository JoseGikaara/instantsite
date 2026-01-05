'use client'

interface LocationHoursSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function LocationHoursSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: LocationHoursSectionProps) {
  const location = content || {
    address: '123 Main Street, Nairobi, Kenya',
    hours: {
      monday: '8am-10pm',
      tuesday: '8am-10pm',
      wednesday: '8am-10pm',
      thursday: '8am-10pm',
      friday: '8am-11pm',
      saturday: '9am-11pm',
      sunday: '10am-9pm',
    },
    phone: phone || '+254...',
    whatsapp: phone || '+254...',
    email: 'info@restaurant.com',
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ]

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Location & Hours
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Location & Contact */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-white/10 backdrop-blur">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">📍</span>
                <div>
                  <div className="font-semibold mb-1">Address</div>
                  <div className="text-gray-300 text-sm">{location.address}</div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="p-6 rounded-2xl border border-white/10 backdrop-blur">
              <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
                Opening Hours
              </h3>
              <div className="space-y-2">
                {days.map((day) => (
                  <div key={day.key} className="flex justify-between items-center">
                    <span className="text-gray-300">{day.label}</span>
                    <span className="text-white font-semibold">
                      {location.hours[day.key as keyof typeof location.hours] || 'Closed'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-6 rounded-2xl border border-white/10 backdrop-blur">
              <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
                Contact Us
              </h3>
              <div className="space-y-3">
                {location.phone && (
                  <a
                    href={`tel:${location.phone}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition"
                  >
                    <span className="text-2xl">📞</span>
                    <span>{location.phone}</span>
                  </a>
                )}
                {location.whatsapp && (
                  <a
                    href={`https://wa.me/${location.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition"
                  >
                    <span className="text-2xl">💬</span>
                    <span>WhatsApp: {location.whatsapp}</span>
                  </a>
                )}
                {location.email && (
                  <a
                    href={`mailto:${location.email}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition"
                  >
                    <span className="text-2xl">📧</span>
                    <span>{location.email}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <div
              className="w-full h-full min-h-[500px] flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
              }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-400">Map will be displayed here</p>
                <p className="text-gray-500 text-sm mt-2">{location.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

