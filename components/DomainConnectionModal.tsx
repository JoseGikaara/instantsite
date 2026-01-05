'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface DomainConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  websiteId: string
  currentDomain?: string | null
  currentStatus?: 'PENDING' | 'CONNECTED' | 'ERROR' | null
}

export function DomainConnectionModal({
  isOpen,
  onClose,
  websiteId,
  currentDomain,
  currentStatus,
}: DomainConnectionModalProps) {
  const [domain, setDomain] = useState(currentDomain || '')
  const [status, setStatus] = useState<'PENDING' | 'CONNECTED' | 'ERROR' | null>(currentStatus || null)
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setDomain(currentDomain || '')
      setStatus(currentStatus || null)
      setError('')
    }
  }, [isOpen, currentDomain, currentStatus])

  if (!isOpen) return null

  const handleConnect = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch(`/api/websites/${websiteId}/domain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domain.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to connect domain')
        setLoading(false)
        return
      }

      setDomain(data.domain)
      setStatus(data.status)
      setLoading(false)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const handleCheckConnection = async () => {
    if (!domain) {
      setError('No domain connected')
      return
    }

    setChecking(true)
    setError('')

    try {
      const res = await fetch(`/api/websites/${websiteId}/domain`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to check domain status')
        setChecking(false)
        return
      }

      setStatus(data.status)
      setChecking(false)
    } catch (err) {
      setError('Failed to check connection')
      setChecking(false)
    }
  }

  const handleRemove = async () => {
    if (!confirm('Are you sure you want to remove this domain?')) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/websites/${websiteId}/domain`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setDomain('')
        setStatus(null)
        onClose()
      }
    } catch (err) {
      setError('Failed to remove domain')
    }
    setLoading(false)
  }

  const getStatusBadge = () => {
    if (!status) return null

    const colors = {
      PENDING: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
      CONNECTED: 'bg-green-500/20 border-green-500/50 text-green-400',
      ERROR: 'bg-red-500/20 border-red-500/50 text-red-400',
    }

    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${colors[status]}`}>
        <div className={`w-2 h-2 rounded-full ${
          status === 'CONNECTED' ? 'bg-green-400' :
          status === 'ERROR' ? 'bg-red-400' :
          'bg-yellow-400'
        }`} />
        <span className="text-sm font-medium">{status}</span>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#131318] border border-white/10 rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Connect Custom Domain</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Info Notice */}
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <p className="text-sm text-blue-300">
            <strong>Note:</strong> Domains are owned and renewed by agents or clients. 
            InstantSite does not sell or manage domain registrations.
          </p>
        </div>

        {/* Domain Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Enter Domain
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="mybusiness.co.ke"
              disabled={loading || !!currentDomain}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 disabled:opacity-50"
            />
            {!currentDomain && (
              <button
                onClick={handleConnect}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50"
              >
                {loading ? 'Connecting...' : 'Connect'}
              </button>
            )}
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}
        </div>

        {/* Status Badge */}
        {currentDomain && (
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-2">Domain Status</p>
              {getStatusBadge()}
            </div>
            <button
              onClick={handleCheckConnection}
              disabled={checking}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm transition disabled:opacity-50"
            >
              {checking ? 'Checking...' : 'Check Connection'}
            </button>
          </div>
        )}

        {/* DNS Instructions */}
        <div className="mb-6 p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">DNS Configuration Instructions</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-2">Option 1: A Record (Root Domain)</p>
              <div className="bg-black/40 rounded-lg p-4 space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">Host:</span>
                  <span className="text-white">@</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Value:</span>
                  <span className="text-white">76.76.21.21</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">TTL:</span>
                  <span className="text-white">Auto</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-300 mb-2">Option 2: CNAME (WWW Subdomain)</p>
              <div className="bg-black/40 rounded-lg p-4 space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">Host:</span>
                  <span className="text-white">www</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Value:</span>
                  <span className="text-white">cname.vercel-dns.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">TTL:</span>
                  <span className="text-white">Auto</span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            Add these DNS records in your domain registrar's control panel. 
            Changes may take up to 48 hours to propagate.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {currentDomain && (
            <button
              onClick={handleRemove}
              disabled={loading}
              className="px-6 py-3 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/10 transition disabled:opacity-50"
            >
              Remove Domain
            </button>
          )}
          <button
            onClick={onClose}
            className="px-6 py-3 border border-white/10 text-gray-300 rounded-xl hover:bg-white/5 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

