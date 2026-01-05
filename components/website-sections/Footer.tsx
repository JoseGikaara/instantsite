'use client'

interface FooterProps {
  businessName?: string
  phone?: string
  location?: string
  primaryColor: string
  accentColor: string
  theme: string
}

export default function Footer({ 
  businessName, 
  phone, 
  location, 
  primaryColor, 
  accentColor, 
  theme 
}: FooterProps) {
  const isDark = theme === 'dark'
  const bgColor = isDark ? 'bg-[#0A0A0F]' : 'bg-gray-50'
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const borderColor = isDark ? 'border-white/10' : 'border-gray-200'
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-600'

  const currentYear = new Date().getFullYear()

  return (
    <footer className={`${bgColor} ${textColor} border-t ${borderColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8">
          {/* Business Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                }}
              >
                {businessName || 'Our Business'}
              </span>
            </h3>
            {location && (
              <p className={`${textMuted} text-sm sm:text-base mb-2 sm:mb-3 flex items-start`}>
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </p>
            )}
            {phone && (
              <a 
                href={`tel:${phone}`}
                className={`${textMuted} text-sm sm:text-base hover:opacity-80 transition flex items-center`}
              >
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {phone}
              </a>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a 
                  href="#top" 
                  className={`${textMuted} text-sm sm:text-base hover:opacity-80 transition`}
                  onClick={(e) => {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Back to Top
                </a>
              </li>
              {phone && (
                <li>
                  <a 
                    href={`tel:${phone}`}
                    className={`${textMuted} text-sm sm:text-base hover:opacity-80 transition`}
                  >
                    Contact Us
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a 
                    href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${textMuted} text-sm sm:text-base hover:opacity-80 transition`}
                  >
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">Get In Touch</h4>
            <p className={`${textMuted} text-sm sm:text-base mb-4 sm:mb-6`}>
              Have questions? We're here to help!
            </p>
            {phone && (
              <a
                href={`tel:${phone}`}
                className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base text-white hover:scale-105 transition-all shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                }}
              >
                Call Now
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-6 sm:pt-8 border-t ${borderColor}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className={`${textMuted} text-xs sm:text-sm text-center sm:text-left`}>
              © {currentYear} {businessName || 'Business'}. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className={`${textMuted} text-xs sm:text-sm`}>Powered by</span>
              <span 
                className="font-bold text-sm sm:text-base"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                InstantSite
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

