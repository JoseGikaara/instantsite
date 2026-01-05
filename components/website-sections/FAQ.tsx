'use client'

import { useState } from 'react'

interface FAQ {
  question: string
  answer: string
}

interface FAQProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
}

export default function FAQ({ content, primaryColor, accentColor, theme }: FAQProps) {
  const faqs: FAQ[] = Array.isArray(content) ? content : (content?.faqs || [])
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">
            Everything you need to know
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg sm:rounded-xl border backdrop-blur overflow-hidden transition-all"
              style={{
                borderColor: openIndex === index ? primaryColor : `${primaryColor}20`,
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-4 sm:p-6 flex items-center justify-between text-left hover:bg-white/5 transition-all gap-4"
              >
                <span className="text-base sm:text-lg font-semibold pr-4 sm:pr-8 flex-1">{faq.question}</span>
                <svg
                  className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  style={{ color: primaryColor }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base text-gray-400 leading-relaxed animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

