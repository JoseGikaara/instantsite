'use client'

interface CategoryGridSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function CategoryGridSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: CategoryGridSectionProps) {
  const categories = content?.categories || [
    { name: 'Category 1', icon: '📂', count: 15 },
    { name: 'Category 2', icon: '📂', count: 23 },
    { name: 'Category 3', icon: '📂', count: 8 },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Browse by Category
          </h2>
          <p className="text-gray-400 text-lg">Find exactly what you're looking for</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category: any, index: number) => (
            <button
              key={index}
              className="p-6 rounded-2xl border border-white/10 hover:border-purple-500/50 transition group backdrop-blur"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
              }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition">
                {category.icon}
              </div>
              <div className="text-white font-semibold mb-1">{category.name}</div>
              <div className="text-xs text-gray-400">{category.count} businesses</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

