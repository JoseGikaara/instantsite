'use client'

import { useEffect, useRef, useState } from 'react'

interface Feature {
  title: string
  description: string
  icon?: string
}

interface FeaturesGridProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
}

export default function FeaturesGrid({ content, primaryColor, accentColor, theme }: FeaturesGridProps) {
  const features: Feature[] = content?.features || content || []
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (!Array.isArray(features) || features.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
            Why Choose Us
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Discover what makes us different
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-6 sm:p-8 rounded-xl sm:rounded-2xl border backdrop-blur transition-all duration-300 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{
                borderColor: `${primaryColor}20`,
                animationDelay: `${index * 100}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = `0 20px 40px ${primaryColor}20`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl mb-4 sm:mb-6 flex items-center justify-center text-xl sm:text-2xl"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
                }}
              >
                {feature.icon || '✨'}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

