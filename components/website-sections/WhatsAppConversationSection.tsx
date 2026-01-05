'use client'

interface WhatsAppConversationSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function WhatsAppConversationSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: WhatsAppConversationSectionProps) {
  const messages = content?.messages || [
    { sender: 'customer', message: 'Hi, I need help with...', time: '10:30' },
    { sender: 'business', message: 'Hello! I\'d be happy to help. What do you need?', time: '10:31' },
    { sender: 'customer', message: 'I\'m looking for...', time: '10:32' },
    { sender: 'business', message: 'Perfect! We offer exactly that. Let me share details...', time: '10:33' },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            See How We Communicate
          </h2>
          <p className="text-gray-400 text-lg">Fast, friendly, and professional conversations</p>
        </div>

        <div className="bg-[#075E54] rounded-3xl p-6 shadow-2xl">
          {/* WhatsApp Header */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/20">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-2xl">
              💬
            </div>
            <div>
              <div className="text-white font-semibold">Our Team</div>
              <div className="text-green-200 text-xs">Online • Usually replies in 1 hour</div>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-4">
            {messages.map((msg: any, index: number) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'customer'
                      ? 'bg-[#DCF8C6] text-gray-900 rounded-tr-none'
                      : 'bg-white/20 text-white rounded-tl-none'
                  }`}
                >
                  <p className="text-sm mb-1">{msg.message}</p>
                  <p className={`text-xs ${msg.sender === 'customer' ? 'text-gray-600' : 'text-white/70'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          {phone && (
            <div className="mt-6 pt-4 border-t border-white/20 text-center">
              <a
                href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 rounded-full text-white font-semibold hover:bg-green-600 transition"
              >
                <span>💬</span>
                <span>Start Your Conversation</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

