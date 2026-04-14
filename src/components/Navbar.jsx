import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const { theme, toggleTheme } = useTheme()

  const links = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = links.map(l => document.getElementById(l.id))
      const scrollPos = window.scrollY + 100
      sections.forEach((sec, i) => {
        if (sec && sec.offsetTop <= scrollPos) setActive(links[i].id)
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed w-full top-0 z-50"
      style={{
        background: scrolled 
          ? (theme === 'dark' ? 'rgba(10, 15, 28, 0.92)' : 'rgba(255, 255, 255, 0.88)')
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled 
          ? (theme === 'dark' ? '1px solid rgba(6,182,212,0.15)' : '1px solid rgba(0, 0, 0, 0.1)')
          : 'none',
        boxShadow: scrolled 
          ? (theme === 'dark' ? '0 4px 30px rgba(0,0,0,0.3)' : '0 4px 30px rgba(0,0,0,0.08)')
          : 'none',
        transition: 'background 0.5s ease, backdrop-filter 0.5s ease, border-bottom 0.2s ease, box-shadow 0.5s ease'
      }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#home" className="relative group">
            <span className="text-2xl font-black tracking-tight"
              style={{ 
                background: theme === 'dark' 
                  ? 'linear-gradient(135deg, #06b6d4, #8b5cf6)'
                  : 'linear-gradient(135deg, #0891b2, #7c3aed)',
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                backgroundClip: 'text' 
              }}>
              ES
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
              style={{ 
                background: theme === 'dark'
                  ? 'linear-gradient(90deg, #06b6d4, #8b5cf6)'
                  : 'linear-gradient(90deg, #0891b2, #7c3aed)'
              }} />
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a key={link.name} href={link.href}
                className="relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg"
                style={{ 
                  color: active === link.id 
                    ? (theme === 'dark' ? '#06b6d4' : '#0891b2')
                    : (theme === 'dark' ? '#94a3b8' : '#6b7280')
                }}
                onMouseEnter={e => { 
                  if (active !== link.id) {
                    e.currentTarget.style.color = theme === 'dark' ? '#e2e8f0' : '#1a202c';
                  }
                }}
                onMouseLeave={e => { 
                  if (active !== link.id) {
                    e.currentTarget.style.color = theme === 'dark' ? '#94a3b8' : '#6b7280';
                  }
                }}>
                {active === link.id && (
                  <span className="absolute inset-0 rounded-lg opacity-10"
                    style={{ 
                      background: theme === 'dark'
                        ? 'linear-gradient(135deg, #06b6d4, #8b5cf6)'
                        : 'linear-gradient(135deg, #0891b2, #7c3aed)'
                    }} />
                )}
                {link.name}
                {active === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ 
                      background: theme === 'dark' ? '#06b6d4' : '#0891b2'
                    }} />
                )}
              </a>
            ))}
            <a href="#contact"
              className="ml-4 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{ 
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, #06b6d4, #3b82f6)'
                  : 'linear-gradient(135deg, #0891b2, #2563eb)',
                color: '#ffffff'
              }}>
              Hire Me
            </a>

            {/* Theme toggle */}
            <button onClick={toggleTheme}
              className="ml-3 p-2 rounded-lg border transition-all duration-300"
              style={{
                borderColor: theme === 'dark' ? 'rgba(6,182,212,0.3)' : 'rgba(0,0,0,0.2)',
                background: theme === 'dark' ? 'rgba(6,182,212,0.05)' : 'rgba(139,92,246,0.05)',
                color: theme === 'dark' ? '#06b6d4' : '#8b5cf6'
              }}
              title="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile button */}
          <button onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg border transition-all"
            style={{
              borderColor: theme === 'dark' ? '#475569' : '#e5e7eb',
              color: theme === 'dark' ? '#94a3b8' : '#6b7280'
            }}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ 
          background: theme === 'dark' ? 'rgba(10, 15, 28, 0.97)' : 'rgba(255, 255, 255, 0.93)',
          borderTop: theme === 'dark' ? '1px solid rgba(6,182,212,0.1)' : '1px solid rgba(0, 0, 0, 0.08)'
        }}>
        <div className="px-6 py-4 space-y-1">
          {links.map((link) => (
            <a key={link.name} href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
              style={{ 
                color: active === link.id 
                  ? (theme === 'dark' ? '#06b6d4' : '#0891b2')
                  : (theme === 'dark' ? '#94a3b8' : '#6b7280'),
                background: active === link.id 
                  ? (theme === 'dark' ? 'rgba(6,182,212,0.08)' : 'rgba(8,145,178,0.08)')
                  : 'transparent'
              }}>
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
