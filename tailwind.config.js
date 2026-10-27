/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Josefin Sans"', 'sans-serif'],
        display: ['"Cinzel Decorative"', 'Cinzel', 'serif'],
        serif: ['Cinzel', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
        wide: ['Syncopate', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        void: '#05020b',
        ink: '#0c0618',
        nebula: '#160a2b',
        orchid: {
          50: '#f7f0ff',
          100: '#ecdcff',
          200: '#d9b8ff',
          300: '#c38dff',
          400: '#a960ff',
          500: '#9333ea',
          600: '#7a1fd1',
          700: '#6215a8',
          800: '#4a1080',
          900: '#2d0a50',
        },
        azure: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#3b82f6',
          600: '#2563eb',
        },
        // Se conservan para compatibilidad con clases existentes
        'light-bg': '#05020b',
        'light-surface': '#160a2b',
        'light-card': '#0c0618',
        'light-border': '#2d1a4d',
        'light-text': '#ffffff',
        'light-text-secondary': '#cbbfe0',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 6s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'aurora': 'aurora 18s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        aurora: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(8%, 6%) scale(1.15)' },
          '100%': { transform: 'translate(-6%, -4%) scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
}
