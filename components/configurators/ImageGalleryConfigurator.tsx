'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageGalleryConfiguratorProps {
  onSave: (config: any) => void
  onSkip: () => void
  initialConfig?: any
}

export function ImageGalleryConfigurator({ onSave, onSkip, initialConfig }: ImageGalleryConfiguratorProps) {
  const [images, setImages] = useState<Array<{ file: File | null; url: string; caption: string; order: number }>>(
    initialConfig?.images?.map((img: any, idx: number) => ({
      file: null,
      url: img.url || img,
      caption: img.caption || '',
      order: idx,
    })) || []
  )
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    files.forEach((file) => {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Max 5MB per image.`)
        return
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image file`)
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setImages(prev => [...prev, {
          file,
          url: reader.result as string,
          caption: '',
          order: prev.length,
        }])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index).map((img, i) => ({ ...img, order: i })))
  }

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    setImages(prev => {
      const newImages = [...prev]
      if (direction === 'up' && index > 0) {
        [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]]
        newImages[index - 1].order = index - 1
        newImages[index].order = index
      } else if (direction === 'down' && index < newImages.length - 1) {
        [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]]
        newImages[index].order = index
        newImages[index + 1].order = index + 1
      }
      return newImages
    })
  }

  const handleCaptionChange = (index: number, caption: string) => {
    setImages(prev => prev.map((img, i) => i === index ? { ...img, caption } : img))
  }

  const handleSave = async () => {
    if (images.length < 3) {
      alert('Gallery needs at least 3 images')
      return
    }

    setUploading(true)
    const uploadedImages = []

    for (const image of images) {
      if (image.file) {
        try {
          const formData = new FormData()
          formData.append('image', image.file)
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          })
          
          if (!response.ok) {
            throw new Error('Upload failed')
          }
          
          const data = await response.json()
          uploadedImages.push({
            url: data.url,
            caption: image.caption,
            order: image.order,
          })
        } catch (error) {
          console.error('Upload error:', error)
          // Use preview URL as fallback
          uploadedImages.push({
            url: image.url,
            caption: image.caption,
            order: image.order,
          })
        }
      } else {
        // Already uploaded
        uploadedImages.push({
          url: image.url,
          caption: image.caption,
          order: image.order,
        })
      }
    }

    setUploading(false)
    onSave({
      images: uploadedImages,
      title: initialConfig?.title || '',
      description: initialConfig?.description || '',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-white">Configure Image Gallery</h2>
        <p className="text-gray-400 text-sm">
          Upload images to showcase your work, products, or services
        </p>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Upload Images <span className="text-red-400">*</span>
          <span className="text-gray-500 text-xs ml-2">(Min 3, Max 20)</span>
        </label>
        
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-purple-500/50 transition bg-white/5">
          <div className="text-2xl mb-1">📸</div>
          <span className="text-sm text-gray-300">Click to upload images</span>
          <span className="text-xs text-gray-500">Max 5MB per image</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div>
          <div className="text-sm text-gray-400 mb-3">
            {images.length} image{images.length !== 1 ? 's' : ''} uploaded
            {images.length < 3 && (
              <span className="text-yellow-400 ml-2">⚠️ Need at least 3 images</span>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
                  <Image
                    src={image.url}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                    <div className="flex gap-1 mb-1">
                      {index > 0 && (
                        <button
                          onClick={() => handleMoveImage(index, 'up')}
                          className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-white"
                        >
                          ↑
                        </button>
                      )}
                      {index < images.length - 1 && (
                        <button
                          onClick={() => handleMoveImage(index, 'down')}
                          className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-white"
                        >
                          ↓
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={image.caption}
                      onChange={(e) => handleCaptionChange(index, e.target.value)}
                      placeholder="Caption (optional)"
                      className="w-full text-xs bg-white/20 border border-white/30 rounded px-2 py-1 text-white placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
          disabled={uploading || images.length < 3}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Save & Continue →'}
        </button>
      </div>
    </div>
  )
}

