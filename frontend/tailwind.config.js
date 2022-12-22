/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
theme: {
    extend: {
      colors: {
        blue: {
          10: '#0C0032',
          9: '#190061',
          8: '#240090',
          7: '3500d3',
          28: '282828'
        },
      },
      screens: {
        'mid': '800px',
      },
    },
  },
  plugins: [],
}