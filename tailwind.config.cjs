/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      brand: '#BD80DA',
      background: '#0A090D',
      secondary: '#B2A7B6',
      text: '#ffffff',
      'text-alt': '#000000',
    },
  },
  plugins: [],
};
