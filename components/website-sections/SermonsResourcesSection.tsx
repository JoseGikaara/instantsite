'use client'

interface SermonsResourcesSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function SermonsResourcesSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: SermonsResourcesSectionProps) {
  const sermons = content?.sermons || [
    {
      title: 'Sermon Title',
      date: '2026-01-10',
      speaker: 'Speaker Name',
      description: 'Sermon description',
      audioUrl: '',
      videoUrl: '',
    },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Recent Sermons & Resources
          </h2>
          <p className="text-gray-400 text-lg">Watch, listen, and learn</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sermons.map((sermon: any, index: number) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-white/10 backdrop-blur hover:border-purple-500/50 transition"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
              }}
            >
              <h3 className="text-xl font-bold mb-2 text-white">{sermon.title}</h3>
              <div className="text-sm text-gray-400 mb-3">
                {new Date(sermon.date).toLocaleDateString()} • {sermon.speaker}
              </div>
              <p className="text-gray-300 text-sm mb-4">{sermon.description}</p>
              <div className="flex gap-3">
                {sermon.audioUrl && (
                  <a
                    href={sermon.audioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm hover:bg-blue-500/30 transition"
                  >
                    🎧 Audio
                  </a>
                )}
                {sermon.videoUrl && (
                  <a
                    href={sermon.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm hover:bg-red-500/30 transition"
                  >
                    ▶️ Video
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

