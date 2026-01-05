'use client'

import { useState } from 'react'

interface HireMeSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function HireMeSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: HireMeSectionProps) {
  const data = content || {
    headline: 'Let\'s Work Together',
    description: 'I\'m available for new projects',
    availability: 'Available for new projects',
    contactMethods: ['email', 'phone', 'whatsapp'],
    socialLinks: {
      instagram: '',
      linkedin: '',
      behance: '',
    },
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
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
      <section className={`py-20 ${themeClass}`} id="hire">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>
            Thank You!
          </h2>
          <p className="text-gray-300 mb-6">I'll get back to you soon.</p>
        </div>
      </section>
    )
  }

  return (
    <section className={`py-20 ${themeClass}`} id="hire">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            {data.headline}
          </h2>
          <p className="text-gray-400 text-lg mb-2">{data.description}</p>
          <div className="inline-block px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
            <span className="text-green-400 font-semibold">✓ {data.availability}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Project Details *</label>
              <textarea
                required
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                rows={4}
                className={`w-full px-4 py-3 rounded-xl border ${inputClass} focus:outline-none focus:ring-2`}
                style={{ focusRingColor: primaryColor }}
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 rounded-xl text-white font-bold text-lg hover:shadow-xl transition"
              style={{ backgroundColor: accentColor }}
            >
              Send Message
            </button>
          </form>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-white/10 backdrop-blur">
              <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
                Contact Me
              </h3>
              <div className="space-y-3">
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition"
                  >
                    <span className="text-2xl">📞</span>
                    <span>{phone}</span>
                  </a>
                )}
                {phone && (
                  <a
                    href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition"
                  >
                    <span className="text-2xl">💬</span>
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>

            {data.socialLinks && Object.keys(data.socialLinks).length > 0 && (
              <div className="p-6 rounded-2xl border border-white/10 backdrop-blur">
                <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
                  Follow Me
                </h3>
                <div className="flex gap-4">
                  {data.socialLinks.instagram && (
                    <a
                      href={`https://instagram.com/${data.socialLinks.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-3xl hover:scale-110 transition"
                    >
                      📷
                    </a>
                  )}
                  {data.socialLinks.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${data.socialLinks.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-3xl hover:scale-110 transition"
                    >
                      💼
                    </a>
                  )}
                  {data.socialLinks.behance && (
                    <a
                      href={`https://behance.net/${data.socialLinks.behance}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-3xl hover:scale-110 transition"
                    >
                      🎨
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

