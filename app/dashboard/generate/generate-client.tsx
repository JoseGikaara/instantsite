'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AVAILABLE_SECTIONS, GLOBAL_FEATURES, SectionConfig, getSectionsForType } from '@/lib/section-types'
import { HeroSectionConfigurator } from '@/components/configurators/HeroSectionConfigurator'
import { ImageGalleryConfigurator } from '@/components/configurators/ImageGalleryConfigurator'
import { ContactFormConfigurator } from '@/components/configurators/ContactFormConfigurator'
import { PricingTableConfigurator } from '@/components/configurators/PricingTableConfigurator'
import { TestimonialsConfigurator } from '@/components/configurators/TestimonialsConfigurator'
import { MenuSectionConfigurator } from '@/components/configurators/MenuSectionConfigurator'

const WEBSITE_TYPES = [
  { 
    value: 'Local Business Website', 
    label: 'Local Business Website',
    description: 'Perfect for local businesses, shops, and services',
    icon: '🏪',
    popular: true
  },
  { 
    value: 'WhatsApp Lead Website', 
    label: 'WhatsApp Lead Website',
    description: 'Ideal for real estate agents, consultants, tutors, coaches',
    icon: '💬',
    popular: true
  },
  { 
    value: 'Landing Page', 
    label: 'Landing Page',
    description: 'Product launches, events, courses, special offers',
    icon: '🚀',
    popular: false
  },
  { 
    value: 'Directory Listing Page', 
    label: 'Directory Listing Page',
    description: 'Best X in Nairobi aggregators, local guides, review sites',
    icon: '📋',
    popular: false
  },
  { 
    value: 'Event Website', 
    label: 'Event Website',
    description: 'Weddings, conferences, workshops, concerts, fundraisers',
    icon: '🎉',
    popular: false,
    new: true
  },
  { 
    value: 'Restaurant/Menu Website', 
    label: 'Restaurant/Menu Website',
    description: 'Restaurants, cafes, bars, food trucks, catering',
    icon: '🍽️',
    popular: false,
    new: true
  },
  { 
    value: 'Portfolio Website', 
    label: 'Portfolio Website',
    description: 'Photographers, designers, artists, developers, freelancers',
    icon: '🎨',
    popular: false,
    new: true
  },
  { 
    value: 'Church/NGO Website', 
    label: 'Church/NGO Website',
    description: 'Churches, mosques, NGOs, charities, community organizations',
    icon: '⛪',
    popular: false,
    new: true
  },
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
  
  // Step 3: Section Configurations
  const [sectionConfigurations, setSectionConfigurations] = useState<Record<string, any>>({})
  const [currentConfigSectionIndex, setCurrentConfigSectionIndex] = useState(0)
  
  // Step 4: Business Info
  const [businessName, setBusinessName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [services, setServices] = useState('')
  
  // Step 5: Global Features
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
                  Step 1 of 5
                </div>
                <h2 className="text-2xl font-bold text-white mt-4">Choose Website Type & Theme</h2>
                <p className="text-gray-400 text-sm mt-2">Select your website type and customize colors</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Website Type</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {WEBSITE_TYPES.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setWebsiteType(type.value)}
                        className={`p-4 rounded-xl border text-left transition relative ${
                          websiteType === type.value
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-white/10 hover:border-purple-500/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{type.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium">{type.label}</span>
                              {type.popular && (
                                <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300">
                                  Popular
                                </span>
                              )}
                              {type.new && (
                                <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-300">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-gray-400 text-xs mt-1">{type.description}</p>
                          </div>
                        </div>
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
                  Step 2 of 5
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
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Available Sections {websiteType && `for ${websiteType}`}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {Object.entries(AVAILABLE_SECTIONS)
                      .filter(([key, section]) => {
                        // Always show hero
                        if (key === 'hero') return true
                        // If website type selected, filter by type
                        if (websiteType && section.websiteTypes) {
                          return section.websiteTypes.includes(websiteType)
                        }
                        // If no website type, show common sections (no websiteTypes restriction)
                        if (!websiteType) {
                          return !section.websiteTypes
                        }
                        // Show all if website type matches or section has no type restriction
                        return !section.websiteTypes || section.websiteTypes.includes(websiteType)
                      })
                      .map(([key, section]) => {
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
                    setCurrentConfigSectionIndex(0)
                    setStep(3)
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Next: Configure Sections →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Section Configuration */}
          {step === 3 && (
            <div>
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-medium text-purple-400 mb-2">
                  Step 3 of 5 - Section {currentConfigSectionIndex + 1} of {selectedSections.length}
                </div>
                <h2 className="text-2xl font-bold text-white mt-4">Configure Sections</h2>
                <p className="text-gray-400 text-sm mt-2">Customize each section before generation</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">
                  {currentConfigSectionIndex + 1} of {selectedSections.length} sections configured
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                    style={{ width: `${((currentConfigSectionIndex + 1) / selectedSections.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Section List */}
              <div className="mb-6 space-y-2">
                {selectedSections.map((section, idx) => {
                  const sectionDef = AVAILABLE_SECTIONS[section.type]
                  const isConfigured = sectionConfigurations[section.type] !== undefined
                  const isCurrent = idx === currentConfigSectionIndex
                  
                  return (
                    <div
                      key={section.id}
                      className={`p-4 rounded-xl border transition ${
                        isCurrent
                          ? 'border-purple-500 bg-purple-500/10'
                          : isConfigured
                          ? 'border-green-500/30 bg-green-500/5'
                          : 'border-white/10 bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{sectionDef?.icon || '📄'}</span>
                          <div>
                            <div className="text-white font-medium">
                              {idx + 1}. {sectionDef?.name || section.type}
                            </div>
                            <div className="text-xs text-gray-400">{sectionDef?.description}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {isConfigured && (
                            <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400">
                              ✓ Configured
                            </span>
                          )}
                          {isCurrent && (
                            <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-400">
                              Configuring...
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Current Section Configurator */}
              {selectedSections[currentConfigSectionIndex] && (() => {
                const currentSection = selectedSections[currentConfigSectionIndex]
                const sectionType = currentSection.type
                const initialConfig = sectionConfigurations[sectionType]

                return (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                    {sectionType === 'hero' && (
                      <HeroSectionConfigurator
                        onSave={(config) => {
                          setSectionConfigurations(prev => ({
                            ...prev,
                            [sectionType]: config
                          }))
                          if (currentConfigSectionIndex < selectedSections.length - 1) {
                            setCurrentConfigSectionIndex(prev => prev + 1)
                          } else {
                            setStep(4)
                          }
                        }}
                        onSkip={() => {
                          if (currentConfigSectionIndex < selectedSections.length - 1) {
                            setCurrentConfigSectionIndex(prev => prev + 1)
                          } else {
                            setStep(4)
                          }
                        }}
                        initialConfig={initialConfig}
                      />
                    )}

                    {sectionType === 'gallery' && (
                      <ImageGalleryConfigurator
                        onSave={(config) => {
                          setSectionConfigurations(prev => ({
                            ...prev,
                            [sectionType]: config
                          }))
                          if (currentConfigSectionIndex < selectedSections.length - 1) {
                            setCurrentConfigSectionIndex(prev => prev + 1)
                          } else {
                            setStep(4)
                          }
                        }}
                        onSkip={() => {
                          if (currentConfigSectionIndex < selectedSections.length - 1) {
                            setCurrentConfigSectionIndex(prev => prev + 1)
                          } else {
                            setStep(4)
                          }
                        }}
                        initialConfig={initialConfig}
                      />
                    )}

                    {(sectionType === 'contact' || sectionType === 'contactForm') && (
                      <ContactFormConfigurator
                        onSave={(config) => {
                          setSectionConfigurations(prev => ({
                            ...prev,
                            [sectionType]: config
                          }))
                          if (currentConfigSectionIndex < selectedSections.length - 1) {
                            setCurrentConfigSectionIndex(prev => prev + 1)
                          } else {
                            setStep(4)
                          }
                        }}
                        onSkip={() => {
                          if (currentConfigSectionIndex < selectedSections.length - 1) {
                            setCurrentConfigSectionIndex(prev => prev + 1)
                          } else {
                            setStep(4)
                          }
                        }}
                        initialConfig={initialConfig}
                      />
                    )}

                    {sectionType === 'pricing' && (
                      <PricingTableConfigurator
                        onSave={(config) => {
                          setSectionConfigurations(prev => ({
                            ...prev,
                            [sectionType]: config
                          }))
                          if (currentConfigSectionIndex < selectedSections.length - 1) {
                            setCurrentConfigSectionIndex(prev => prev + 1)
                          } else {
                            setStep(4)
                          }
                        }}
                        onSkip={() => {
                          if (currentConfigSectionIndex < selectedSections.length - 1) {
                            setCurrentConfigSectionIndex(prev => prev + 1)
                          } else {
                            setStep(4)
                          }
                        }}
                        initialConfig={initialConfig}
                      />
                    )}

                    {sectionType === 'testimonials' && (
                      <TestimonialsConfigurator
                        onSave={(config) => {
                          setSectionConfigurations(prev => ({
                            ...prev,
                            [sectionType]: config
                          }))
                          if (currentConfigSectionIndex < selectedSections.length - 1) {
                            setCurrentConfigSectionIndex(prev => prev + 1)
                          } else {
                            setStep(4)
                          }
                        }}
                        onSkip={() => {
                          if (currentConfigSectionIndex < selectedSections.length - 1) {
                            setCurrentConfigSectionIndex(prev => prev + 1)
                          } else {
                            setStep(4)
                          }
                        }}
                        initialConfig={initialConfig}
                      />
                    )}

                    {sectionType === 'menuSection' && (
                      <MenuSectionConfigurator
                        onSave={(config) => {
                          setSectionConfigurations(prev => ({
                            ...prev,
                            [sectionType]: config
                          }))
                          if (currentConfigSectionIndex < selectedSections.length - 1) {
                            setCurrentConfigSectionIndex(prev => prev + 1)
                          } else {
                            setStep(4)
                          }
                        }}
                        onSkip={() => {
                          if (currentConfigSectionIndex < selectedSections.length - 1) {
                            setCurrentConfigSectionIndex(prev => prev + 1)
                          } else {
                            setStep(4)
                          }
                        }}
                        initialConfig={initialConfig}
                      />
                    )}

                    {/* Default configurator for sections without specific configurator */}
                    {!['hero', 'gallery', 'contact', 'contactForm', 'pricing', 'testimonials', 'menuSection'].includes(sectionType) && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {AVAILABLE_SECTIONS[sectionType]?.name || sectionType}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {AVAILABLE_SECTIONS[sectionType]?.description || 'This section will be generated by AI.'}
                          </p>
                        </div>
                        <div className="flex justify-between pt-6 border-t border-white/10">
                          <button
                            onClick={() => {
                              if (currentConfigSectionIndex < selectedSections.length - 1) {
                                setCurrentConfigSectionIndex(prev => prev + 1)
                              } else {
                                setStep(4)
                              }
                            }}
                            className="px-6 py-3 text-gray-400 hover:text-white transition"
                          >
                            Skip This Section
                          </button>
                          <button
                            onClick={() => {
                              if (currentConfigSectionIndex < selectedSections.length - 1) {
                                setCurrentConfigSectionIndex(prev => prev + 1)
                              } else {
                                setStep(4)
                              }
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition"
                          >
                            Continue →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })()}

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    if (currentConfigSectionIndex > 0) {
                      setCurrentConfigSectionIndex(prev => prev - 1)
                    } else {
                      setStep(2)
                    }
                  }}
                  className="px-6 py-3 border border-white/10 rounded-xl text-gray-300 hover:bg-white/5 transition"
                >
                  ← {currentConfigSectionIndex > 0 ? 'Previous Section' : 'Back'}
                </button>

                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-3 text-gray-400 hover:text-white transition"
                >
                  Skip All & Use AI Defaults
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Business Info */}
          {step === 4 && (
            <div>
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-medium text-purple-400 mb-2">
                  Step 4 of 5
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
