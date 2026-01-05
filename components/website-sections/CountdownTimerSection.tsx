'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function CountdownTimerSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: CountdownTimerSectionProps) {
  const data = content || {
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    urgencyText: 'Limited Time Offer - Ends Soon!',
    ctaText: 'Claim Your Spot Now',
  }

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date(data.endDate).getTime()
      const now = new Date().getTime()
      const difference = endDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [data.endDate])

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section
      className={`py-20 ${themeClass}`}
      style={{
        background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          {data.urgencyText}
        </h2>
        <p className="text-gray-300 mb-8">Don't miss out on this exclusive opportunity</p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-white/20 backdrop-blur"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}30, ${accentColor}30)`,
              }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: accentColor }}>
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>

        <a
          href="#cta"
          className="inline-block px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
          style={{ backgroundColor: accentColor }}
        >
          {data.ctaText}
        </a>
      </div>
    </section>
  )
}

