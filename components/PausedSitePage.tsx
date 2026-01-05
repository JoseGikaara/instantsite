'use client'

import Link from 'next/link'

interface PausedSitePageProps {
  businessName: string
  agentEmail?: string
}

export default function PausedSitePage({ businessName, agentEmail }: PausedSitePageProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Website Temporarily Unavailable
          </h1>
          <p className="text-xl text-gray-400 mb-2">
            This website for <strong className="text-white">{businessName}</strong> is currently paused.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why is this site paused?</h2>
          <p className="text-gray-300 mb-6">
            The website hosting subscription requires monthly credits. When credits are insufficient,
            the site is automatically paused to prevent service interruption.
          </p>

          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Monthly Hosting Fee</h3>
                <p className="text-sm text-gray-400">
                  Each live website requires 5 credits per month for hosting.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Insufficient Credits</h3>
                <p className="text-sm text-gray-400">
                  The account balance fell below the required hosting amount.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Automatic Pause</h3>
                <p className="text-sm text-gray-400">
                  The site was automatically paused to prevent service charges.
                </p>
              </div>
            </div>
          </div>
        </div>

        {agentEmail && (
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-6 mb-8">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Website Owner:</strong> If you're the owner of this website,
              please log in to your InstantSite account to add credits and resume your website.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
            >
              Log In to Resume
            </Link>
          </div>
        )}

        <div className="text-sm text-gray-500">
          <p>Powered by <span className="text-purple-400 font-semibold">InstantSite</span></p>
        </div>
      </div>
    </div>
  )
}

