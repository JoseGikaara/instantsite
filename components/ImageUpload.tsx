'use client'

import { useState } from 'react'

interface ImageUploadProps {
  previewId?: string
  onUploadComplete: (url: string) => void
  maxImages?: number
  currentImages?: string[]
  primaryColor?: string
}

export default function ImageUpload({
  previewId,
  onUploadComplete,
  maxImages = 10,
  currentImages = [],
  primaryColor = '#8B5CF6',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFile = async (file: File) => {
    if (currentImages.length >= maxImages) {
      setError(`Maximum ${maxImages} images allowed`)
      return
    }

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      if (previewId) {
        formData.append('previewId', previewId)
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      onUploadComplete(data.url)
    } catch (err: any) {
      setError(err.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          dragActive
            ? 'border-purple-500 bg-purple-500/10'
            : 'border-white/20 hover:border-purple-500/50'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={uploading || currentImages.length >= maxImages}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className={`cursor-pointer ${
            uploading || currentImages.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <div className="mb-4">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              style={{ color: primaryColor }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm text-gray-400">
              {uploading
                ? 'Uploading...'
                : currentImages.length >= maxImages
                ? `Maximum ${maxImages} images reached`
                : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
          </div>
        </label>
      </div>

      {error && (
        <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {currentImages.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-2">
            {currentImages.length} / {maxImages} images uploaded
          </p>
        </div>
      )}
    </div>
  )
}

