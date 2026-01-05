'use client'

interface AddBusinessCTASectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function AddBusinessCTASection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: AddBusinessCTASectionProps) {
  const data = content || {
    headline: 'List Your Business',
    description: 'Get more visibility and customers by listing your business in our directory',
    ctaText: 'Add Your Business',
    contactInfo: 'WhatsApp or email us',
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section
      className={`py-20 ${themeClass}`}
      style={{
        background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="text-6xl mb-6">➕</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{data.headline}</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">{data.description}</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {phone && (
            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hi, I'd like to list my business`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-xl transition transform hover:scale-105"
              style={{ backgroundColor: '#25D366' }}
            >
              <span>💬</span>
              <span>WhatsApp Us</span>
            </a>
          )}
          <a
            href="mailto:listings@example.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition"
          >
            <span>📧</span>
            <span>Email Us</span>
          </a>
        </div>

        <p className="text-gray-400 text-sm mt-6">{data.contactInfo}</p>
      </div>
    </section>
  )
}

