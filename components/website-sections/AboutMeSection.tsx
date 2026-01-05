'use client'

interface AboutMeSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function AboutMeSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: AboutMeSectionProps) {
  const about = content || {
    bio: 'Extended bio...',
    experience: '5 years',
    education: ['Education 1', 'Education 2'],
    awards: ['Award 1', 'Award 2'],
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            About Me
          </h2>
        </div>

        <div className="space-y-8">
          {/* Bio */}
          <div className="p-8 rounded-2xl border border-white/10 backdrop-blur">
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{about.bio}</p>
          </div>

          {/* Experience & Education */}
          <div className="grid md:grid-cols-2 gap-6">
            {about.experience && (
              <div className="p-6 rounded-2xl border border-white/10 backdrop-blur">
                <div className="text-4xl mb-3">💼</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>
                  Experience
                </h3>
                <p className="text-gray-300">{about.experience} of professional experience</p>
              </div>
            )}

            {about.education && about.education.length > 0 && (
              <div className="p-6 rounded-2xl border border-white/10 backdrop-blur">
                <div className="text-4xl mb-3">🎓</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>
                  Education
                </h3>
                <ul className="space-y-2">
                  {about.education.map((edu: string, index: number) => (
                    <li key={index} className="text-gray-300 text-sm">• {edu}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Awards */}
          {about.awards && about.awards.length > 0 && (
            <div className="p-6 rounded-2xl border border-white/10 backdrop-blur">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
                Awards & Recognition
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {about.awards.map((award: string, index: number) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <span className="text-yellow-400 mr-2">⭐</span>
                    <span className="text-gray-300">{award}</span>
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

