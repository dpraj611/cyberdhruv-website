/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Prosto One', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        pixel: ['Press Start 2P', 'cursive'],
      },
    },
  },
  plugins: [],
};