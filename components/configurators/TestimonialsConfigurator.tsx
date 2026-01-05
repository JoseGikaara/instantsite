'use client'

import { useState } from 'react'

interface TestimonialsConfiguratorProps {
  onSave: (config: any) => void
  onSkip: () => void
  initialConfig?: any
}

interface Testimonial {
  name: string
  location: string
  rating: number
  text: string
  photo?: string
  role?: string
}

export function TestimonialsConfigurator({ onSave, onSkip, initialConfig }: TestimonialsConfiguratorProps) {
  const [mode, setMode] = useState<'manual' | 'ai-generated'>(initialConfig?.mode || 'ai-generated')
  const [manualTestimonials, setManualTestimonials] = useState<Testimonial[]>(
    initialConfig?.manual || Array.from({ length: 3 }, () => ({
      name: '',
      location: '',
      rating: 5,
      text: '',
      role: '',
    }))
  )
  const [aiContext, setAiContext] = useState({
    businessType: initialConfig?.aiContext?.businessType || '',
    whatCustomersLove: initialConfig?.aiContext?.whatCustomersLove || '',
    commonOutcomes: initialConfig?.aiContext?.commonOutcomes || '',
  })

  const updateTestimonial = (index: number, updates: Partial<Testimonial>) => {
    setManualTestimonials(prev => prev.map((t, i) => i === index ? { ...t, ...updates } : t))
  }

  const addTestimonial = () => {
    setManualTestimonials(prev => [...prev, {
      name: '',
      location: '',
      rating: 5,
      text: '',
      role: '',
    }])
  }

  const removeTestimonial = (index: number) => {
    setManualTestimonials(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    if (mode === 'manual') {
      // Validate manual testimonials
      const validTestimonials = manualTestimonials.filter(t => 
        t.name.trim() && t.text.trim() && t.location.trim()
      )
      if (validTestimonials.length < 3) {
        alert('Please provide at least 3 complete testimonials')
        return
      }
      onSave({
        mode: 'manual',
        manual: validTestimonials,
      })
    } else {
      // Validate AI context
      if (!aiContext.businessType.trim()) {
        alert('Please provide business type for AI generation')
        return
      }
      onSave({
        mode: 'ai-generated',
        aiContext,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-white">Configure Testimonials</h2>
        <p className="text-gray-400 text-sm">
          Add customer testimonials manually or let AI generate them
        </p>
      </div>

      {/* Mode Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          How would you like to add testimonials?
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-purple-500/50 cursor-pointer transition">
            <input
              type="radio"
              name="testimonialMode"
              value="ai-generated"
              checked={mode === 'ai-generated'}
              onChange={() => setMode('ai-generated')}
              className="w-4 h-4"
            />
            <div>
              <div className="text-white font-medium">Let AI Generate</div>
              <div className="text-xs text-gray-400">AI will create realistic testimonials based on your business</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-purple-500/50 cursor-pointer transition">
            <input
              type="radio"
              name="testimonialMode"
              value="manual"
              checked={mode === 'manual'}
              onChange={() => setMode('manual')}
              className="w-4 h-4"
            />
            <div>
              <div className="text-white font-medium">Add Manually</div>
              <div className="text-xs text-gray-400">Enter testimonials yourself</div>
            </div>
          </label>
        </div>
      </div>

      {/* AI Generation Mode */}
      {mode === 'ai-generated' && (
        <div className="space-y-4 p-6 rounded-xl border border-white/10 bg-white/5">
          <h3 className="text-lg font-semibold text-white">AI Generation Context</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Business Type <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={aiContext.businessType}
              onChange={(e) => setAiContext({ ...aiContext, businessType: e.target.value })}
              placeholder="e.g., Restaurant, Consulting Firm, E-commerce Store"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              What Customers Love About You
            </label>
            <textarea
              value={aiContext.whatCustomersLove}
              onChange={(e) => setAiContext({ ...aiContext, whatCustomersLove: e.target.value })}
              placeholder="e.g., Fast service, friendly staff, quality products"
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Common Results/Outcomes
            </label>
            <textarea
              value={aiContext.commonOutcomes}
              onChange={(e) => setAiContext({ ...aiContext, commonOutcomes: e.target.value })}
              placeholder="e.g., Increased sales, saved time, better results"
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      )}

      {/* Manual Entry Mode */}
      {mode === 'manual' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Testimonials</h3>
            <button
              onClick={addTestimonial}
              className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-xl transition text-sm"
            >
              + Add Testimonial
            </button>
          </div>

          {manualTestimonials.map((testimonial, index) => (
            <div key={index} className="p-6 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-medium">Testimonial {index + 1}</h4>
                {manualTestimonials.length > 3 && (
                  <button
                    onClick={() => removeTestimonial(index)}
                    className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Customer Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={testimonial.name}
                      onChange={(e) => updateTestimonial(index, { name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Location <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={testimonial.location}
                      onChange={(e) => updateTestimonial(index, { location: e.target.value })}
                      placeholder="Nairobi, Kenya"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role/Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={testimonial.role || ''}
                    onChange={(e) => updateTestimonial(index, { role: e.target.value })}
                    placeholder="e.g., Business Owner, Customer"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rating <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => updateTestimonial(index, { rating })}
                        className={`w-10 h-10 rounded-lg border transition ${
                          testimonial.rating >= rating
                            ? 'bg-yellow-500 border-yellow-500 text-white'
                            : 'bg-white/5 border-white/10 text-gray-400'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Testimonial Text <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={testimonial.text}
                    onChange={(e) => updateTestimonial(index, { text: e.target.value })}
                    placeholder="Write the customer's testimonial here..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          ))}

          <p className="text-sm text-gray-400">
            ⚠️ At least 3 complete testimonials are required
          </p>
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
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition"
        >
          Save & Continue →
        </button>
      </div>
    </div>
  )
}

