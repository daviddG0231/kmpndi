import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FAFAF8',
          100: '#F5F3EF',
          200: '#E8E5DF',
          300: '#D1CCC4',
          400: '#B0A99E',
          500: '#8C8C8C',
        },
        forest: {
          DEFAULT: '#1B4D3E',
          light: '#2D6B55',
          dark: '#143A2F',
          50: '#E8F5EE',
          100: '#C8E6D5',
        },
        gold: {
          DEFAULT: '#D4A853',
          light: '#E8C97A',
          dark: '#B8903F',
          50: '#FDF6E7',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          light: '#3D3D3D',
          muted: '#6B6B6B',
        },
        status: {
          active: '#2D8B5F',
          warning: '#D4A030',
          danger: '#C0392B',
          info: '#2980B9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
        'card-hover': '0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
        'float': '0 8px 32px rgba(0,0,0,0.08)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.8)',
      },
    },
  },
  plugins: [],
}
export default config
