/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neo-pink': '#FF6B9D',
        'neo-blue': '#4D96FF',
        'neo-yellow': '#FFD93D',
        'neo-purple': '#A78BFA',
        'neo-green': '#6BCB77',
        'neo-orange': '#FF8551',
        'neo-cyan': '#00D9FF',
      },
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
        'mono': ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px #000',
        'brutal-lg': '12px 12px 0px 0px #000',
        'brutal-xl': '16px 16px 0px 0px #000',
      },
    },
  },
  plugins: [],
}
