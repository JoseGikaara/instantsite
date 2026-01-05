'use client'

interface ComparisonSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function ComparisonSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: ComparisonSectionProps) {
  const data = content || {
    before: {
      title: 'Without Us',
      points: ['Point 1', 'Point 2', 'Point 3'],
    },
    after: {
      title: 'With Us',
      points: ['Point 1', 'Point 2', 'Point 3'],
    },
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            See The Difference
          </h2>
          <p className="text-gray-400 text-lg">Transform your results with our solution</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Before */}
          <div className="p-8 rounded-2xl border-2 border-red-500/30 bg-red-500/5">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">❌</div>
              <h3 className="text-2xl font-bold text-red-400">{data.before.title}</h3>
            </div>
            <ul className="space-y-4">
              {data.before.points.map((point: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-400 text-xl mt-1">✗</span>
                  <span className="text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div
            className="p-8 rounded-2xl border-2 backdrop-blur"
            style={{
              borderColor: `${primaryColor}50`,
              background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
            }}
          >
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold" style={{ color: primaryColor }}>
                {data.after.title}
              </h3>
            </div>
            <ul className="space-y-4">
              {data.after.points.map((point: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-xl mt-1" style={{ color: primaryColor }}>
                    ✓
                  </span>
                  <span className="text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

