'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AVAILABLE_SECTIONS, GLOBAL_FEATURES, SectionConfig } from '@/lib/section-types'

const WEBSITE_TYPES = [
  'Local Business Website',
  'WhatsApp Lead Website',
  'Landing Page',
  'Directory Listing Page',
]

interface Agent {
  id: string
  credit_balance: number
}

export default function GenerateClient({ agent }: { agent: Agent }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  
  // Step 1: Website Type & Theme
  const [websiteType, setWebsiteType] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#8B5CF6')
  const [accentColor, setAccentColor] = useState('#EF4D8E')
  const [theme, setTheme] = useState('dark')
  
  // Step 2: Sections
  const [selectedSections, setSelectedSections] = useState<SectionConfig[]>([])
  
  // Step 3: Business Info
  const [businessName, setBusinessName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [services, setServices] = useState('')
  
  // Step 4: Global Features
  const [globalFeatures, setGlobalFeatures] = useState({
    whatsappFloat: false,
    newsletter: false,
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Ensure hero is always included
  const ensureHero = (sections: SectionConfig[]) => {
    const hasHero = sections.some(s => s.type === 'hero')
    if (!hasHero) {
      return [
        { type: 'hero', id: 'hero-1', order: 0 },
        ...sections.map((s, i) => ({ ...s, order: i + 1 }))
      ]
    }
    return sections
  }

  const toggleSection = (sectionType: string) => {
    if (sectionType === 'hero') return // Hero is required
    
    setSelectedSections(prev => {
      const exists = prev.find(s => s.type === sectionType)
      if (exists) {
        return prev.filter(s => s.type !== sectionType).map((s, i) => ({ ...s, order: i }))
      } else {
        return ensureHero([
          ...prev,
          { type: sectionType, id: `${sectionType}-${Date.now()}`, order: prev.length }
        ])
      }
    })
  }

  const moveSection = (index: number, direction: 'up' | 'down') => {
    setSelectedSections(prev => {
      const newSections = [...prev]
      if (direction === 'up' && index > 0) {
        [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]]
      } else if (direction === 'down' && index < newSections.length - 1) {
        [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]]
      }
      return newSections.map((s, i) => ({ ...s, order: i }))
    })
  }

  async function handleGenerate() {
    if (!businessName || !phone || !location || !services) {
      setError('All fields are required')
      return
    }

    if (selectedSections.length === 0) {
      setError('Please select at least one section')
      return
    }

    if (agent.credit_balance < 1) {
      setError('Insufficient credits')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          website_type: websiteType,
          business_name: businessName,
          phone,
          location,
          services,
          primary_color: primaryColor,
          accent_color: accentColor,
          theme,
          sections: ensureHero(selectedSections),
          global_features: globalFeatures,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Generation failed')
        setLoading(false)
        return
      }

      router.push(`/preview/${data.preview_id}`)
    } catch (err) {
      setError('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <header className="border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-purple-400 hover:text-purple-300 text-sm">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Build Your Website
              </h1>
            </div>
            <div className="px-6 py-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-full backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-300">Credits</span>
                <span className="text-xl font-bold text-white">{agent.credit_balance}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-[#131318] border border-white/10 rounded-2xl p-8 backdrop-blur">
          {/* Step 1: Website Type & Theme */}
          {step === 1 && (
            <div>
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-medium text-purple-400 mb-2">
                  Step 1 of 4
                </div>
                <h2 className="text-2xl font-bold text-white mt-4">Choose Website Type & Theme</h2>
                <p className="text-gray-400 text-sm mt-2">Select your website type and customize colors</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Website Type</label>
                  <div className="grid gap-3">
                    {WEBSITE_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => setWebsiteType(type)}
                        className={`p-4 rounded-xl border text-left transition ${
                          websiteType === type
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-white/10 hover:border-purple-500/50'
                        }`}
                      >
                        <span className="text-white font-medium">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Primary Color</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-20 h-12 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white"
                    />
                    <div
                      className="w-12 h-12 rounded-lg border border-white/10"
                      style={{ backgroundColor: primaryColor }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Accent Color</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-20 h-12 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="flex-1 px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white"
                    />
                    <div
                      className="w-12 h-12 rounded-lg border border-white/10"
                      style={{ backgroundColor: accentColor }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Theme</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setTheme('dark')}
                      className={`flex-1 p-4 rounded-xl border transition ${
                        theme === 'dark'
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-white/10'
                      }`}
                    >
                      <span className="text-white">Dark</span>
                    </button>
                    <button
                      onClick={() => setTheme('light')}
                      className={`flex-1 p-4 rounded-xl border transition ${
                        theme === 'light'
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-white/10'
                      }`}
                    >
                      <span className="text-white">Light</span>
                    </button>
                  </div>
                </div>

                {/* Preview Card */}
                <div className="p-6 rounded-xl border border-white/10">
                  <p className="text-sm text-gray-400 mb-4">Preview:</p>
                  <div
                    className="p-6 rounded-lg"
                    style={{
                      background: theme === 'dark' ? '#0A0A0F' : '#FFFFFF',
                      color: theme === 'dark' ? '#FFFFFF' : '#000000',
                    }}
                  >
                    <div
                      className="w-full h-32 rounded-lg mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                      }}
                    />
                    <h3 className="font-bold mb-2">Sample Card</h3>
                    <p className="text-sm opacity-70">This is how your colors will look</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-6 py-3 border border-white/10 rounded-xl text-gray-300 hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!websiteType) {
                      setError('Please select a website type')
                      return
                    }
                    setStep(2)
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Next: Select Sections →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Section Selection */}
          {step === 2 && (
            <div>
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-medium text-purple-400 mb-2">
                  Step 2 of 4
                </div>
                <h2 className="text-2xl font-bold text-white mt-4">Choose Sections</h2>
                <p className="text-gray-400 text-sm mt-2">Select sections to include in your website</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                {/* Available Sections */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Available Sections</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {Object.entries(AVAILABLE_SECTIONS).map(([key, section]) => {
                      const isSelected = selectedSections.some(s => s.type === key)
                      const isHero = key === 'hero'
                      
                      return (
                        <button
                          key={key}
                          onClick={() => !isHero && toggleSection(key)}
                          disabled={isHero}
                          className={`p-4 rounded-xl border text-left transition ${
                            isSelected || isHero
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-white/10 hover:border-purple-500/50'
                          } ${isHero ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-2xl">{section.icon}</span>
                            {isHero && <span className="text-xs text-purple-400">Required</span>}
                            {isSelected && !isHero && (
                              <span className="text-xs text-green-400">✓ Selected</span>
                            )}
                          </div>
                          <h4 className="text-white font-medium mb-1">{section.name}</h4>
                          <p className="text-xs text-gray-400">{section.description}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Selected Sections */}
                {selectedSections.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Your Sections ({selectedSections.length})
                    </h3>
                    <div className="space-y-2">
                      {selectedSections.map((section, index) => {
                        const sectionDef = AVAILABLE_SECTIONS[section.type]
                        return (
                          <div
                            key={section.id}
                            className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-400">
                                {index + 1}
                              </div>
                              <div>
                                <div className="text-white font-medium">{sectionDef?.name}</div>
                                <div className="text-xs text-gray-400">{sectionDef?.description}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {index > 0 && (
                                <button
                                  onClick={() => moveSection(index, 'up')}
                                  className="p-2 rounded-lg hover:bg-white/10 transition"
                                >
                                  ↑
                                </button>
                              )}
                              {index < selectedSections.length - 1 && (
                                <button
                                  onClick={() => moveSection(index, 'down')}
                                  className="p-2 rounded-lg hover:bg-white/10 transition"
                                >
                                  ↓
                                </button>
                              )}
                              {section.type !== 'hero' && (
                                <button
                                  onClick={() => toggleSection(section.type)}
                                  className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition text-sm"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Global Features */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Global Features</h3>
                  <div className="space-y-3">
                    {Object.entries(GLOBAL_FEATURES).map(([key, feature]) => (
                      <label
                        key={key}
                        className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-purple-500/50 transition cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={globalFeatures[key as keyof typeof globalFeatures]}
                          onChange={(e) =>
                            setGlobalFeatures(prev => ({
                              ...prev,
                              [key]: e.target.checked,
                            }))
                          }
                          className="w-5 h-5 rounded"
                          style={{ accentColor: primaryColor }}
                        />
                        <span className="text-2xl">{feature.icon}</span>
                        <div className="flex-1">
                          <div className="text-white font-medium">{feature.name}</div>
                          <div className="text-xs text-gray-400">{feature.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-white/10 rounded-xl text-gray-300 hover:bg-white/5 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={() => {
                    if (selectedSections.length === 0) {
                      setError('Please select at least one section')
                      return
                    }
                    setStep(3)
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Next: Business Info →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Business Info */}
          {step === 3 && (
            <div>
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-medium text-purple-400 mb-2">
                  Step 3 of 4
                </div>
                <h2 className="text-2xl font-bold text-white mt-4">Business Information</h2>
                <p className="text-gray-400 text-sm mt-2">Fill in your business details</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
                    placeholder="e.g., Joe's Restaurant"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
                    placeholder="e.g., +254 712 345 678"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition"
                    placeholder="e.g., Nairobi, Kenya"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Services / Products *
                  </label>
                  <textarea
                    value={services}
                    onChange={(e) => setServices(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition resize-none"
                    placeholder="e.g., Restaurant services, Catering, Event hosting"
                    required
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-white/10 rounded-xl text-gray-300 hover:bg-white/5 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Generating Website...' : '✨ Generate Website'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
