'use client'

interface Step {
  step: number
  title: string
  description: string
}

interface ProcessStepsProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
}

export default function ProcessSteps({ content, primaryColor, accentColor, theme }: ProcessStepsProps) {
  const steps: Step[] = Array.isArray(content) ? content : (content?.steps || [])

  if (!steps || steps.length === 0) {
    return null
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">How It Works</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">Simple steps to get started</p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 transform -translate-y-1/2"
            style={{ background: `linear-gradient(90deg, ${primaryColor}40, ${accentColor}40)` }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white relative z-10"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                  }}
                >
                  {step.step || index + 1}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

