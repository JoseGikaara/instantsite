'use client'

interface WorkGallerySectionProps {
  content: any
  primaryColor: string
  accentColor: string
  theme: string
  phone?: string
}

export default function WorkGallerySection({
  content,
  primaryColor,
  accentColor,
  theme,
  phone,
}: WorkGallerySectionProps) {
  const projects = content?.projects || Array.from({ length: 12 }, (_, i) => ({
    title: `Project ${i + 1}`,
    category: 'Category',
    description: 'Project description',
    image: '',
    client: '',
  }))

  const themeClass = theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-gray-900'

  return (
    <section className={`py-20 ${themeClass}`} id="work">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: primaryColor }}>
            My Work
          </h2>
          <p className="text-gray-400 text-lg">A selection of my best projects</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any, index: number) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur hover:border-purple-500/50 transition cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
              }}
            >
              {/* Project Image */}
              <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl">🎨</span>
                )}
              </div>

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition flex items-center justify-center p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                  <p className="text-sm text-gray-300 mb-2">{project.category}</p>
                  <p className="text-xs text-gray-400">{project.description}</p>
                  {project.client && (
                    <p className="text-xs text-purple-300 mt-2">Client: {project.client}</p>
                  )}
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur"
                  style={{ backgroundColor: `${primaryColor}80`, color: 'white' }}
                >
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

