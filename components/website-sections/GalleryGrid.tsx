'use client'

import { useState } from 'react'
import Image from 'next/image'

interface GalleryGridProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  previewId?: string
}

export default function GalleryGrid({ content, primaryColor, accentColor, theme, previewId }: GalleryGridProps) {
  const images = Array.isArray(content) ? content : (content?.images || [])
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  if (!images || images.length === 0) {
    return null
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">Our Gallery</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">See our work in action</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {images.map((image: string | { url: string; alt?: string }, index: number) => {
            const imageUrl = typeof image === 'string' ? image : image.url
            const imageAlt = typeof image === 'object' ? image.alt : `Gallery image ${index + 1}`
            
            return (
              <div
                key={index}
                onClick={() => setLightboxImage(imageUrl)}
                className="group relative aspect-square rounded-lg sm:rounded-xl overflow-hidden cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
                }}
              >
                {imageUrl.startsWith('/') || imageUrl.startsWith('http') ? (
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform">
                    Image {index + 1}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxImage(null)}
        >
          <div className="max-w-4xl w-full relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxImage(null)
              }}
              className="absolute -top-10 sm:-top-12 right-0 text-white text-xl sm:text-2xl hover:text-gray-400 z-10"
            >
              ✕
            </button>
            <div className="relative w-full aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-white/10">
              {lightboxImage.startsWith('/') || lightboxImage.startsWith('http') ? (
                <Image
                  src={lightboxImage}
                  alt="Gallery image"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  {lightboxImage}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

