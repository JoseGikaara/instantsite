'use client'

import { useState } from 'react'

interface MenuSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function MenuSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: MenuSectionProps) {
  const menu = content || {
    categories: [
      {
        name: 'Appetizers',
        items: [
          { name: 'Item 1', description: 'Description', price: 'KES 500', dietaryTags: [] },
        ],
      },
    ],
  }

  const [activeCategory, setActiveCategory] = useState(menu.categories[0]?.name || '')

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`} id="menu">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Our Menu
          </h2>
          <p className="text-gray-400 text-lg">Delicious dishes made with love</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {menu.categories.map((category: any, index: number) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category.name)}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                activeCategory === category.name
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              style={{
                backgroundColor: activeCategory === category.name ? primaryColor : 'transparent',
                border: `2px solid ${activeCategory === category.name ? primaryColor : 'rgba(255,255,255,0.1)'}`,
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-8">
          {menu.categories
            .filter((cat: any) => cat.name === activeCategory)
            .map((category: any, catIndex: number) => (
              <div key={catIndex}>
                <h3 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>
                  {category.name}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {category.items.map((item: any, itemIndex: number) => (
                    <div
                      key={itemIndex}
                      className="p-6 rounded-2xl border border-white/10 backdrop-blur hover:border-purple-500/50 transition"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-1 text-white">{item.name}</h4>
                          <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                          {item.dietaryTags && item.dietaryTags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {item.dietaryTags.map((tag: string, tagIndex: number) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 rounded-full text-xs bg-green-500/20 border border-green-500/30 text-green-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="text-xl font-bold ml-4" style={{ color: accentColor }}>
                          {item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Order CTA */}
        {phone && (
          <div className="mt-12 text-center">
            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hi, I'd like to place an order`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
              style={{ backgroundColor: '#25D366' }}
            >
              <span>💬</span>
              <span>Order via WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

