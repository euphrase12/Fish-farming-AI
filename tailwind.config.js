/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#020617',
        'neon-green': '#10b981',
        'neon-dark-green': '#059669',
        'amber-accent': '#f59e0b',
        'amber-dark': '#d97706',
      },
    },
  },
  plugins: [],
}
