'use client'

interface SpeakersSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function SpeakersSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: SpeakersSectionProps) {
  const speakers = content?.speakers || [
    {
      name: 'Speaker Name',
      title: 'Speaker Title',
      bio: 'Speaker bio and background',
      image: 'speaker-1',
      socialLinks: {},
    },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Our Speakers
          </h2>
          <p className="text-gray-400 text-lg">Meet the experts sharing their knowledge</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker: any, index: number) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-white/10 backdrop-blur text-center hover:border-purple-500/50 transition"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
              }}
            >
              {/* Speaker Image */}
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl">
                {speaker.image ? (
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span>👤</span>
                )}
              </div>

              <h3 className="text-xl font-bold mb-1 text-white">{speaker.name}</h3>
              <p className="text-sm mb-3" style={{ color: primaryColor }}>
                {speaker.title}
              </p>
              <p className="text-gray-300 text-sm mb-4">{speaker.bio}</p>

              {/* Social Links */}
              {speaker.socialLinks && Object.keys(speaker.socialLinks).length > 0 && (
                <div className="flex items-center justify-center gap-3">
                  {speaker.socialLinks.twitter && (
                    <a
                      href={speaker.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition"
                    >
                      🐦
                    </a>
                  )}
                  {speaker.socialLinks.linkedin && (
                    <a
                      href={speaker.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-500 transition"
                    >
                      💼
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

