'use client'

import { useState } from 'react'

interface Testimonial {
  name: string
  role?: string
  image?: string
  rating: number
  text: string
  location?: string
}

interface TestimonialsProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
}

export default function Testimonials({ content, primaryColor, accentColor, theme }: TestimonialsProps) {
  const testimonials: Testimonial[] = Array.isArray(content) ? content : (content?.testimonials || [])
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">
            Real reviews from real customers
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div
            className="p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl border backdrop-blur relative"
            style={{ borderColor: `${primaryColor}20` }}
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4 sm:mb-6">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  style={{ color: primaryColor }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              "{currentTestimonial.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold text-white flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                }}
              >
                {currentTestimonial.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-base sm:text-lg truncate">{currentTestimonial.name}</div>
                {currentTestimonial.role && (
                  <div className="text-gray-400 text-xs sm:text-sm truncate">{currentTestimonial.role}</div>
                )}
                {currentTestimonial.location && (
                  <div className="text-gray-500 text-xs truncate">{currentTestimonial.location}</div>
                )}
              </div>
            </div>

            {/* Navigation */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex ? 'w-8' : ''
                    }`}
                    style={{
                      backgroundColor: index === currentIndex ? primaryColor : `${primaryColor}40`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

