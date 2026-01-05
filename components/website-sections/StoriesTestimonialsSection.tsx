'use client'

interface StoriesTestimonialsSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function StoriesTestimonialsSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: StoriesTestimonialsSectionProps) {
  const stories = content?.stories || [
    {
      name: 'Member Name',
      role: 'Member',
      story: 'Testimonial story...',
      image: '',
    },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Stories & Testimonials
          </h2>
          <p className="text-gray-400 text-lg">Hear from our community</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story: any, index: number) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-white/10 backdrop-blur hover:border-purple-500/50 transition"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl flex-shrink-0">
                  {story.image ? (
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span>👤</span>
                  )}
                </div>
                <div>
                  <h4 className="text-white font-bold">{story.name}</h4>
                  <p className="text-sm text-gray-400">{story.role}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">"{story.story}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

