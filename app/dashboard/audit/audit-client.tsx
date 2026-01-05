'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Agent {
  id: string
  credit_balance: number
}

export default function AuditClient({ agent }: { agent: Agent }) {
  const router = useRouter()
  const [businessName, setBusinessName] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<any>(null)

  async function handleAudit() {
    if (!businessName || !location) {
      setError('Business name and location are required')
      return
    }

    if (agent.credit_balance < 1) {
      setError('Insufficient credits')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name: businessName,
          location,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Audit failed')
        setLoading(false)
        return
      }

      setResult(data)
      setLoading(false)
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
                Google Presence Audit
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

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-[#131318] border border-white/10 rounded-2xl p-8 backdrop-blur">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-xs font-medium text-pink-400 mb-2">
              Google Business Audit
            </div>
            <h2 className="text-2xl font-bold text-white mt-4">Enter Business Information</h2>
            <p className="text-gray-400 text-sm mt-2">Check your business visibility on Google</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition"
                placeholder="e.g., Joe's Restaurant"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition"
                placeholder="e.g., Nairobi, Kenya"
              />
            </div>
          </div>
          
          <button
            onClick={handleAudit}
            disabled={loading}
            className="mt-8 w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Running Audit...' : 'Run Audit (1 credit)'}
          </button>

          {result && (
            <div className="mt-8 border-t border-white/10 pt-8">
              <h3 className="text-xl font-bold text-white mb-6">Audit Results</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl">
                  <span className="font-medium text-gray-300">Business found on Google?</span>
                  <span className={`text-xl font-bold ${result.found ? 'text-green-400' : 'text-red-400'}`}>
                    {result.found ? '✅ Yes' : '❌ No'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-5 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl">
                  <span className="font-medium text-gray-300">Profile completeness score</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${result.completeness_score}%` }}
                      />
                    </div>
                    <span className="font-bold text-white">{result.completeness_score}/100</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-5 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl">
                  <span className="font-medium text-gray-300">Reviews present?</span>
                  <span className={`text-xl ${result.reviews_present ? 'text-green-400' : 'text-red-400'}`}>
                    {result.reviews_present ? '✅ Yes' : '❌ No'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-5 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl">
                  <span className="font-medium text-gray-300">Photos present?</span>
                  <span className={`text-xl ${result.photos_present ? 'text-green-400' : 'text-red-400'}`}>
                    {result.photos_present ? '✅ Yes' : '❌ No'}
                  </span>
                </div>
                <div className="mt-6 p-5 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-xl">
                  <p className="font-semibold text-white">
                    💡 Recommended Fix: Google Business Setup
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
