'use client'

import { useState } from 'react'
import Image from 'next/image'

interface HeroSectionConfiguratorProps {
  onSave: (config: any) => void
  onSkip: () => void
  initialConfig?: any
}

export function HeroSectionConfigurator({ onSave, onSkip, initialConfig }: HeroSectionConfiguratorProps) {
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initialConfig?.backgroundImage || null)
  const [uploading, setUploading] = useState(false)
  const [config, setConfig] = useState({
    businessName: initialConfig?.businessName || '',
    mainService: initialConfig?.mainService || '',
    targetAudience: initialConfig?.targetAudience || '',
    keyBenefit: initialConfig?.keyBenefit || '',
    ctaText: initialConfig?.ctaText || 'Get Started',
    ctaLink: initialConfig?.ctaLink || '',
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB')
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    setBackgroundImage(file)
    
    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setBackgroundImage(null)
    setImagePreview(null)
  }

  const handleSave = async () => {
    // Upload image first if provided
    let imageUrl = imagePreview || null
    if (backgroundImage) {
      setUploading(true)
      try {
        const formData = new FormData()
        formData.append('image', backgroundImage)
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        
        if (!response.ok) {
          throw new Error('Upload failed')
        }
        
        const data = await response.json()
        imageUrl = data.url
      } catch (error) {
        alert('Failed to upload image. Please try again.')
        setUploading(false)
        return
      }
      setUploading(false)
    }

    onSave({
      ...config,
      backgroundImage: imageUrl
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-white">Configure Hero Section</h2>
        <p className="text-gray-400 text-sm">
          This is the first thing visitors see. Provide details for better AI-generated content.
        </p>
      </div>

      {/* Background Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Background Image <span className="text-gray-500 text-xs">(Optional)</span>
        </label>
        
        {imagePreview ? (
          <div className="relative w-full h-64 rounded-lg overflow-hidden border border-white/10">
            <Image 
              src={imagePreview} 
              alt="Preview" 
              fill 
              className="object-cover"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full transition"
            >
              ✕
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-purple-500/50 transition bg-white/5">
            <div className="text-4xl mb-2">📷</div>
            <span className="text-sm text-gray-300 mb-1">Click to upload background image</span>
            <span className="text-xs text-gray-500">Max 5MB, recommended 1920x1080px</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}
        <p className="text-xs text-gray-500 mt-2">
          If not provided, AI will generate a gradient background
        </p>
      </div>

      {/* Optional Fields for Better AI */}
      <div className="border-t border-white/10 pt-6">
        <h3 className="font-semibold mb-4 text-white">Help AI Generate Better Content (Optional)</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Business/Website Name
            </label>
            <input
              type="text"
              value={config.businessName}
              onChange={(e) => setConfig({ ...config, businessName: e.target.value })}
              placeholder="e.g., Nairobi Coffee Roasters"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Main Service/Focus
            </label>
            <input
              type="text"
              value={config.mainService}
              onChange={(e) => setConfig({ ...config, mainService: e.target.value })}
              placeholder="e.g., Specialty Coffee & Pastries"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Audience
            </label>
            <input
              type="text"
              value={config.targetAudience}
              onChange={(e) => setConfig({ ...config, targetAudience: e.target.value })}
              placeholder="e.g., Coffee enthusiasts in Nairobi"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Key Benefit/Promise
            </label>
            <input
              type="text"
              value={config.keyBenefit}
              onChange={(e) => setConfig({ ...config, keyBenefit: e.target.value })}
              placeholder="e.g., Fresh roasted beans daily"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Call-to-Action Button Text
              </label>
              <input
                type="text"
                value={config.ctaText}
                onChange={(e) => setConfig({ ...config, ctaText: e.target.value })}
                placeholder="e.g., Order Now"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                CTA Link or WhatsApp
              </label>
              <input
                type="text"
                value={config.ctaLink}
                onChange={(e) => setConfig({ ...config, ctaLink: e.target.value })}
                placeholder="e.g., +254712345678"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>
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
          disabled={uploading}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Save & Continue →'}
        </button>
      </div>
    </div>
  )
}

