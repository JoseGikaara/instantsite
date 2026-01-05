'use client'

import { useState } from 'react'

interface SearchFilterBarProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function SearchFilterBar({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: SearchFilterBarProps) {
  const data = content || {
    categories: ['Category 1', 'Category 2', 'Category 3'],
    locations: ['Nairobi', 'Mombasa', 'Kisumu'],
  }

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'
  const inputClass = theme === 'dark' 
    ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
    : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-400'

  return (
    <section className={`sticky top-0 z-50 py-6 border-b border-white/10 backdrop-blur-lg ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search businesses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${inputClass} focus:outline-none focus:ring-2`}
              style={{ focusRingColor: primaryColor }}
            />
          </div>

          {/* Category Filter */}
          <div className="md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${inputClass} focus:outline-none focus:ring-2`}
              style={{ focusRingColor: primaryColor }}
            >
              <option value="">All Categories</option>
              {data.categories.map((cat: string, index: number) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="md:w-48">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${inputClass} focus:outline-none focus:ring-2`}
              style={{ focusRingColor: primaryColor }}
            >
              <option value="">All Locations</option>
              {data.locations.map((loc: string, index: number) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="md:w-40">
            <select
              className={`w-full px-4 py-3 rounded-xl border ${inputClass} focus:outline-none focus:ring-2`}
              style={{ focusRingColor: primaryColor }}
            >
              <option>Sort by Rating</option>
              <option>Sort by Name</option>
              <option>Sort by Featured</option>
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedCategory || selectedLocation || searchQuery) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-400">Active filters:</span>
            {searchQuery && (
              <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm">
                Search: {searchQuery}
              </span>
            )}
            {selectedCategory && (
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm">
                {selectedCategory}
              </span>
            )}
            {selectedLocation && (
              <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 text-sm">
                {selectedLocation}
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('')
                setSelectedLocation('')
              }}
              className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-sm hover:bg-red-500/30 transition"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

