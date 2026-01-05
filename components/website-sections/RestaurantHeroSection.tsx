'use client'

interface RestaurantHeroSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function RestaurantHeroSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: RestaurantHeroSectionProps) {
  const restaurant = content || {
    restaurantName: 'Restaurant Name',
    tagline: 'Delicious food, great atmosphere',
    headline: 'Welcome to Our Restaurant',
    openingHours: 'Mon-Sun: 8am-10pm',
    ctaText: 'View Menu',
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section
      className={`relative min-h-[70vh] flex items-center justify-center overflow-hidden ${themeClass}`}
    >
      {/* Background Gradient with Food Theme */}
      <div
        className="absolute inset-0 w-full h-full opacity-90"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="text-6xl mb-6">🍽️</div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
          {restaurant.restaurantName || restaurant.headline}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-6 drop-shadow">
          {restaurant.tagline}
        </p>

        {/* Opening Hours */}
        <div className="flex items-center justify-center gap-2 mb-8 text-white/90">
          <span className="text-2xl">🕐</span>
          <span className="font-semibold">{restaurant.openingHours}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#menu"
            className="inline-block px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
            style={{ backgroundColor: accentColor }}
          >
            {restaurant.ctaText}
          </a>
          {phone && (
            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hi, I'd like to make a reservation`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
              style={{ backgroundColor: '#25D366' }}
            >
              <span>💬</span>
              <span>Order via WhatsApp</span>
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

