'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatDateReadable } from '@/lib/date-utils'
import { DomainConnectionModal } from '@/components/DomainConnectionModal'

interface Agent {
  id: string
  email: string
  credit_balance: number
}

interface Preview {
  id: string
  business_name: string
  website_type: string
  preview_url: string | null
  status: string
  created_at: string | Date | null
  ai_content?: any
  sections?: any
  primary_color?: string
  accent_color?: string
  theme?: string
  custom_domain?: string | null
  domain_status?: 'PENDING' | 'CONNECTED' | 'ERROR' | null
}

interface Audit {
  id: string
  business_name: string
  location: string
  found: boolean
  completeness_score: number
  reviews_present: boolean
  photos_present: boolean
  created_at: string | Date | null
}

interface HostingSummary {
  liveSitesCount: number
  monthlyCost: number
  annualCost: number
  totalMonthlyEquivalent: number
  nextChargeDate: string | Date | null
  sitesByPlan: {
    monthly: number
    annual: number
  }
}

export default function DashboardClient({
  agent,
  previews,
  audits,
  hostingSummary,
}: {
  agent: Agent
  previews: Preview[]
  audits: Audit[]
  hostingSummary: HostingSummary
}) {
  const router = useRouter()
  const [domainModalOpen, setDomainModalOpen] = useState(false)
  const [selectedWebsite, setSelectedWebsite] = useState<Preview | null>(null)

  async function handleLogout() {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' })
      if (res.ok) {
        router.push('/')
        router.refresh()
      } else {
        // Still redirect even if logout fails
        router.push('/')
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Still redirect even if logout fails
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                InstantSite
              </h1>
              <p className="text-sm text-gray-500 mt-1">Welcome back, {agent.email}</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Credit Display */}
              <div className="px-6 py-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-full backdrop-blur">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-300">Credits</span>
                  <span className="text-xl font-bold text-white">{agent.credit_balance}</span>
                </div>
              </div>

              {/* Buy Credits Button */}
              <Link 
                href="/dashboard/buy-credits"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition"
              >
                Buy Credits
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hosting Summary Card */}
        {hostingSummary.liveSitesCount > 0 && (
          <div className="mb-8 p-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-2xl backdrop-blur">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Live Websites</h3>
                <p className="text-gray-300 text-sm mb-2">
                  You have <strong className="text-green-400">{hostingSummary.liveSitesCount}</strong> live website{hostingSummary.liveSitesCount !== 1 ? 's' : ''}
                  {hostingSummary.sitesByPlan.monthly > 0 && hostingSummary.sitesByPlan.annual > 0 && (
                    <span className="text-gray-400">
                      {' '}({hostingSummary.sitesByPlan.monthly} monthly, {hostingSummary.sitesByPlan.annual} annual)
                    </span>
                  )}
                </p>
                {hostingSummary.sitesByPlan.annual > 0 && (
                  <p className="text-xs text-green-400">
                    💰 Annual plan saves {hostingSummary.sitesByPlan.annual * 10} credits/year
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Monthly Equivalent Cost</p>
                <p className="text-2xl font-bold text-green-400">
                  {Math.round(hostingSummary.totalMonthlyEquivalent * 10) / 10} credits
                </p>
                {hostingSummary.monthlyCost > 0 && hostingSummary.annualCost > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {hostingSummary.monthlyCost} monthly + {Math.round(hostingSummary.annualCost / 12 * 10) / 10} annual
                  </p>
                )}
                {hostingSummary.nextChargeDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Next charge: {formatDateReadable(hostingSummary.nextChargeDate)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link href="/dashboard/generate" className="group">
            <div className="p-8 bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20 rounded-2xl hover:border-purple-500/40 transition cursor-pointer h-full backdrop-blur">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-2xl">
                  🚀
                </div>
                <div className="text-xs text-purple-400 font-medium px-3 py-1 bg-purple-500/10 rounded-full">
                  1 credit
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition">
                Generate Website Preview
              </h3>
              <p className="text-gray-400 text-sm">
                Create a professional website preview in seconds with our templates
              </p>
            </div>
          </Link>

          <Link href="/dashboard/audit" className="group">
            <div className="p-8 bg-gradient-to-br from-pink-900/20 to-transparent border border-pink-500/20 rounded-2xl hover:border-pink-500/40 transition cursor-pointer h-full backdrop-blur">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center text-2xl">
                  🎯
                </div>
                <div className="text-xs text-pink-400 font-medium px-3 py-1 bg-pink-500/10 rounded-full">
                  1 credit
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition">
                Run Google Presence Audit
              </h3>
              <p className="text-gray-400 text-sm">
                Check if your business is visible and optimized on Google
              </p>
            </div>
          </Link>
        </div>

        {/* Website Previews */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Your Website Previews</h2>
          
          {previews.length === 0 ? (
            <div className="p-12 bg-white/5 border border-white/10 rounded-2xl text-center">
              <p className="text-gray-400">No previews yet. Generate your first one!</p>
            </div>
          ) : (
            <div className="bg-[#131318] border border-white/10 rounded-2xl overflow-hidden backdrop-blur">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Business</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {previews.map((preview) => (
                      <tr key={preview.id} className="hover:bg-white/5 transition">
                        <td className="px-6 py-4 text-white font-medium">{preview.business_name}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{preview.website_type}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              preview.status === 'LIVE' 
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                                : preview.status === 'PAUSED'
                                ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            }`}>
                              {preview.status === 'PREVIEW' ? 'Preview' : preview.status}
                            </span>
                            {preview.ai_content && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs">
                                <span>✨</span>
                                <span>AI Enhanced</span>
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {formatDateReadable(preview.created_at)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 flex-wrap">
                            {preview.preview_url && (
                              <Link
                                href={`/preview/${preview.preview_url}`}
                                className="text-purple-400 hover:text-purple-300 text-sm font-medium transition"
                              >
                                View →
                              </Link>
                            )}
                            {preview.status === 'LIVE' && preview.preview_url && (
                              <button
                                onClick={() => {
                                  setSelectedWebsite(preview)
                                  setDomainModalOpen(true)
                                }}
                                className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-medium transition"
                              >
                                {preview.custom_domain ? 'Domain' : 'Connect Domain'}
                              </button>
                            )}
                            {preview.status === 'PREVIEW' && preview.preview_url && (
                              <button
                                onClick={async () => {
                                  const plan = prompt(
                                    `Choose hosting plan:\n\n` +
                                    `1. Monthly (25 credits total: 20 deployment + 5 monthly)\n` +
                                    `2. Annual (70 credits total: 20 deployment + 50 annual)\n\n` +
                                    `Type "1" for Monthly or "2" for Annual:`
                                  )
                                  
                                  if (!plan) return
                                  
                                  const hostingPlan = plan.trim() === '2' ? 'ANNUAL' : 'MONTHLY'
                                  const totalCost = hostingPlan === 'ANNUAL' ? 70 : 25
                                  
                                  if (confirm(`Deploy with ${hostingPlan.toLowerCase()} hosting? This will cost ${totalCost} credits (20 deployment + ${hostingPlan === 'ANNUAL' ? '50 annual' : '5 monthly'} hosting).`)) {
                                    try {
                                      const res = await fetch('/api/deploy', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ 
                                          previewId: preview.preview_url,
                                          hostingPlan,
                                        }),
                                      })
                                      const data = await res.json()
                                      if (res.ok) {
                                        alert(`Website deployed successfully with ${hostingPlan.toLowerCase()} hosting!`)
                                        window.location.reload()
                                      } else {
                                        alert(data.error || 'Failed to deploy')
                                      }
                                    } catch (error) {
                                      alert('Error deploying website')
                                    }
                                  }
                                }}
                                className="px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-xs font-medium hover:shadow-lg transition"
                              >
                                Deploy
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Audits */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Google Presence Audits</h2>
          
          {audits.length === 0 ? (
            <div className="p-12 bg-white/5 border border-white/10 rounded-2xl text-center">
              <p className="text-gray-400">No audits yet. Run your first one!</p>
            </div>
          ) : (
            <div className="bg-[#131318] border border-white/10 rounded-2xl overflow-hidden backdrop-blur">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Business</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Found</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {audits.map((audit) => (
                      <tr key={audit.id} className="hover:bg-white/5 transition">
                        <td className="px-6 py-4 text-white font-medium">{audit.business_name}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{audit.location}</td>
                        <td className="px-6 py-4">
                          <span className="text-lg">
                            {audit.found ? '✅' : '❌'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden max-w-[100px]">
                              <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                style={{ width: `${audit.completeness_score}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-400 font-medium">{audit.completeness_score}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {formatDateReadable(audit.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Domain Connection Modal */}
      {selectedWebsite && (
        <DomainConnectionModal
          isOpen={domainModalOpen}
          onClose={() => {
            setDomainModalOpen(false)
            setSelectedWebsite(null)
            router.refresh()
          }}
          websiteId={selectedWebsite.preview_url || ''}
          currentDomain={selectedWebsite.custom_domain}
          currentStatus={selectedWebsite.domain_status}
        />
      )}
    </div>
  )
}
