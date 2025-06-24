/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'overbooked-orange': '#FF6B35',
        'overbooked-yellow': '#FFCC02',
        'overbooked-red': '#FF3E3E',
        'overbooked-green': '#00D9FF', // As per doc, though #4ECDC4 was also mentioned for success
        'overbooked-success-green': '#4ECDC4',
        'overbooked-alert-red': '#FF6B6B',
      },
      fontFamily: {
        // Placeholder for a chunky, rounded font.
        // Will need to add actual font files and @font-face later
        'overbooked': ['"Comic Sans MS"', 'cursive'] 
      },
      borderRadius: {
        '4xl': '2rem', // Example of chunky border radius
      }
    },
  },
  plugins: [],
}
