import { Code, Link, Mail, ArrowUp, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 md:px-12 overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(5, 10, 20, 0.8)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <span className="text-2xl font-black mb-3 block"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              TK
            </span>
            <p className="text-slate-500 text-sm leading-relaxed">Full-Stack Developer crafting beautiful, high-performance web experiences.</p>
          </div>

          <div>
            <p className="text-slate-300 font-semibold text-sm mb-4">Quick Links</p>
            <ul className="space-y-2">
              {[['Home', '#home'], ['About', '#about'], ['Projects', '#projects'], ['Experience', '#experience']].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-200">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-slate-300 font-semibold text-sm mb-4">Connect</p>
            <div className="flex gap-3">
          {[
                { icon: Code, href: 'https://github.com/Thanvi23', label: 'GitHub' },
                { icon: Link, href: 'https://linkedin.com/in/kota-thanvi', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:kotathanvi3@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-cyan-400 transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-slate-600 text-sm flex items-center gap-1.5">
            © 2025 Thanvi Kota · Made with <Heart size={13} className="text-red-500" /> in Hyderabad
          </p>
          <a href="#home" className="text-slate-600 hover:text-cyan-400 transition-colors mt-4 sm:mt-0">
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
