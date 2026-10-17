/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c7d9fe',
          300: '#a5c0fc',
          400: '#7aa0f8',
          500: '#5580f0',
          600: '#3d5ee6',
          700: '#2e47c4',
          800: '#283b9e',
          900: '#24327d',
          950: '#191f4a',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        surface: {
          light: '#ffffff',
          dark: '#0f172a',
          'dark-elevated': '#1e293b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.25rem + 1.25vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem)',
      },
      // Jerarquía tipográfica corporativa: `display` para el H1 del hero y
      // `title` para los títulos de sección (más compactos y legibles).
      letterSpacing: {
        display: '-0.03em',
        title: '-0.02em',
      },
      lineHeight: {
        display: '1.05',
        title: '1.15',
      },
      spacing: {
        'fluid-1': 'clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem)',
        'fluid-2': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',
        'fluid-3': 'clamp(0.75rem, 0.6rem + 0.75vw, 1rem)',
        'fluid-4': 'clamp(1rem, 0.8rem + 1vw, 1.25rem)',
        'fluid-5': 'clamp(1.25rem, 1rem + 1.25vw, 1.5rem)',
        'fluid-6': 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',
        'fluid-8': 'clamp(2rem, 1.6rem + 2vw, 2.5rem)',
        'fluid-10': 'clamp(2.5rem, 2rem + 2.5vw, 3rem)',
        'fluid-12': 'clamp(3rem, 2.4rem + 3vw, 4rem)',
        'fluid-16': 'clamp(4rem, 3.2rem + 4vw, 5rem)',
        'fluid-20': 'clamp(5rem, 4rem + 5vw, 6rem)',
        'fluid-24': 'clamp(6rem, 4.5rem + 7.5vw, 7.5rem)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgb(0 0 0 / 0.07), 0 10px 20px -2px rgb(0 0 0 / 0.04)',
        'soft-dark': '0 2px 15px -3px rgb(0 0 0 / 0.3), 0 10px 20px -2px rgb(0 0 0 / 0.2)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '250ms',
        slow: '350ms',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
