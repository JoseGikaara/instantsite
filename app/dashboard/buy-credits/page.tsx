import { getCurrentAgent } from '@/lib/get-agent';
import { redirect } from 'next/navigation';
import { CREDIT_PACKAGES, MPESA_DETAILS } from '@/lib/credit-packages';
import Link from 'next/link';

export default async function BuyCreditsPage() {
  const agent = await getCurrentAgent();
  if (!agent) redirect('/login');

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-purple-400 hover:text-purple-300 text-sm font-medium">
              ← Back to Dashboard
            </Link>
            <div className="px-6 py-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-full">
              <span className="text-sm text-gray-300">Current Balance: </span>
              <span className="text-xl font-bold">{agent.credit_balance}</span>
              <span className="text-sm text-gray-400"> credits</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Buy Credits
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Choose a package and follow the payment instructions</p>
        </div>

        {/* Credit Packages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {CREDIT_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative p-8 bg-gradient-to-b from-white/5 to-transparent border rounded-2xl backdrop-blur transition-all hover:scale-105 ${
                pkg.popular 
                  ? 'border-purple-500/50 shadow-xl shadow-purple-500/20' 
                  : 'border-white/10 hover:border-purple-500/30'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold">
                  MOST POPULAR
                </div>
              )}

              {/* Package Details */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {pkg.credits}
                  </span>
                  <span className="text-gray-400 text-sm ml-2">credits</span>
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-bold">KES {pkg.price.toLocaleString()}</span>
                </div>
                {pkg.savings && (
                  <div className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-medium mb-2">
                    {pkg.savings}
                  </div>
                )}
                <p className="text-gray-500 text-sm mt-4 mb-3">{pkg.description}</p>
                
                {/* Use Case */}
                {pkg.useCase && (
                  <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <p className="text-xs text-purple-300 font-medium mb-2">What you can do:</p>
                    <p className="text-xs text-gray-400">{pkg.useCase}</p>
                  </div>
                )}
              </div>

              {/* Breakdown */}
              {pkg.breakdown && (
                <div className="mb-4 p-3 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-xs text-gray-400 font-medium mb-2">Includes:</p>
                  <ul className="text-xs text-gray-500 space-y-1 text-left">
                    {pkg.breakdown.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Per Credit Cost */}
              <div className="text-center text-xs text-gray-500">
                KES {(pkg.price / pkg.credits).toFixed(0)} per credit
              </div>
            </div>
          ))}
        </div>

        {/* Payment Instructions */}
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl backdrop-blur mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">📱</span>
              M-Pesa Payment Instructions
            </h2>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Choose Your Package</h3>
                  <p className="text-gray-400 text-sm">Select the credit package you want from the options above</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Make M-Pesa Payment</h3>
                  <p className="text-gray-400 text-sm mb-3">Send payment to our Buy Goods Till Number:</p>
                  
                  <div className="p-4 bg-black/40 border border-purple-500/30 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Till Number:</span>
                      <span className="text-2xl font-bold text-purple-400">{MPESA_DETAILS.tillNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Business Name:</span>
                      <span className="font-semibold">{MPESA_DETAILS.businessName}</span>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-yellow-400 text-xs">
                      ⚠️ <strong>Important:</strong> Include your email ({agent.email}) in the M-Pesa reference/account number
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Get Your Redemption Code</h3>
                  <p className="text-gray-400 text-sm">
                    After payment, contact us via WhatsApp or email with your M-Pesa confirmation message. 
                    We'll send you a redemption code within 5-10 minutes.
                  </p>
                  <div className="flex gap-3 mt-3">
                    <a 
                      href={`https://wa.me/254712345678?text=Hi, I just made a payment for InstantSite credits. My email is ${agent.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition"
                    >
                      📱 WhatsApp Us
                    </a>
                    <a 
                      href="mailto:support@instantsite.com?subject=Credit Purchase Confirmation"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition"
                    >
                      📧 Email Us
                    </a>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Redeem Your Code</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Once you receive your redemption code, enter it below to add credits to your account
                  </p>
                  <Link 
                    href="/dashboard/redeem"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
                  >
                    Redeem Code →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Credit Costs Reference */}
          <div className="p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl mb-6">
            <h3 className="font-bold mb-4 text-lg">Credit Costs Reference</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-300 font-medium mb-2">One-Time Costs</p>
                <ul className="space-y-1 text-gray-400">
                  <li>• Website Preview: <strong className="text-white">1 credit</strong> (KES 150)</li>
                  <li>• AI Enhancement: <strong className="text-white">1 credit</strong> (KES 150)</li>
                  <li>• Website Deployment: <strong className="text-white">20 credits</strong> (KES 3,000)</li>
                </ul>
              </div>
              <div>
                <p className="text-gray-300 font-medium mb-2">Recurring Costs</p>
                <ul className="space-y-1 text-gray-400">
                  <li>• Monthly Hosting: <strong className="text-white">5 credits/month</strong> (KES 750/month)</li>
                  <li>• Annual Hosting: <strong className="text-white">50 credits/year</strong> (KES 7,500/year)</li>
                  <li className="text-green-400 text-xs mt-2">💡 Annual plan saves 10 credits per year!</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="font-bold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-300 font-medium">How long does it take to receive my code?</p>
                <p className="text-gray-400">Usually 5-10 minutes during business hours (8am-8pm EAT)</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">What happens if I run out of credits?</p>
                <p className="text-gray-400">Live websites will be automatically paused if hosting credits are insufficient. Add credits to resume them.</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">Can I get a refund?</p>
                <p className="text-gray-400">Codes can be refunded within 24 hours if unused</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">Do codes expire?</p>
                <p className="text-gray-400">Redemption codes are valid for 30 days from purchase</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

