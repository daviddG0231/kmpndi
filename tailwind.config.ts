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
        bg: '#FAFAF8',
        surface: { DEFAULT: '#FFFFFF', secondary: '#F5F4F1' },
        txt: { DEFAULT: '#1C1C1E', secondary: '#86868B', tertiary: '#AEAEB2' },
        sep: { DEFAULT: '#E5E5EA', opaque: '#C6C6C8' },
        fill: '#F2F2F7',
        accent: { DEFAULT: '#1B4D3E', light: '#EBF3EF' },
        gold: { DEFAULT: '#B8860B', light: '#FBF5E6' },
        sys: { red: '#FF3B30', green: '#34C759', orange: '#FF9500', blue: '#007AFF' },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
