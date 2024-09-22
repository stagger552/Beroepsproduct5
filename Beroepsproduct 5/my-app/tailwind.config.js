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
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'lightblue': '#c6e2e3',
      'green': '#22CCB2',
      'zwart': '#171a1f',
      'red': '#ff1919',
      'beige': '#f4f4f4',

    },
    extend: {},
  },
  plugins: [],
}

