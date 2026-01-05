'use client'

import { useState } from 'react'

interface VolunteerSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function VolunteerSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: VolunteerSectionProps) {
  const data = content || {
    headline: 'Get Involved',
    description: 'Why volunteer',
    opportunities: [
      {
        title: 'Opportunity Title',
        description: 'What volunteers will do',
        timeCommitment: 'Time required',
        requirements: ['Requirement 1', 'Requirement 2'],
      },
    ],
    signupForm: 'Contact info for signup',
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'
  const inputClass = theme === 'dark'
    ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
    : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className={`py-20 ${themeClass}`} id="volunteer">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>
            Thank You!
          </h2>
          <p className="text-gray-300 mb-6">We'll be in touch soon about volunteer opportunities.</p>
        </div>
      </section>
    )
  }

  return (
    <section className={`py-20 ${themeClass}`} id="volunteer">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            {data.headline}
          </h2>
          <p className="text-gray-400 text-lg">{data.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Opportunities */}
          <div className="space-y-6">
            {data.opportunities.map((opp: any, index: number) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-white/10 backdrop-blur"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
                }}
              >
                <h3 className="text-xl font-bold mb-2 text-white">{opp.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{opp.description}</p>
                {opp.timeCommitment && (
                  <p className="text-xs text-gray-400 mb-2">⏱️ {opp.timeCommitment}</p>
                )}
                {opp.requirements && opp.requirements.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Requirements:</p>
                    <ul className="space-y-1">
                      {opp.requirements.map((req: string, idx: number) => (
                        <li key={idx} className="text-xs text-gray-300">• {req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Signup Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${inputClass} focus:outline-none focus:ring-2`}
                  style={{ focusRingColor: primaryColor }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${inputClass} focus:outline-none focus:ring-2`}
                  style={{ focusRingColor: primaryColor }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${inputClass} focus:outline-none focus:ring-2`}
                  style={{ focusRingColor: primaryColor }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Area of Interest *
                </label>
                <textarea
                  required
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border ${inputClass} focus:outline-none focus:ring-2`}
                  style={{ focusRingColor: primaryColor }}
                  placeholder="Tell us what you're interested in..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 rounded-xl text-white font-bold text-lg hover:shadow-xl transition"
                style={{ backgroundColor: accentColor }}
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

