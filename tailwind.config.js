/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#FF941A',
        secondary: '#585666',
        heading: '#585666',
        body: '#706E7A',
        inputs: '#B1B0B8',
        boxes: '#FAFAFC',
        stroke: '#E3E3E5',
      },
      // margin: {
      //   18: 16,
      // },
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
