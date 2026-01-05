'use client'

import { useEffect, useRef, useState } from 'react'

interface Stat {
  number: string
  label: string
  icon?: string
}

interface StatsCounterProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
}

export default function StatsCounter({ content, primaryColor, accentColor, theme }: StatsCounterProps) {
  const stats: Stat[] = Array.isArray(content) ? content : (content?.stats || [])
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [counted, setCounted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setIsVisible(true)
          setCounted(true)
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [counted])

  if (!stats || stats.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl border backdrop-blur"
          style={{ borderColor: `${primaryColor}20` }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                }}
              >
                {isVisible ? stat.number : '0'}
              </div>
              <div className="text-gray-400 text-sm sm:text-base md:text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

