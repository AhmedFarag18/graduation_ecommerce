/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "main-color"
          : "#4338ca",
        "light-white": "rgba(255,255,255,0.17)",
      },
    },
  },
  plugins: [],
}
