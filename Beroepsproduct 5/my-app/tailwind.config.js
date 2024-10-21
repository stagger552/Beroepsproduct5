/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Paths to all of your template files
  ],
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      alatsi: ['Alatsi', 'sans-serif'],
      robotoMono: ['Roboto Mono', 'monospace'], // Assuming Altasi is loaded from CDN
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        lightblue: '#c6e2e3',
        green: '#22CCB2',
        zwart: '#171a1f',
        red: '#ff1919',
        beige: '#f4f4f4',
        qk_red: '#FF6666',
        qk_red_bg: '#FFCCCC',
        qk_purple: '#636AE8',
        qk_purple_bg: '#CCCEFF',
        qk_blue: '#379AE6',
        qk_blue_bg: '#CCE8FF',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

