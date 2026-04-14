import { Briefcase, GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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

export default function Experience() {
  const { ref, inView } = useInView(0.05)

  const jobs = [
    {
      title: 'DevOps Engineer',
      company: 'Vijay Software Solutions Pvt. Ltd',
      location: 'Hyderabad',
      duration: 'Sep 2025 – Present',
      bullets: [
        'Deployed React frontend on Firebase Hosting using production builds and custom domains',
        'Containerized Node.js backend using Docker and deployed on GCP with secure connectivity',
        'Built CI/CD pipelines using Cloud Build (cloudbuild.yaml) with automated deployments',
        'Managed PostgreSQL databases using GCP Cloud SQL with secure backend connectivity',
        'Configured IAM roles and implemented Cloud Logging & Monitoring for production systems',
        'Tech Stack: Docker, GCP, Firebase, Cloud Build, PostgreSQL, Cloud SQL, IAM',
      ],
    },
    {
      title: 'Team Lead – Lead Generation',
      company: 'SprintM Technologies Pvt Ltd',
      location: 'Hyderabad',
      duration: 'Jun 2025 – Sep 2025',
      bullets: [
        'Managed lead generation campaigns via social media and email marketing',
        'Converted leads into sales and improved team performance metrics',
        'Coordinated with marketing and sales teams for better campaign execution',
        'Analyzed campaign performance data for optimization',
      ],
    },
  ]

  const edu = [
    {
      title: 'B.Tech – Computer Science (Business Systems)',
      school: 'U.V. Patel College of Engineering',
      location: 'Vijayawada, India',
      duration: '2021 – 2025',
      extra: 'CGPA: 6.09',
      note: 'Focused on DevOps, Cloud Infrastructure, and Infrastructure Automation',
      color: '#06b6d4',
    },
    {
      title: 'Intermediate (MPC)',
      school: 'Sri Gayathri Junior College',
      location: 'Vijayawada, India',
      duration: '2019 – 2021',
      extra: 'Percentage: 66.6%',
      color: '#8b5cf6',
    },
    {
      title: 'Schooling (SSC)',
      school: 'Mother Theresa English Medium High School',
      location: 'Vijayawada, India',
      duration: '2019',
      extra: 'CGPA: 8.8',
      color: '#10b981',
    },
  ]

  return (
    <section id="experience" className="py-28 md:py-36 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.2), transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-5"
          style={{ background: 'radial-gradient(circle, #06b6d4, #8b5cf6)' }} />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
            style={{ border: '1px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.05)' }}>
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400 tracking-wide">Career Journey</span>
          </div>
          <h2 className="font-black mb-4" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Experience
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work */}
          <div className={`transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)' }}>
                <Briefcase size={18} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Professional</h3>
            </div>

            {jobs.map((job, i) => (
              <div key={i} className="relative rounded-2xl p-7 overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl mb-5"
                style={{ 
                  background: 'rgba(10,15,28,0.8)', 
                  border: '1px solid rgba(255,255,255,0.07)', 
                  backdropFilter: 'blur(10px)',
                  transitionDelay: `${i * 100}ms`
                }}>
                {/* Enhanced left accent with glow */}
                <div className="absolute left-0 top-8 bottom-8 w-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                  style={{ 
                    background: 'linear-gradient(to bottom, #06b6d4, transparent)',
                    boxShadow: '0 0 20px #06b6d480'
                  }} />
                
                {/* Gradient hover effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at 0% 50%, rgba(6,182,212,0.08), transparent 60%)' }} />
                
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: 'linear-gradient(90deg, #06b6d4, transparent)' }} />

                <div className="pl-4 relative z-10">
                  <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 mb-1">{job.title}</h4>
                  <p className="text-cyan-400 font-semibold text-sm mb-3 group-hover:text-cyan-300 transition-colors">{job.company}</p>

                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-5">
                    <span className="flex items-center gap-1.5"><MapPin size={12} />{job.location}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={12} />{job.duration}</span>
                  </div>

                  <ul className="space-y-2.5">
                    {job.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-2.5 text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300"
                        style={{ transitionDelay: `${bi * 50}ms` }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform" style={{ background: '#06b6d4', boxShadow: '0 0 10px #06b6d480' }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
                <GraduationCap size={18} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Education</h3>
            </div>

            <div className="space-y-5">
              {edu.map((e, i) => (
                <div key={i} className="relative rounded-2xl p-7 overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  style={{ 
                    background: 'rgba(10,15,28,0.8)', 
                    border: '1px solid rgba(255,255,255,0.07)', 
                    backdropFilter: 'blur(10px)',
                    transitionDelay: `${i * 100}ms`
                  }}>
                  <div className="absolute left-0 top-8 bottom-8 w-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" 
                    style={{ 
                      background: `linear-gradient(to bottom, ${e.color}, transparent)`,
                      boxShadow: `0 0 20px ${e.color}80`
                    }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at 0% 50%, ${e.color}08, transparent 60%)` }} />
                  
                  {/* Top gradient line */}
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: `linear-gradient(90deg, ${e.color}, transparent)` }} />

                  <div className="pl-4 relative z-10">
                    <h4 className="text-base font-bold text-white group-hover:text-white transition-colors mb-1">{e.title}</h4>
                    <p className="font-semibold text-sm mb-3 group-hover:brightness-110 transition-all" style={{ color: e.color }}>{e.school}</p>

                    <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1.5"><MapPin size={12} />{e.location}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={12} />{e.duration}</span>
                    </div>

                    <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                      style={{ 
                        background: `${e.color}15`, 
                        color: e.color, 
                        border: `1px solid ${e.color}30`,
                        boxShadow: `0 0 10px ${e.color}20`
                      }}>
                      {e.extra}
                    </span>
                    {e.note && <p className="text-slate-500 text-xs mt-2 group-hover:text-slate-400 transition-colors">{e.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
