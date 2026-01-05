'use client'

import { useState } from 'react'

interface RSVPFormSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function RSVPFormSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: RSVPFormSectionProps) {
  const data = content || {
    formFields: ['name', 'email', 'phone', 'ticketQuantity'],
    confirmationText: 'Thank you for registering! We\'ll send you a confirmation email shortly.',
    whatsappOption: 'Optional WhatsApp confirmation',
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ticketQuantity: '1',
    specialRequirements: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'
  const inputClass = theme === 'dark'
    ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
    : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to an API
    setSubmitted(true)
    if (phone && formData.phone) {
      // Optional: Open WhatsApp with confirmation
      const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hi, I just registered for the event. Name: ${formData.name}`
      // window.open(whatsappUrl, '_blank')
    }
  }

  if (submitted) {
    return (
      <section className={`py-20 ${themeClass}`} id="rsvp">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>
            Registration Successful!
          </h2>
          <p className="text-gray-300 mb-6">{data.confirmationText}</p>
          {data.whatsappOption && phone && (
            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hi, I just registered for the event`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition"
            >
              <span>💬</span>
              <span>Confirm via WhatsApp</span>
            </a>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className={`py-20 ${themeClass}`} id="rsvp">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Register Now
          </h2>
          <p className="text-gray-400 text-lg">Secure your spot at this amazing event</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
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
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${inputClass} focus:outline-none focus:ring-2`}
              style={{ focusRingColor: primaryColor }}
              placeholder="+254..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Number of Tickets *</label>
            <select
              required
              value={formData.ticketQuantity}
              onChange={(e) => setFormData({ ...formData, ticketQuantity: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border ${inputClass} focus:outline-none focus:ring-2`}
              style={{ focusRingColor: primaryColor }}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Ticket' : 'Tickets'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Special Requirements (Optional)
            </label>
            <textarea
              value={formData.specialRequirements}
              onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border ${inputClass} focus:outline-none focus:ring-2`}
              style={{ focusRingColor: primaryColor }}
              placeholder="Dietary requirements, accessibility needs, etc."
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 rounded-xl text-white font-bold text-lg hover:shadow-xl transition"
            style={{ backgroundColor: accentColor }}
          >
            Complete Registration
          </button>
        </form>
      </div>
    </section>
  )
}

