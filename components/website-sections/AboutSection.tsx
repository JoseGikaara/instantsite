'use client'

interface AboutSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
}

export default function AboutSection({ content, primaryColor, accentColor, theme }: AboutSectionProps) {
  const aboutText = content?.aboutText || content?.about || ''
  const mission = content?.mission || ''
  const values = content?.values || []

  if (!aboutText && !mission) {
    return null
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">About Us</h2>
        </div>

        {aboutText && (
          <div className="mb-6 sm:mb-8">
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">{aboutText}</p>
          </div>
        )}

        {mission && (
          <div
            className="p-6 sm:p-8 rounded-xl sm:rounded-2xl border backdrop-blur mb-6 sm:mb-8"
            style={{ borderColor: `${primaryColor}20` }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Mission</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{mission}</p>
          </div>
        )}

        {values && values.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {values.map((value: string, index: number) => (
              <div
                key={index}
                className="p-4 sm:p-6 rounded-lg sm:rounded-xl border backdrop-blur text-center"
                style={{ borderColor: `${primaryColor}20` }}
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center text-xl sm:text-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
                  }}
                >
                  ✓
                </div>
                <p className="text-sm sm:text-base text-gray-300">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

