'use client'

import { useState } from 'react'

interface PricingTableConfiguratorProps {
  onSave: (config: any) => void
  onSkip: () => void
  initialConfig?: any
}

interface PricingTier {
  name: string
  price: number
  currency: 'KES'
  billingPeriod: 'one-time' | 'monthly' | 'yearly'
  features: string[]
  ctaText: string
  ctaLink: string
  isPopular: boolean
}

export function PricingTableConfigurator({ onSave, onSkip, initialConfig }: PricingTableConfiguratorProps) {
  const [numberOfTiers, setNumberOfTiers] = useState(initialConfig?.tiers?.length || 3)
  const [tiers, setTiers] = useState<PricingTier[]>(
    initialConfig?.tiers || Array.from({ length: 3 }, () => ({
      name: '',
      price: 0,
      currency: 'KES' as const,
      billingPeriod: 'one-time' as const,
      features: [''],
      ctaText: 'Choose Plan',
      ctaLink: '',
      isPopular: false,
    }))
  )
  const [useAIForFeatures, setUseAIForFeatures] = useState(initialConfig?.useAIForFeatures ?? false)

  const updateTier = (index: number, updates: Partial<PricingTier>) => {
    setTiers(prev => prev.map((tier, i) => i === index ? { ...tier, ...updates } : tier))
  }

  const addFeature = (tierIndex: number) => {
    setTiers(prev => prev.map((tier, i) => 
      i === tierIndex ? { ...tier, features: [...tier.features, ''] } : tier
    ))
  }

  const removeFeature = (tierIndex: number, featureIndex: number) => {
    setTiers(prev => prev.map((tier, i) => 
      i === tierIndex ? { 
        ...tier, 
        features: tier.features.filter((_, fi) => fi !== featureIndex)
      } : tier
    ))
  }

  const updateFeature = (tierIndex: number, featureIndex: number, value: string) => {
    setTiers(prev => prev.map((tier, i) => 
      i === tierIndex ? {
        ...tier,
        features: tier.features.map((f, fi) => fi === featureIndex ? value : f)
      } : tier
    ))
  }

  const handleSave = () => {
    // Validate
    for (const tier of tiers) {
      if (!tier.name || tier.price <= 0 || tier.features.filter(f => f.trim()).length === 0) {
        alert('Please fill in all required fields for each tier')
        return
      }
    }

    onSave({
      tiers: tiers.filter((_, i) => i < numberOfTiers),
      useAIForFeatures,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-white">Configure Pricing Table</h2>
        <p className="text-gray-400 text-sm">
          Set up your pricing tiers with features and pricing
        </p>
      </div>

      {/* Number of Tiers */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Number of Pricing Tiers <span className="text-red-400">*</span>
        </label>
        <select
          value={numberOfTiers}
          onChange={(e) => {
            const newCount = parseInt(e.target.value)
            setNumberOfTiers(newCount)
            if (newCount > tiers.length) {
              setTiers(prev => [...prev, ...Array.from({ length: newCount - prev.length }, () => ({
                name: '',
                price: 0,
                currency: 'KES' as const,
                billingPeriod: 'one-time' as const,
                features: [''],
                ctaText: 'Choose Plan',
                ctaLink: '',
                isPopular: false,
              }))])
            }
          }}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
        >
          {[2, 3, 4].map(num => (
            <option key={num} value={num}>{num} Tiers</option>
          ))}
        </select>
      </div>

      {/* AI Features Toggle */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
        <input
          type="checkbox"
          id="useAI"
          checked={useAIForFeatures}
          onChange={(e) => setUseAIForFeatures(e.target.checked)}
          className="w-5 h-5"
        />
        <label htmlFor="useAI" className="text-white cursor-pointer">
          Let AI generate feature lists based on tier names
        </label>
      </div>

      {/* Pricing Tiers */}
      <div className="space-y-6">
        {tiers.slice(0, numberOfTiers).map((tier, index) => (
          <div key={index} className="p-6 rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Tier {index + 1}</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tier.isPopular}
                  onChange={(e) => updateTier(index, { isPopular: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-300">Mark as Popular</span>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tier Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={tier.name}
                  onChange={(e) => updateTier(index, { name: e.target.value })}
                  placeholder="e.g., Basic, Professional, Enterprise"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price (KES) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    value={tier.price || ''}
                    onChange={(e) => updateTier(index, { price: parseFloat(e.target.value) || 0 })}
                    placeholder="5000"
                    min="0"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Billing Period <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={tier.billingPeriod}
                    onChange={(e) => updateTier(index, { billingPeriod: e.target.value as any })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="one-time">One-time</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Features <span className="text-red-400">*</span>
                </label>
                <div className="space-y-2">
                  {tier.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, fIndex, e.target.value)}
                        placeholder={`Feature ${fIndex + 1}`}
                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                      />
                      {tier.features.length > 1 && (
                        <button
                          onClick={() => removeFeature(index, fIndex)}
                          className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addFeature(index)}
                    className="text-sm text-purple-400 hover:text-purple-300 transition"
                  >
                    + Add Feature
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={tier.ctaText}
                    onChange={(e) => updateTier(index, { ctaText: e.target.value })}
                    placeholder="Choose Plan"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    CTA Link (URL or WhatsApp)
                  </label>
                  <input
                    type="text"
                    value={tier.ctaLink}
                    onChange={(e) => updateTier(index, { ctaLink: e.target.value })}
                    placeholder="https://... or +254712345678"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t border-white/10">
        <button
          onClick={onSkip}
          className="px-6 py-3 text-gray-400 hover:text-white transition"
        >
          Skip This Section
        </button>

        <button
          onClick={handleSave}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition"
        >
          Save & Continue →
        </button>
      </div>
    </div>
  )
}

