'use client'

interface ProblemSolutionSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function ProblemSolutionSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: ProblemSolutionSectionProps) {
  const data = content || {
    problems: [
      { title: 'Problem 1', description: 'Description of problem' },
      { title: 'Problem 2', description: 'Description of problem' },
      { title: 'Problem 3', description: 'Description of problem' },
    ],
    solutions: [
      { title: 'Solution 1', description: 'How we solve it' },
      { title: 'Solution 2', description: 'How we solve it' },
      { title: 'Solution 3', description: 'How we solve it' },
    ],
  }

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            The Problem & Our Solution
          </h2>
          <p className="text-gray-400 text-lg">We understand your challenges and have the answers</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Problems Column */}
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full mb-4">
                <span className="text-red-400 font-semibold text-lg">❌ Without Us</span>
              </div>
            </div>
            {data.problems.map((problem: any, index: number) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5"
              >
                <h3 className="text-xl font-bold mb-2 text-red-400">{problem.title}</h3>
                <p className="text-gray-300">{problem.description}</p>
              </div>
            ))}
          </div>

          {/* Solutions Column */}
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full mb-4">
                <span className="text-green-400 font-semibold text-lg">✅ With Us</span>
              </div>
            </div>
            {data.solutions.map((solution: any, index: number) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5"
              >
                <h3 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>
                  {solution.title}
                </h3>
                <p className="text-gray-300">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

