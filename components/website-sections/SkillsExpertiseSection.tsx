'use client'

interface SkillsExpertiseSectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function SkillsExpertiseSection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: SkillsExpertiseSectionProps) {
  const skills = content?.skills || [
    { name: 'Skill 1', proficiency: 'Expert', icon: '🎯' },
    { name: 'Skill 2', proficiency: 'Advanced', icon: '💡' },
  ]

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  const proficiencyColors: Record<string, string> = {
    Expert: '#10B981', // green
    Advanced: '#3B82F6', // blue
    Intermediate: '#F59E0B', // yellow
  }

  return (
    <section className={`py-20 ${themeClass}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            Skills & Expertise
          </h2>
          <p className="text-gray-400 text-lg">What I'm good at</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill: any, index: number) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-white/10 backdrop-blur text-center hover:border-purple-500/50 transition"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
              }}
            >
              <div className="text-4xl mb-3">{skill.icon || '🎯'}</div>
              <div className="text-white font-semibold mb-2">{skill.name}</div>
              <div
                className="text-xs px-3 py-1 rounded-full inline-block"
                style={{
                  backgroundColor: `${proficiencyColors[skill.proficiency] || primaryColor}20`,
                  color: proficiencyColors[skill.proficiency] || primaryColor,
                  border: `1px solid ${proficiencyColors[skill.proficiency] || primaryColor}40`,
                }}
              >
                {skill.proficiency}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

