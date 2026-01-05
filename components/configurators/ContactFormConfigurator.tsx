'use client'

import { useState } from 'react'

interface ContactFormConfiguratorProps {
  onSave: (config: any) => void
  onSkip: () => void
  initialConfig?: any
}

export function ContactFormConfigurator({ onSave, onSkip, initialConfig }: ContactFormConfiguratorProps) {
  const [destination, setDestination] = useState<'email' | 'whatsapp' | 'both'>(
    initialConfig?.destination?.email && initialConfig?.destination?.whatsapp ? 'both' :
    initialConfig?.destination?.whatsapp ? 'whatsapp' : 'email'
  )
  const [email, setEmail] = useState(initialConfig?.destination?.email || '')
  const [whatsapp, setWhatsapp] = useState(initialConfig?.destination?.whatsapp || '')
  const [fields, setFields] = useState({
    name: true, // always required
    email: initialConfig?.fields?.email ?? true,
    phone: initialConfig?.fields?.phone ?? true,
    subject: initialConfig?.fields?.subject ?? false,
    message: true, // always required
    company: initialConfig?.fields?.company ?? false,
    serviceInterest: initialConfig?.fields?.serviceInterest ?? false,
  })
  const [formTitle, setFormTitle] = useState(initialConfig?.formTitle || 'Get In Touch')
  const [submitButtonText, setSubmitButtonText] = useState(initialConfig?.submitButtonText || 'Send Message')
  const [successMessage, setSuccessMessage] = useState(initialConfig?.successMessage || "Thanks! We'll get back to you soon.")

  const handleSave = () => {
    if (destination === 'email' && !email) {
      alert('Please provide an email address')
      return
    }
    if (destination === 'whatsapp' && !whatsapp) {
      alert('Please provide a WhatsApp number')
      return
    }
    if (destination === 'both' && (!email || !whatsapp)) {
      alert('Please provide both email and WhatsApp')
      return
    }

    onSave({
      destination: {
        email: destination === 'email' || destination === 'both' ? email : undefined,
        whatsapp: destination === 'whatsapp' || destination === 'both' ? whatsapp : undefined,
      },
      fields,
      formTitle,
      submitButtonText,
      successMessage,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-white">Configure Contact Form</h2>
        <p className="text-gray-400 text-sm">
          Set where form submissions should be sent
        </p>
      </div>

      {/* Destination */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Where should messages go? <span className="text-red-400">*</span>
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-purple-500/50 cursor-pointer transition">
            <input
              type="radio"
              name="destination"
              value="email"
              checked={destination === 'email'}
              onChange={() => setDestination('email')}
              className="w-4 h-4"
            />
            <div>
              <div className="text-white font-medium">Email Address</div>
              <div className="text-xs text-gray-400">Messages sent to your email</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-purple-500/50 cursor-pointer transition">
            <input
              type="radio"
              name="destination"
              value="whatsapp"
              checked={destination === 'whatsapp'}
              onChange={() => setDestination('whatsapp')}
              className="w-4 h-4"
            />
            <div>
              <div className="text-white font-medium">WhatsApp Number</div>
              <div className="text-xs text-gray-400">Messages sent via WhatsApp</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-purple-500/50 cursor-pointer transition">
            <input
              type="radio"
              name="destination"
              value="both"
              checked={destination === 'both'}
              onChange={() => setDestination('both')}
              className="w-4 h-4"
            />
            <div>
              <div className="text-white font-medium">Both</div>
              <div className="text-xs text-gray-400">Send to email and WhatsApp</div>
            </div>
          </label>
        </div>
      </div>

      {/* Email Input */}
      {(destination === 'email' || destination === 'both') && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="info@example.com"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      )}

      {/* WhatsApp Input */}
      {(destination === 'whatsapp' || destination === 'both') && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            WhatsApp Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+254712345678"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      )}

      {/* Form Fields */}
      <div className="border-t border-white/10 pt-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Form Fields to Include
        </label>
        <div className="space-y-2">
          {Object.entries(fields).map(([key, value]) => (
            <label key={key} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setFields({ ...fields, [key]: e.target.checked })}
                disabled={key === 'name' || key === 'message'}
                className="w-4 h-4 disabled:opacity-50"
              />
              <span className="text-white capitalize">
                {key === 'serviceInterest' ? 'Service Interest' : key}
                {(key === 'name' || key === 'message') && (
                  <span className="text-gray-500 text-xs ml-2">(always required)</span>
                )}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Optional Customization */}
      <div className="border-t border-white/10 pt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Form Title
          </label>
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Submit Button Text
          </label>
          <input
            type="text"
            value={submitButtonText}
            onChange={(e) => setSubmitButtonText(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Success Message
          </label>
          <textarea
            value={successMessage}
            onChange={(e) => setSuccessMessage(e.target.value)}
            rows={2}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t border-white/10">
        <button
          onClick={onSkip}
          className="px-6 py-3 text-gray-400 hover:text-white transition"
        >
          Skip This Section
        </button>

        <button
          onClick={handleSave}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition"
        >
          Save & Continue →
        </button>
      </div>
    </div>
  )
}

