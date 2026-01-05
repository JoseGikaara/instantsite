'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface PreviewEnhancerProps {
  previewId: string
  isEnhanced: boolean
  agentCredits: number
}

export default function PreviewEnhancer({
  previewId,
  isEnhanced,
  agentCredits,
}: PreviewEnhancerProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleEnhance() {
    if (agentCredits < 1) {
      setError('Insufficient credits. You need at least 1 credit to enhance with AI.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ previewId }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Enhancement failed')
        setLoading(false)
        return
      }

      // Refresh the page to show updated content
      router.refresh()
      setLoading(false)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (isEnhanced) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full">
        <span className="text-xs">✨</span>
        <span className="text-xs font-medium text-purple-400">AI Enhanced</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleEnhance}
        disabled={loading || agentCredits < 1}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-medium text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="animate-spin">⏳</span>
            <span>Enhancing...</span>
          </>
        ) : (
          <>
            <span>✨</span>
            <span>Enhance with AI (1 credit)</span>
          </>
        )}
      </button>
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
      {agentCredits < 1 && !error && (
        <p className="text-xs text-gray-400">Insufficient credits</p>
      )}
    </div>
  )
}

