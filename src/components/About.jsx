import { Award, Code, Briefcase, Target, Lightbulb, CheckCircle2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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

export default function About() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { ref, inView } = useInView(0.1)

  const stats = [
    { icon: Briefcase, label: 'Experience', value: '11', suffix: 'Months', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
    { icon: Code, label: 'Projects', value: '3', suffix: 'DevOps Works', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
    { icon: Target, label: 'Technologies', value: '10+', suffix: 'Tech Stack', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    { icon: Award, label: 'Certs', value: '1', suffix: 'In Cloud', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  ]

  const achievements = [
    'Deployed production e-commerce platform (Solid Fashion) with Firebase and GCP',
    'Designed and implemented CI/CD pipelines using Cloud Build and GitHub Actions',
    'Managed Kubernetes orchestration and containerized deployments with Docker',
  ]

  return (
    <section id="about" className="py-28 md:py-36 px-6 md:px-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)' }} />
        <div className="absolute top-1/3 -right-40 w-80 h-80 rounded-full blur-[100px] opacity-10"
          style={{ background: '#8b5cf6' }} />
        <div className="absolute bottom-1/3 -left-40 w-80 h-80 rounded-full blur-[100px] opacity-10"
          style={{ background: '#06b6d4' }} />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
            style={{ border: '1px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.05)' }}>
            <Lightbulb className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400 tracking-wide">Get to Know Me</span>
          </div>
          <h2 className="font-black mb-4" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            About
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Turning ideas into elegant, functional software solutions</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className={`space-y-8 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="space-y-5">
              <p className="text-slate-300 text-lg leading-relaxed">
                I'm a passionate <span className="text-cyan-400 font-bold">DevOps Engineer</span> with 11 months of professional experience automating infrastructure and deployment workflows. I hold a Bachelor's degree in Computer Science (Business Systems) at U.V. Patel College of Engineering, Vijayawada (CGPA: 6.09).
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                My expertise spans infrastructure automation — from containerization with <span className="text-blue-400 font-bold">Docker</span>, orchestration with <span className="text-blue-400 font-bold">Kubernetes</span>, to building robust <span className="text-purple-400 font-bold">CI/CD pipelines</span> using Jenkins, GitHub Actions, and Cloud Build. I excel in cloud platform deployment (GCP, AWS, Azure), infrastructure as code with Terraform, and configuration management with Ansible.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                What excites me is solving infrastructure challenges at scale. I'm passionate about <span className="text-purple-400 font-bold">deployment automation</span>, <span className="text-purple-400 font-bold">reliability engineering</span>, and building <span className="text-purple-400 font-bold">scalable systems</span>. I've successfully deployed production applications including Exam Portal and ChatRobo on GCP with secure backend-to-database connectivity and comprehensive monitoring.
              </p>
            </div>

            {/* Achievements card */}
            <div className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)' }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)' }} />
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}>
                  <Award size={14} className="text-white" />
                </span>
                Key Achievements
              </h3>
              <ul className="space-y-4">
                {achievements.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <CheckCircle2 size={18} className="text-cyan-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-300 text-sm leading-relaxed">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right - Stats */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="grid sm:grid-cols-2 gap-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2"
                    style={{ background: 'rgba(10,15,28,0.8)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)' }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{ background: `radial-gradient(circle at 100% 0%, ${stat.color}08, transparent 60%)` }} />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: stat.bg }}>
                        <Icon size={24} style={{ color: stat.color }} />
                      </div>
                      <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">{stat.label}</p>
                      <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                      <p className="text-slate-400 text-xs">{stat.suffix}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
