'use client'

interface OrganizationHeroSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function OrganizationHeroSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: OrganizationHeroSectionProps) {
  const org = content || {
    organizationName: 'Organization Name',
    missionStatement: 'Our mission statement',
    welcomeMessage: 'Welcome message',
    ctaText: 'Join Us',
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
        <div className="text-6xl mb-6">⛪</div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
          {org.organizationName}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-6 drop-shadow">
          {org.missionStatement}
        </p>
        <p className="text-lg text-white/80 mb-8 drop-shadow">{org.welcomeMessage}</p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#join"
            className="inline-block px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
            style={{ backgroundColor: accentColor }}
          >
            {org.ctaText}
          </a>
          <a
            href="#donate"
            className="inline-block px-8 py-4 rounded-full border-2 border-white/30 text-white font-bold text-lg hover:bg-white/10 transition"
          >
            Donate
          </a>
        </div>
      </div>
    </section>
  )
}

