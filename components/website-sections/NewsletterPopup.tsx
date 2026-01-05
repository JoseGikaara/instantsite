'use client'

import { useState, useEffect } from 'react'

interface NewsletterPopupProps {
  primaryColor: string
  accentColor: string
}

export default function NewsletterPopup({ primaryColor, accentColor }: NewsletterPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [dontShow, setDontShow] = useState(false)

  useEffect(() => {
    // Show after 5 seconds
    const timer = setTimeout(() => {
      const hasSeen = localStorage.getItem('newsletter-dont-show')
      if (!hasSeen && !dontShow) {
        setIsOpen(true)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [dontShow])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, send to API
    setSubmitted(true)
    setTimeout(() => {
      setIsOpen(false)
      if (dontShow) {
        localStorage.setItem('newsletter-dont-show', 'true')
      }
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
      <div
        className="relative max-w-md w-full p-8 rounded-2xl border backdrop-blur"
        style={{
          borderColor: `${primaryColor}40`,
          background: 'rgba(19, 19, 24, 0.95)',
        }}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
              }}
            >
              ✓
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-gray-400">You're subscribed to our newsletter</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-6">
              Get the latest news and updates delivered to your inbox
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50"
                placeholder="your@email.com"
                required
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-white hover:scale-105 transition-all"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                }}
              >
                Subscribe
              </button>
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dontShow}
                  onChange={(e) => setDontShow(e.target.checked)}
                  className="w-4 h-4 rounded"
                  style={{ accentColor: primaryColor }}
                />
                Don't show this again
              </label>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

