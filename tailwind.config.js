/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hub: {
          void: "var(--hub-void)",
          ink: "var(--hub-ink)",
          deep: "var(--hub-deep)",
          panel: "var(--hub-panel)",
          slate: "var(--hub-slate)",
          royal: "var(--hub-royal)",
          violet: "var(--hub-violet)",
          flame: "var(--hub-flame)",
          gold: "var(--hub-gold)",
          mist: "var(--hub-mist)",
          snow: "var(--hub-snow)",
          content: "var(--hub-content)",
          border: "var(--hub-border)",
          "on-accent": "var(--hub-on-accent)",
        },
      },
      fontFamily: {
        display: ["Montserrat", "system-ui", "sans-serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "cta-shine":
          "linear-gradient(110deg, transparent 0%, rgba(255,215,0,0.25) 45%, rgba(255,255,255,0.35) 50%, rgba(255,215,0,0.2) 55%, transparent 100%)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-delayed": "float 8s ease-in-out 1.2s infinite",
        marquee: "marquee 32s linear infinite",
        "spin-slow": "spin-slow 28s linear infinite",
        orbit: "orbit 14s ease-in-out infinite",
        "pulse-glow": "pulse-glow 5s ease-in-out infinite",
        shimmer: "shimmer 3.5s ease-in-out infinite",
        "blob-morph": "blob-morph 14s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotateX(0deg)" },
          "50%": { transform: "translateY(-14px) rotateX(2deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        orbit: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(4%, -3%) scale(1.03)" },
          "66%": { transform: "translate(-3%, 2%) scale(0.98)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.45", filter: "blur(60px)" },
          "50%": { opacity: "0.85", filter: "blur(72px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        "blob-morph": {
          "0%, 100%": { borderRadius: "60% 40% 50% 55% / 55% 45% 55% 45%", transform: "rotate(0deg) scale(1)" },
          "33%": { borderRadius: "45% 55% 48% 52% / 52% 48% 52% 48%", transform: "rotate(120deg) scale(1.03)" },
          "66%": { borderRadius: "52% 48% 42% 58% / 48% 52% 48% 52%", transform: "rotate(240deg) scale(0.98)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-3%, 4%)" },
        },
      },
    },
  },
  plugins: [],
};
