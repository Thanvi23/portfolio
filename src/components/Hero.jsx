import { ArrowRight, Mail, Code, Share2, Download, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

/* ─── Particle Canvas ─── */
function ParticleCanvas({ isDark }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const darkColors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#06b6d4'];
    const lightColors = ['#0891b2', '#2563eb', '#7c3aed', '#0891b2'];
    const colorPalette = isDark ? darkColors : lightColors;
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random() * 0.5 + 0.1,
      c: colorPalette[Math.floor(Math.random() * colorPalette.length)],
    }));
    let id;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + Math.floor(p.a * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          const connectionColor = isDark ? 'rgba(6,182,212,0.07)' : 'rgba(8,145,178,0.05)';
          ctx.strokeStyle = connectionColor.replace('0.07', `${0.07 * (1 - d / 130)}`).replace('0.05', `${0.05 * (1 - d / 130)}`);
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }));
      id = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, [isDark]);
  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}

/* ─── Typewriter ─── */
function Typewriter({ texts, speed = 80, pause = 2400, isDark = true }) {
  const [display, setDisplay] = useState('');
  const [ti, setTi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const cur = texts[ti];
    if (!deleting) {
      if (ci < cur.length) {
        const t = setTimeout(() => { setDisplay(cur.slice(0, ci + 1)); setCi(c => c + 1); }, speed);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setDeleting(true), pause);
        return () => clearTimeout(t);
      }
    } else {
      if (ci > 0) {
        const t = setTimeout(() => { setDisplay(cur.slice(0, ci - 1)); setCi(c => c - 1); }, speed / 2.2);
        return () => clearTimeout(t);
      } else { setDeleting(false); setTi(t => (t + 1) % texts.length); }
    }
  }, [ci, deleting, ti, texts, speed, pause]);
  
  const textColor = isDark ? '#94a3b8' : '#3a3a3a';
  const cursorColor = isDark ? '#06b6d4' : '#0891b2';
  
  return (
    <span style={{ 
      display: 'inline-block',
      color: textColor,
      fontWeight: '500',
      letterSpacing: '0.3px',
      minHeight: '1.5rem',
      opacity: 1,
      zIndex: 10,
      position: 'relative',
      visibility: 'visible'
    }}>
      {display || '\u00A0'}
      <span style={{ 
        display: 'inline-block',
        width: '2px',
        height: '1.2em',
        marginLeft: '4px',
        verticalAlign: 'middle',
        background: cursorColor,
        animation: 'blink 0.7s infinite',
        opacity: 0.9,
        zIndex: 11,
        position: 'relative'
      }} />
    </span>
  );
}

/* ─── 3D Auto-Rotating Card Wrapper ─── */
function Card3D({ children, isDark = true }) {
  const ref = useRef(null);
  const frameRef = useRef(null);
  const timeRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseRot, setMouseRot] = useState({ x: 0, y: 0 });
  const [autoRot, setAutoRot] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  // Continuous auto-rotation animation
  useEffect(() => {
    let start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      const t = (ts - start) / 1000;
      timeRef.current = t;
      if (!isHovered) {
        // Smooth figure-8 / lemniscate path for natural feel
        const rotY = Math.sin(t * 0.4) * 18;
        const rotX = Math.sin(t * 0.7) * 8;
        setAutoRot({ x: rotX, y: rotY });
        // Move glow with rotation
        setGlowPos({
          x: 50 + (rotY / 18) * 30,
          y: 50 + (rotX / 8) * 20,
        });
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isHovered]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setMouseRot({ x: (y - 0.5) * -22, y: (x - 0.5) * 22 });
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const rot = isHovered ? mouseRot : autoRot;

  return (
    <div ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMouseRot({ x: 0, y: 0 }); }}
      style={{
        perspective: '1000px',
        perspectiveOrigin: '50% 50%',
      }}>
      <div style={{
        transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        transition: isHovered ? 'transform 0.12s ease-out' : 'none',
        transformStyle: 'preserve-3d',
        position: 'relative',
      }}>
        {/* Dynamic spotlight that follows rotation */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: isDark
              ? `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(6,182,212,0.18) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)`
              : `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(8,145,178,0.12) 0%, rgba(124,58,237,0.06) 40%, transparent 70%)`,
            zIndex: 10,
            borderRadius: '1rem',
          }} />
        {/* Depth shadow that moves with rotation */}
        <div className="absolute -inset-1 rounded-2xl pointer-events-none"
          style={{
            background: 'transparent',
            boxShadow: isDark
              ? `${-rot.y * 1.5}px ${rot.x * 1.5}px 60px rgba(6,182,212,0.15), ${rot.y * 0.8}px ${-rot.x * 0.8}px 40px rgba(139,92,246,0.1)`
              : `${-rot.y * 1.5}px ${rot.x * 1.5}px 60px rgba(8,145,178,0.1), ${rot.y * 0.8}px ${-rot.x * 0.8}px 40px rgba(124,58,237,0.07)`,
            zIndex: -1,
            borderRadius: '1rem',
          }} />
        {children}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 80); return () => clearTimeout(t); }, []);

  const roles = ['DevOps Engineer', 'Cloud Infrastructure Specialist', 'CI/CD Pipeline Expert'];

  const techStack = [
    { name: 'Docker',       color: '#61dafb' },
    { name: 'Kubernetes',     color: '#68a063' },
    { name: 'AWS', color: '#6db33f' },
    { name: 'GCP',  color: '#336791' },
    { name: 'AZURE',     color: '#47a248' },
    { name: 'Terraform',       color: '#3178c6' },
    { name: 'Python',       color: '#dc382d' },
    { name: 'Jenkins',      color: '#2496ed' },
    { name: 'GitHub Actions', color: '#2088ff' },
    { name: 'Firebase',      color: '#f3e100' },
  ];

  const delay = (n) => ({ transitionDelay: `${n}ms` });

  const accentColor = isDark ? '#06b6d4' : '#0891b2';
  const accentColorAlt = isDark ? '#8b5cf6' : '#7c3aed';
  const accentColorBlue = isDark ? '#3b82f6' : '#2563eb';
  const textPrimary = isDark ? '#e2e8f0' : '#0a0a0a';
  const textSecondary = isDark ? '#94a3b8' : '#3a3a3a';
  const textMuted = isDark ? '#64748b' : '#6b7280';

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden"
      style={{ 
        background: isDark
          ? 'linear-gradient(135deg, #020818 0%, #050d1a 50%, #080518 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #eef2f5 100%)'
      }}>

      <ParticleCanvas isDark={isDark} />

      {/* Ambient glow orbs */}
      {[
        { s: 600, c: accentColor, t: '-15%', l: '-15%', d: 0 },
        { s: 450, c: accentColorAlt, t: '55%',  l: '65%',  d: 2.5 },
        { s: 350, c: accentColorBlue, t: '30%',  l: '45%',  d: 1.2 },
      ].map((o, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none animate-pulse"
          style={{ width: o.s, height: o.s, top: o.t, left: o.l,
            background: `radial-gradient(circle, ${o.c}, transparent)`,
            filter: 'blur(80px)', opacity: isDark ? 0.12 : 0.08,
            animationDelay: `${o.d}s`, animationDuration: '5s' }} />
      ))}

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ 
          backgroundImage: isDark
            ? 'linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)'
            : 'linear-gradient(rgba(8,145,178,1) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,1) 1px, transparent 1px)',
          backgroundSize: '70px 70px', 
          opacity: isDark ? 0.02 : 0.01
        }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pt-24 pb-20">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center min-h-[85vh]">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-6">

            {/* Badge */}
            <div className={`transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={delay(0)}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{ 
                  background: isDark ? 'rgba(6,182,212,0.07)' : 'rgba(8,145,178,0.08)',
                  border: isDark ? '1px solid rgba(6,182,212,0.22)' : '1px solid rgba(8,145,178,0.25)'
                }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: accentColor }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accentColor }} />
                </span>
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: accentColor }}>Open to Opportunities</span>
              </div>
            </div>

            {/* Greeting */}
            <div className={`transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={delay(110)}>
              <div className="flex items-center gap-3">
                <span className="text-lg md:text-xl font-light tracking-[0.18em]" style={{ color: textMuted }}>Hello,</span>
                <span className="text-lg md:text-xl font-light tracking-[0.18em]" style={{ color: textSecondary }}>It's Me</span>
                
              </div>
            </div>

            {/* Name */}
            <div className={`transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={delay(210)}>
              <h1 className="font-black leading-[1.0] tracking-tight" style={{ fontSize: 'clamp(3.5rem, 8vw, 6.2rem)', color: textPrimary }}>
                <span className="block">Eswar</span>
                <span className="block relative"
                  style={{ 
                    background: isDark
                      ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 45%, #8b5cf6 100%)'
                      : 'linear-gradient(135deg, #0891b2 0%, #2563eb 45%, #7c3aed 100%)',
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent', 
                    backgroundClip: 'text' 
                  }}>
                  Santhosh
                  <span className="absolute -bottom-2 left-0 h-[3px] rounded-full"
                    style={{ 
                      width: show ? '100%' : '0%', 
                      transition: 'width 1s cubic-bezier(0.23,1,0.32,1) 700ms', 
                      background: isDark
                        ? 'linear-gradient(90deg, #06b6d4, #8b5cf6, transparent)'
                        : 'linear-gradient(90deg, #0891b2, #7c3aed, transparent)'
                    }} />
                </span>
              </h1>
            </div>

            {/* Typewriter role */}
            <div className={`transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={delay(330)}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-[2px] rounded-full flex-shrink-0"
                  style={{ background: isDark ? 'linear-gradient(90deg, #06b6d4, transparent)' : 'linear-gradient(90deg, #0891b2, transparent)' }} />
                <h2 className="text-lg md:text-xl font-bold min-h-[1.8rem]">
                  <Typewriter texts={roles} isDark={isDark} />
                </h2>
              </div>
            </div>

            {/* Description */}
            <div className={`transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={delay(440)}>
              <p className="text-base leading-[1.9] max-w-[500px]" style={{ color: textSecondary }}>
                Automating infrastructure and deploying scalable applications with{' '}
                <span style={{ color: accentColor, fontWeight: '500' }}>Docker</span>,{' '}
                <span style={{ color: accentColorBlue, fontWeight: '500' }}>Kubernetes</span> &{' '}
                <span style={{ color: accentColorAlt, fontWeight: '500' }}>CI/CD pipelines</span>.
                With hands-on DevOps expertise, I build reliable infrastructure and streamline deployment workflows that teams love.
              </p>
            </div>

            {/* Stats */}
            <div className={`flex flex-wrap gap-8 py-2 transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={delay(540)}>
              {[
                { v: '11', l: 'Months Exp.', c: accentColor },
                { v: '3',  l: 'DevOps Projects',    c: accentColorAlt },
                { v: '10+', l: 'Technologies',  c: accentColorBlue },
                { v: '2',   l: 'Cloud Platforms',  c: '#10b981' },
              ].map(s => (
                <div key={s.l} className="group cursor-default">
                  <div className="text-2xl font-black transition-all duration-300 group-hover:scale-110" style={{ color: s.c }}>{s.v}</div>
                  <div className="text-[11px] font-medium mt-0.5 group-hover:text-slate-300 transition-colors tracking-wide" style={{ color: textMuted }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className={`flex flex-wrap gap-3 transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={delay(640)}>
              <a href="#projects"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ 
                  background: isDark
                    ? 'linear-gradient(135deg, #06b6d4, #3b82f6)'
                    : 'linear-gradient(135deg, #0891b2, #2563eb)',
                  color: '#ffffff'
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = isDark ? '0 0 40px rgba(6,182,212,0.5)' : '0 0 40px rgba(8,145,178,0.4)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                View My Work <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ 
                  border: isDark ? '1px solid rgba(6,182,212,0.35)' : '1px solid rgba(8,145,178,0.35)',
                  background: isDark ? 'rgba(6,182,212,0.05)' : 'rgba(8,145,178,0.05)',
                  color: textPrimary
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.borderColor = isDark ? 'rgba(6,182,212,0.7)' : 'rgba(8,145,178,0.7)';
                  e.currentTarget.style.background = isDark ? 'rgba(6,182,212,0.12)' : 'rgba(8,145,178,0.12)';
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.borderColor = isDark ? 'rgba(6,182,212,0.35)' : 'rgba(8,145,178,0.35)';
                  e.currentTarget.style.background = isDark ? 'rgba(6,182,212,0.05)' : 'rgba(8,145,178,0.05)';
                }}>
                <Mail size={15} /> Get in Touch
              </a>
              <a href="/EswarSanthosh_Resume.txt"
                download="EswarSanthosh_Resume.txt"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm border transition-all duration-300 hover:scale-105"
                style={{ 
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                  background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  color: isDark ? '#94a3b8' : '#6b7280'
                }}>
                <Download size={15} /> Resume
              </a>
            </div>

            {/* Social links */}
            <div className={`flex items-center gap-3 transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={delay(720)}>
              {[
                { icon: Code,         href: 'https://github.com/eswarsanthosh',    label: 'GitHub' },
                { icon: Share2,       href: 'https://linkedin.com/in/eswar-santhosh', label: 'LinkedIn' },
                { icon: Mail,         href: 'mailto:eswarsanthoshb@gmail.com',       label: 'Email' },
                { icon: ExternalLink, href: '#',                                    label: 'Portfolio' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer" title={label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300 hover:-translate-y-1"
                  style={{ 
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    color: textMuted
                  }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.borderColor = isDark ? 'rgba(6,182,212,0.45)' : 'rgba(8,145,178,0.45)';
                    e.currentTarget.style.background = isDark ? 'rgba(6,182,212,0.09)' : 'rgba(8,145,178,0.08)';
                    e.currentTarget.style.color = accentColor;
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
                    e.currentTarget.style.color = textMuted;
                  }}>
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

            {/* ── RIGHT: 3D Auto-Rotating Profile Card ── */}
            <div className={`flex justify-center items-center transition-all duration-1000 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={delay(280)}>
              <Card3D isDark={isDark}>
                <div className="relative rounded-2xl overflow-visible"
                  style={{
                    background: isDark
                      ? 'linear-gradient(145deg, rgba(11,19,36,0.98) 0%, rgba(7,13,26,0.98) 100%)'
                      : 'linear-gradient(145deg, rgba(245,248,255,0.98) 0%, rgba(240,245,250,0.98) 100%)',
                    border: isDark ? '1px solid rgba(6,182,212,0.22)' : '1px solid rgba(8,145,178,0.2)',
                    boxShadow: isDark 
                      ? '0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(6,182,212,0.15)'
                      : '0 40px 100px rgba(0,0,0,0.1), inset 0 1px 0 rgba(8,145,178,0.1)',
                    borderRadius: '1rem',
                  }}>

                  {/* Rainbow stripe */}
                  <div style={{ 
                    height: 2, 
                    background: isDark
                      ? 'linear-gradient(90deg, #06b6d4, #3b82f6 40%, #8b5cf6 70%, #ec4899)'
                      : 'linear-gradient(90deg, #0891b2, #2563eb 40%, #7c3aed 70%, #db2777)',
                    borderRadius: '1rem 1rem 0 0' 
                  }} />

                  {/* Floating 3D orbs — translateZ lifts them above card surface */}
                  <div className="absolute -top-6 -right-6 w-14 h-14 rounded-full pointer-events-none animate-pulse"
                    style={{ 
                      background: isDark
                        ? 'radial-gradient(circle, #06b6d4, transparent)'
                        : 'radial-gradient(circle, #0891b2, transparent)',
                      filter: 'blur(12px)', 
                      opacity: 0.6, 
                      animationDuration: '3s', 
                      transform: 'translateZ(30px)' 
                    }} />
                  <div className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full pointer-events-none animate-pulse"
                    style={{ 
                      background: isDark
                        ? 'radial-gradient(circle, #8b5cf6, transparent)'
                        : 'radial-gradient(circle, #7c3aed, transparent)',
                      filter: 'blur(10px)', 
                      opacity: 0.5, 
                      animationDuration: '4s', 
                      animationDelay: '1s', 
                      transform: 'translateZ(20px)' 
                    }} />
                  <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full pointer-events-none animate-pulse"
                    style={{ 
                      background: isDark
                        ? 'radial-gradient(circle, #3b82f6, transparent)'
                        : 'radial-gradient(circle, #2563eb, transparent)',
                      filter: 'blur(8px)', 
                      opacity: 0.4, 
                      animationDuration: '5s', 
                      animationDelay: '0.5s', 
                      transform: 'translateZ(15px)' 
                    }} />

                  <div className="p-8 space-y-5">

                    {/* Avatar with spinning rings */}
                    <div className="flex justify-center">
                      <div className="relative" style={{ animation: 'floatCard 4s ease-in-out infinite' }}>
                        {/* Outer blurred glow ring */}
                        <div className="absolute -inset-4 rounded-full"
                          style={{ 
                            background: isDark
                              ? 'conic-gradient(#06b6d4, #3b82f6, #8b5cf6, transparent 55%, #06b6d4)'
                              : 'conic-gradient(#0891b2, #2563eb, #7c3aed, transparent 55%, #0891b2)',
                            filter: 'blur(12px)', 
                            opacity: 0.4, 
                            animation: 'spinRing 6s linear infinite' 
                          }} />
                        {/* Sharp spinning border */}
                        <div className="absolute -inset-1.5 rounded-full"
                          style={{ 
                            background: isDark
                              ? 'conic-gradient(#06b6d4 0deg, #3b82f6 120deg, #8b5cf6 240deg, rgba(0,0,0,0) 300deg, #06b6d4 360deg)'
                              : 'conic-gradient(#0891b2 0deg, #2563eb 120deg, #7c3aed 240deg, rgba(255,255,255,0) 300deg, #0891b2 360deg)',
                            animation: 'spinRing 3s linear infinite' 
                          }} />
                        {/* Reverse inner ring */}
                        <div className="absolute -inset-0.5 rounded-full"
                          style={{ 
                            background: isDark
                              ? 'conic-gradient(transparent 0deg, rgba(139,92,246,0.6) 180deg, transparent 360deg)'
                              : 'conic-gradient(transparent 0deg, rgba(124,58,237,0.5) 180deg, transparent 360deg)',
                            animation: 'spinRing 4s linear infinite reverse' 
                          }} />
                        {/* Avatar core */}
                        <div className="relative w-24 h-24 rounded-full flex items-center justify-center"
                          style={{ 
                            background: isDark
                              ? 'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(139,92,246,0.2))'
                              : 'linear-gradient(135deg, rgba(8,145,178,0.15), rgba(124,58,237,0.12))',
                            border: isDark ? '3px solid rgba(11,19,36,0.95)' : '3px solid rgba(255,255,255,0.9)'
                          }}>
                          {/* Inner glow pulse */}
                          <div className="absolute inset-0 rounded-full animate-pulse"
                            style={{ 
                              background: isDark
                                ? 'radial-gradient(circle, rgba(6,182,212,0.15), transparent)'
                                : 'radial-gradient(circle, rgba(8,145,178,0.12), transparent)',
                              animationDuration: '2s' 
                            }} />
                          <span className="relative text-4xl font-black select-none"
                            style={{ 
                              background: isDark
                                ? 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)'
                                : 'linear-gradient(135deg, #0891b2, #2563eb, #7c3aed)',
                              WebkitBackgroundClip: 'text', 
                              WebkitTextFillColor: 'transparent', 
                              backgroundClip: 'text' 
                            }}>
                            TK
                          </span>
                        </div>
                        {/* Online status dot */}
                        <div className="absolute bottom-0.5 right-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                          style={{ 
                            background: '#10b981', 
                            borderColor: isDark ? 'rgba(11,19,36,0.98)' : 'rgba(255,255,255,0.9)'
                          }}>
                          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {/* Name & title */}
                    <div className="text-center">
                      <h3 className="text-xl font-black tracking-tight" style={{ color: textPrimary }}>Eswar Santhosh</h3>
                      <p className="text-sm font-bold mt-0.5"
                        style={{ 
                          background: isDark
                            ? 'linear-gradient(90deg, #06b6d4, #8b5cf6)'
                            : 'linear-gradient(90deg, #0891b2, #7c3aed)',
                          WebkitBackgroundClip: 'text', 
                          WebkitTextFillColor: 'transparent', 
                          backgroundClip: 'text' 
                        }}>
                        Devops Engineer
                      </p>
                      <p className="text-[11px] mt-1" style={{ color: textMuted }}>Hyderabad, India · Open to Work</p>
                    </div>

                    <div className="h-px" style={{ 
                      background: isDark
                        ? 'linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(8,145,178,0.2), transparent)'
                    }} />

                    {/* Tech grid */}
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] mb-2.5" style={{ color: textMuted }}>Tech Stack</p>
                      <div className="grid grid-cols-4 gap-1.5">
                        {techStack.map(({ name, color }) => (
                          <div key={name}
                            className="group flex flex-col items-center gap-1 p-2 rounded-lg cursor-default transition-all duration-200 hover:-translate-y-1"
                            style={{ 
                              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                              border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}55`; e.currentTarget.style.background = `${color}14`; }}
                            onMouseLeave={e => { 
                              e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
                              e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
                            }}>
                            <div className="w-2 h-2 rounded-full transition-all duration-200 group-hover:scale-150" style={{ background: color, boxShadow: `0 0 6px ${color}80` }} />
                            <span className="text-[9px] font-medium text-center leading-tight transition-colors group-hover:text-slate-200" style={{ color: isDark ? textMuted : '#6b7280' }}>{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)' }} />

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { v: '11mon', l: 'Experience', c: '#06b6d4' },
                        { v: '3',   l: 'Projects',   c: '#8b5cf6' },
                        { v: '10+',  l: 'Skills',      c: '#10b981' },
                      ].map(s => (
                        <div key={s.l}
                          className="text-center p-2.5 rounded-xl cursor-default transition-all duration-300 hover:scale-105"
                          style={{ background: `${s.c}0e`, border: `1px solid ${s.c}30` }}>
                          <div className="text-sm font-black" style={{ color: s.c }}>{s.v}</div>
                          <div className="text-[9px] text-slate-500 mt-0.5 leading-tight">{s.l}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <a href="#contact"
                      className="block w-full text-center py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95"
                      style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6 50%, #8b5cf6)', boxShadow: '0 4px 24px rgba(6,182,212,0.3)' }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 40px rgba(6,182,212,0.55)'}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(6,182,212,0.3)'}>
                      Let's Build Together ✦
                    </a>
                  </div>
                </div>
              </Card3D>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="text-[10px] tracking-[0.22em] uppercase text-slate-700 group-hover:text-slate-400 transition-colors">Scroll</span>
            <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5 group-hover:border-cyan-500/40 transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
              <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: '#06b6d4' }} />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes floatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
          @keyframes spinRing  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes wave      { 0%,100%{transform:rotate(0deg)} 20%{transform:rotate(-15deg)} 40%{transform:rotate(14deg)} 60%{transform:rotate(-10deg)} 80%{transform:rotate(8deg)} }
        `}</style>
      </section>
    );
  }