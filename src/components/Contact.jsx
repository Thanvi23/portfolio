import { Mail, MapPin, Phone, Send, MessageSquare } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

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

export default function Contact() {
  const { ref, inView } = useInView(0.05)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const contactItems = [
    { icon: Mail, label: 'Email', value: 'kotathanvi3@gmail.com', href: 'mailto:kotathanvi3@gmail.com', color: '#06b6d4' },
    { icon: MapPin, label: 'Location', value: 'Hyderabad, India', href: null, color: '#3b82f6' },
    { icon: Phone, label: 'Phone', value: '+91 7207 363 888', href: 'tel:+917207363888', color: '#8b5cf6' },
  ]

  const inputClass = "w-full px-4 py-3.5 rounded-xl text-slate-100 placeholder-slate-600 text-sm outline-none transition-all duration-300 focus:ring-1"
  const inputStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }

  return (
    <section id="contact" className="py-28 md:py-36 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.2), transparent)' }} />
        <div className="absolute bottom-1/3 -right-40 w-96 h-96 rounded-full blur-[120px] opacity-10" style={{ background: '#06b6d4' }} />
        <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full blur-[100px] opacity-10" style={{ background: '#8b5cf6' }} />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
            style={{ border: '1px solid rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.05)' }}>
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400 tracking-wide">Get In Touch</span>
          </div>
          <h2 className="font-black mb-4" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Let's Connect
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">Have a project in mind or want to chat? I'm always interested in hearing about new opportunities.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left */}
          <div className={`lg:col-span-2 space-y-4 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {contactItems.map(({ icon: Icon, label, value, href, color }) => (
              <div key={label} className="group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{ 
                  background: 'rgba(10,15,28,0.8)', 
                  border: '1px solid rgba(255,255,255,0.07)', 
                  backdropFilter: 'blur(10px)'
                }}>
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at 0% 50%, ${color}10, transparent 60%)` }} />
                
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ 
                      background: `${color}15`, 
                      border: `1px solid ${color}30`,
                      boxShadow: `0 0 10px ${color}20`
                    }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-slate-200 font-semibold text-sm hover:text-cyan-400 transition-colors">{value}</a>
                    ) : (
                      <p className="text-slate-200 font-semibold text-sm">{value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Availability - Enhanced */}
            <div className="rounded-2xl p-5 relative overflow-hidden group"
              style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.3)' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, rgba(6,182,212,0.2), transparent 70%)` }} />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
                  </span>
                  <span className="text-cyan-400 text-sm font-semibold group-hover:text-cyan-300 transition-colors">Available for Work</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed group-hover:text-slate-300 transition-colors">Open to full-time roles, freelance projects, and exciting collaborations.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="rounded-2xl p-8 relative overflow-hidden group"
              style={{ 
                background: 'rgba(10,15,28,0.8)', 
                border: '1px solid rgba(255,255,255,0.07)', 
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 30px rgba(0,0,0,0.3)'
              }}>
              <div className="absolute top-0 left-0 right-0 h-px transition-all duration-500" 
                style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)' }} />
              
              {/* Corner glow on hover */}
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle, #06b6d4, transparent)', filter: 'blur(40px)' }} />

              <form onSubmit={onSubmit} className="space-y-4 relative z-10">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={onChange}
                    required className={`${inputClass} group-hover:shadow-lg`} style={inputStyle}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = 'rgba(6,182,212,0.6)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(6,182,212,0.2)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    }} />
                  <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={onChange}
                    required className={`${inputClass} group-hover:shadow-lg`} style={inputStyle}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = 'rgba(6,182,212,0.6)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(6,182,212,0.2)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    }} />
                </div>

                <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={onChange}
                  className={`${inputClass} group-hover:shadow-lg`} style={inputStyle}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = 'rgba(6,182,212,0.6)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(6,182,212,0.2)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }} />

                <textarea name="message" placeholder="Your Message" rows={6} value={form.message} onChange={onChange}
                  required className={`${inputClass} resize-none group-hover:shadow-lg`} style={inputStyle}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = 'rgba(6,182,212,0.6)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(6,182,212,0.2)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  }} />

                <button type="submit" disabled={sending || sent}
                  className="w-full py-4 rounded-xl font-bold text-slate-900 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-70 disabled:scale-100 relative overflow-hidden group/btn"
                  style={{ 
                    background: sent ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #06b6d4, #3b82f6)', 
                    boxShadow: '0 0 30px rgba(6,182,212,0.3)'
                  }}>
                  {sending ? (
                    <><span className="w-4 h-4 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />Sending...</>
                  ) : sent ? (
                    <>✓ Message Sent!</>
                  ) : (
                    <><Send size={18} className="group-hover/btn:translate-x-0.5 transition-transform" />Send Message</>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/btn:opacity-20 group-hover/btn:animate-pulse" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
