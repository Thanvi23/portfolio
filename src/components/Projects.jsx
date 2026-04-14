import { ExternalLink, Code2, Layers } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

const projects = [
  {
    id: 1,
    title: 'Exam Portal Deployment (GCP)',
    category: 'Cloud Deployment',
    description: 'Production DevOps project deploying React frontend on Firebase Hosting and Node.js backend on GCP Cloud Run. Implemented automated CI/CD pipelines using Cloud Build with PostgreSQL Cloud SQL integration and comprehensive monitoring.',
    tags: ['Docker', 'GCP', 'Firebase', 'Cloud Build', 'PostgreSQL', 'Cloud SQL', 'Cloud Logging'],
    status: 'LIVE',
    accent: '#06b6d4',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    link: 'https://github.com/eswarsanthosh',
    image: 'https://images.unsplash.com/photo-1667372335033-c42a0472a9a9?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'ChatRobo CI/CD Pipeline',
    category: 'CI/CD & Automation',
    description: 'Designed and implemented complete CI/CD pipeline using GitHub, Cloud Build, and Cloud Run. Deployed Docker containers via Artifact Registry with Firebase Hosting frontend and environment variable management for production.',
    tags: ['GitHub', 'Cloud Build', 'Docker', 'Cloud Run', 'Firebase', 'Artifact Registry'],
    status: 'LIVE',
    accent: '#8b5cf6',
    gradient: 'from-purple-500/20 to-pink-500/20',
    link: 'https://github.com/eswarsanthosh',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Solid Fashion E-Commerce Deployment',
    category: 'Cloud Deployment',
    description: 'Deployed production e-commerce application on Firebase Hosting with custom domain and HTTPS. Configured SPA routing, handled version control integration, implemented payment gateway debugging, and managed DNS/domain mapping.',
    tags: ['Firebase', 'React', 'Node.js', 'Razorpay', 'DNS', 'HTTPS'],
    status: 'LIVE',
    accent: '#10b981',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    link: 'https://solidfashion.in',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab655c34b?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Infrastructure as Code (IaC)',
    category: 'Infrastructure',
    description: 'Infrastructure automation project using Terraform for resource provisioning. Managed cloud infrastructure configuration, automated deployment workflows, and infrastructure monitoring setup with Prometheus and Grafana.',
    tags: ['Terraform', 'Kubernetes', 'Ansible', 'Prometheus', 'Grafana', 'Infrastructure Automation'],
    status: 'ACTIVE',
    accent: '#f59e0b',
    gradient: 'from-amber-500/20 to-orange-500/20',
    link: 'https://github.com/eswarsanthosh',
    image: 'https://images.unsplash.com/photo-1518611505868-d7b60fc8b93b?w=600&h=400&fit=crop',
  },
]

export default function Projects() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [active, setActive] = useState('All')
  const { ref, inView } = useInView(0.05)
  const categories = ['All', 'Cloud Deployment', 'CI/CD & Automation', 'Infrastructure']
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  const accentPurple = isDark ? '#8b5cf6' : '#7c3aed'
  const accentCyan = isDark ? '#06b6d4' : '#0891b2'
  const textSecondary = isDark ? '#94a3b8' : '#3a3a3a'
  const textMuted = isDark ? '#64748b' : '#6b7280'
  const cardBg = isDark ? 'rgba(10,15,28,0.8)' : 'rgba(255,255,255,0.8)'
  const borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.1)'

  return (
    <section id="projects" className="py-28 md:py-36 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: isDark ? 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' : 'linear-gradient(90deg, transparent, rgba(124,58,237,0.2), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: isDark ? 'linear-gradient(90deg, transparent, rgba(6,182,212,0.2), transparent)' : 'linear-gradient(90deg, transparent, rgba(8,145,178,0.15), transparent)' }} />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
            style={{ 
              border: isDark ? '1px solid rgba(139,92,246,0.3)' : '1px solid rgba(124,58,237,0.25)',
              background: isDark ? 'rgba(139,92,246,0.05)' : 'rgba(124,58,237,0.05)'
            }}>
            <Layers className="w-4 h-4" style={{ color: accentPurple }} />
            <span className="text-sm font-medium tracking-wide" style={{ color: accentPurple }}>Featured Works</span>
          </div>
          <h2 className="font-black mb-4" style={{ 
            fontSize: 'clamp(3rem, 7vw, 5rem)', 
            background: isDark 
              ? 'linear-gradient(135deg, #06b6d4, #8b5cf6)'
              : 'linear-gradient(135deg, #0891b2, #7c3aed)',
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            backgroundClip: 'text' 
          }}>
            Portfolio
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: textSecondary }}>Carefully crafted DevOps projects showcasing expertise in cloud deployment, CI/CD automation, and infrastructure management</p>
        </div>

        {/* Filters */}
        <div className={`flex flex-wrap justify-center gap-3 mb-14 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                background: active === cat 
                  ? (isDark ? 'linear-gradient(135deg, #06b6d4, #8b5cf6)' : 'linear-gradient(135deg, #0891b2, #7c3aed)')
                  : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'),
                color: active === cat ? '#ffffff' : textSecondary,
                border: active === cat ? 'none' : (isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)'),
                boxShadow: active === cat ? (isDark ? '0 0 20px rgba(6,182,212,0.3)' : '0 0 20px rgba(8,145,178,0.2)') : 'none',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <div key={project.id}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-3 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                background: cardBg,
                border: `1px solid ${borderColor}`,
                backdropFilter: 'blur(10px)',
                transitionDelay: `${i * 80}ms`,
              }}>

              {/* Project Image - Shows on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0"
                  style={{
                    background: isDark
                      ? `linear-gradient(135deg, rgba(10,15,28,0.9), rgba(10,15,28,0.7))`
                      : `linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))`
                  }}
                />
                {/* Blur effect on image */}
                <div className="absolute inset-0 backdrop-blur-md opacity-40" />
              </div>

              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] z-10"
                style={{
                  background: isDark
                    ? `linear-gradient(135deg, ${project.accent}, rgba(139, 92, 246, 0.3), transparent)`
                    : `linear-gradient(135deg, ${project.accent}, rgba(124, 58, 237, 0.3), transparent)`,
                }}>
              </div>

              {/* Accent line top */}
              <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                style={{ 
                  background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
                  boxShadow: `0 0 20px ${project.accent}80`
                }} />

              {/* Gradient bg on hover - enhanced */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5`} />
              
              {/* Corner glow effect */}
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-5"
                style={{ background: `radial-gradient(circle, ${project.accent}, transparent)`, filter: 'blur(40px)' }} />

              <div className="relative p-8 z-20">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold transition-colors duration-300" style={{ color: isDark ? 'white' : '#0a0a0a' }}>{project.title}</h3>
                    <p className="text-xs mt-1 uppercase tracking-wider" style={{ color: textMuted }}>{project.category}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold flex-shrink-0"
                    style={{ background: `${project.accent}20`, color: project.accent, border: `1px solid ${project.accent}40` }}>
                    {project.status}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-6" style={{ color: textSecondary }}>{project.description}</p>

                {/* Tags - Enhanced with animations */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span key={tag} className="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300"
                      style={{ 
                        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                        color: textSecondary,
                        transitionDelay: `${idx * 50}ms`
                      }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link - Enhanced */}
                <a href={project.link}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 group/link relative overflow-hidden"
                  style={{ 
                    background: `${project.accent}20`, 
                    color: project.accent, 
                    border: `1px solid ${project.accent}30`,
                    boxShadow: `inset 0 0 20px ${project.accent}10`
                  }}>
                  <span className="relative z-10">View Project</span>
                  <ExternalLink size={14} className="relative z-10 group-hover/link:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 opacity-0 group-hover/link:opacity-100 transition-opacity"
                    style={{ background: `${project.accent}10` }} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
