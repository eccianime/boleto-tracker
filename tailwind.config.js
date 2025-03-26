/** @type {import('tailwindcss').Config} */
const colors = require('./src/config/colors');

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
      fontFamily: {
        'lexend-regular': ['Lexend_400Regular', 'sans-serif'],
        'lexend-semibold': ['Lexend_600SemiBold', 'sans-serif'],
        'inter-regular': ['Inter_400Regular', 'sans-serif'],
        'inter-semibold': ['Inter_600SemiBold', 'sans-serif'],
        'inter-bold': ['Inter_700Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
