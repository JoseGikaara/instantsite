'use client'

interface WhyWhatsAppSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function WhyWhatsAppSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: WhyWhatsAppSectionProps) {
  const benefits = content?.benefits || [
    { title: 'Instant Response', description: 'Get answers immediately', icon: '⚡' },
    { title: 'Personal Connection', description: 'One-on-one conversation', icon: '💬' },
    { title: 'Secure & Private', description: 'Your data is protected', icon: '🔒' },
    { title: 'Convenient', description: 'Chat anytime, anywhere', icon: '📱' },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Why Choose WhatsApp?
          </h2>
          <p className="text-gray-400 text-lg">
            Experience the fastest and most convenient way to connect with us
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit: any, index: number) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-white/10 hover:border-green-500/50 transition backdrop-blur"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
              }}
            >
              <div className="text-4xl mb-4">{benefit.icon || '💚'}</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>
                {benefit.title}
              </h3>
              <p className="text-gray-400 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {phone && (
          <div className="mt-12 text-center">
            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-lg hover:shadow-lg transition"
              style={{ backgroundColor: '#25D366' }}
            >
              <span>💬</span>
              <span>Start Chatting Now</span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

