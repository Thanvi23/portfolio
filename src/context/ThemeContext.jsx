import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

function applyTheme(themeName) {
  const root = document.documentElement;
  root.setAttribute('data-theme', themeName);
  document.body.style.colorScheme = themeName;
  localStorage.setItem('theme', themeName);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) {
        applyTheme(saved);
        return saved;
      }
      
      // Check system preference
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = isDark ? 'dark' : 'light';
      applyTheme(initialTheme);
      return initialTheme;
    }
    return 'dark';
  });

  // Apply theme on mount and whenever it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const saved = localStorage.getItem('theme');
      if (!saved) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
