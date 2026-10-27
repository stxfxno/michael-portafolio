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
        sans: ['Archivo', 'sans-serif'],
        display: ['Anton', 'Impact', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        hand: ['"Permanent Marker"', 'cursive'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        ink: '#0a0a0a',
        coal: '#141414',
        paper: '#f4f1ec',
        violet: {
          DEFAULT: '#9b4dff',
          soft: '#c9a3ff',
          deep: '#5b1fbf',
        },
        cobalt: '#3d5afe',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee 30s linear infinite reverse',
        'sway': 'sway 9s ease-in-out infinite alternate',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        sway: {
          '0%': { transform: 'translateX(0) skewX(0deg)' },
          '100%': { transform: 'translateX(-30px) skewX(-4deg)' },
        },
      },
    },
  },
  plugins: [],
}
