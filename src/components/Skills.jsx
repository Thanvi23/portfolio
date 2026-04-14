import { useEffect, useRef, useState } from 'react'
import { Cpu } from 'lucide-react'
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

const skills = [
  { category: 'Containerization', proficiency: 85, technologies: ['Docker', 'Kubernetes', 'Container Registry'], color: '#06b6d4', icon: '📦' },
  { category: 'CI/CD & Automation', proficiency: 80, technologies: ['Jenkins', 'GitHub Actions', 'Cloud Build'], color: '#3b82f6', icon: '🚀' },
  { category: 'Cloud Platforms', proficiency: 78, technologies: ['GCP', 'AWS', 'Azure', 'Firebase'], color: '#8b5cf6', icon: '☁️' },
  { category: 'IaC & Config Mgmt', proficiency: 75, technologies: ['Terraform', 'Ansible', 'CloudFormation'], color: '#10b981', icon: '⚙️' },
  { category: 'Monitoring & Logging', proficiency: 72, technologies: ['Prometheus', 'Grafana', 'Cloud Logging'], color: '#f59e0b', icon: '📊' },
  { category: 'Languages & Tools', proficiency: 82, technologies: ['Bash', 'Python', 'Git', 'Linux'], color: '#ec4899', icon: '💻' },
]

function SkillBar({ skill, animate, isDark }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setWidth(skill.proficiency), 200)
      return () => clearTimeout(t)
    }
  }, [animate, skill.proficiency])

  return (
    <div className="group rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{ 
        background: isDark ? 'rgba(10,15,28,0.8)' : 'rgba(255,255,255,0.8)', 
        border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.1)', 
        backdropFilter: 'blur(10px)',
        boxShadow: isDark ? '0 0 20px rgba(0,0,0,0.3)' : '0 0 20px rgba(0,0,0,0.1)'
      }}>
      {/* Dynamic hover glow - enhanced */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ 
          background: `radial-gradient(circle at 50% 0%, ${skill.color}20, transparent 70%)`,
          borderRadius: 'inherit'
        }} />
      
      {/* Top gradient line - enhanced */}
      <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{ 
          background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
          boxShadow: `0 0 20px ${skill.color}80`
        }} />
      
      {/* Corner glow effect */}
      <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{ 
          background: `radial-gradient(circle, ${skill.color}, transparent)`,
          filter: 'blur(30px)'
        }} />

      <div className="relative z-10">
        {/* Header - Enhanced */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{skill.icon}</span>
            <h3 className="text-base font-bold transition-colors" style={{ color: isDark ? '#f1f5f9' : '#0a0a0a' }}>{skill.category}</h3>
          </div>
          <span className="text-xl font-black" style={{ 
            color: skill.color,
            textShadow: `0 0 20px ${skill.color}40`
          }}>{skill.proficiency}%</span>
        </div>

        {/* Bar - Enhanced with glow */}
        <div className="w-full h-2 rounded-full mb-4 overflow-hidden relative" style={{ 
          background: isDark
            ? `linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.08), rgba(255,255,255,0.04))`
            : `linear-gradient(90deg, rgba(0,0,0,0.04), rgba(0,0,0,0.08), rgba(0,0,0,0.04))`,
          boxShadow: isDark ? `inset 0 0 10px rgba(0,0,0,0.3)` : `inset 0 0 10px rgba(0,0,0,0.1)`
        }}>
          <div className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
            style={{ 
              width: `${width}%`, 
              background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
              boxShadow: `0 0 20px ${skill.color}60, inset 0 0 10px ${skill.color}30`
            }}>
            <div className="absolute inset-0 animate-pulse opacity-50"
              style={{ 
                background: `linear-gradient(90deg, transparent, white, transparent)`, 
                backgroundSize: '200% 100%', 
                animation: 'shimmer 2s infinite' 
              }} />
          </div>
        </div>

        {/* Tags - Enhanced with stagger animation */}
        <div className="flex flex-wrap gap-1.5">
          {skill.technologies.map((tech, idx) => (
            <span key={tech} 
              className="px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg"
              style={{ 
                background: `${skill.color}12`, 
                color: skill.color, 
                border: `1px solid ${skill.color}25`,
                transitionDelay: `${idx * 30}ms`,
                boxShadow: `0 0 10px ${skill.color}20`
              }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { ref, inView } = useInView(0.05)

  return (
    <section id="skills" className="py-28 md:py-36 px-6 md:px-12 relative overflow-hidden"
      style={{ 
        background: isDark
          ? 'linear-gradient(180deg, transparent, rgba(6,182,212,0.02), transparent)'
          : 'linear-gradient(180deg, transparent, rgba(8,145,178,0.01), transparent)'
      }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ 
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(6,182,212,0.2), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(8,145,178,0.15), transparent)'
        }} />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
            style={{ 
              border: isDark ? '1px solid rgba(6,182,212,0.3)' : '1px solid rgba(8,145,178,0.25)',
              background: isDark ? 'rgba(6,182,212,0.05)' : 'rgba(8,145,178,0.05)'
            }}>
            <Cpu className="w-4 h-4" style={{ color: isDark ? '#06b6d4' : '#0891b2' }} />
            <span className="text-sm font-medium tracking-wide" style={{ color: isDark ? '#06b6d4' : '#0891b2' }}>Technical Skills</span>
          </div>
          <h2 className="font-black mb-4" style={{ 
            fontSize: 'clamp(3rem, 7vw, 5rem)', 
            background: isDark
              ? 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)'
              : 'linear-gradient(135deg, #0891b2, #2563eb, #7c3aed)',
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            backgroundClip: 'text' 
          }}>
            Expertise
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: isDark ? '#94a3b8' : '#3a3a3a' }}>DevOps expertise spanning containerization, CI/CD automation, cloud infrastructure, and infrastructure as code</p>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {skills.map((skill, i) => (
            <div key={i} style={{ transitionDelay: `${i * 60}ms` }}>
              <SkillBar skill={skill} animate={inView} isDark={isDark} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
