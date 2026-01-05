'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RedeemPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<{ credits: number; newBalance: number } | null>(null);
  const router = useRouter();

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(null);

    try {
      const res = await fetch('/api/credits/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim().toUpperCase() })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess({ 
          credits: data.credits, 
          newBalance: data.newBalance 
        });
        setCode('');
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh();
        }, 3000);
      } else {
        setError(data.error || 'Failed to redeem code');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back Link */}
        <Link href="/dashboard" className="inline-block mb-6 text-purple-400 hover:text-purple-300 text-sm font-medium">
          ← Back to Dashboard
        </Link>

        {/* Card */}
        <div className="bg-[#131318] border border-white/10 rounded-2xl p-8 backdrop-blur">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎟️</div>
            <h1 className="text-2xl font-bold text-white mb-2">Redeem Code</h1>
            <p className="text-gray-400 text-sm">Enter your redemption code to add credits</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="text-green-400 font-bold text-lg mb-2">Code Redeemed Successfully!</h3>
              <p className="text-gray-300 mb-3">
                <span className="text-2xl font-bold text-green-400">+{success.credits}</span> credits added
              </p>
              <p className="text-gray-400 text-sm">
                New balance: <span className="font-bold text-white">{success.newBalance}</span> credits
              </p>
              <p className="text-gray-500 text-xs mt-3">Redirecting to dashboard...</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          {!success && (
            <form onSubmit={handleRedeem} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Redemption Code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-xl text-white text-center text-lg font-mono placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition tracking-wider"
                  placeholder="INST-XXXX-XXXX"
                  required
                  disabled={loading}
                />
                <p className="mt-2 text-xs text-gray-500">Format: INST-XXXX-XXXX</p>
              </div>

              <button
                type="submit"
                disabled={loading || !code}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Redeeming...' : 'Redeem Code'}
              </button>
            </form>
          )}

          {/* Help Text */}
          {!success && (
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm mb-3">Don't have a code yet?</p>
              <Link 
                href="/dashboard/buy-credits"
                className="text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                Buy Credits →
              </Link>
            </div>
          )}
        </div>

        {/* Info Box */}
        {!success && (
          <div className="mt-6 p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
            <p className="text-xs text-gray-400">
              <span className="text-purple-400 font-medium">Tip:</span> Codes are case-insensitive and can include or exclude dashes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

