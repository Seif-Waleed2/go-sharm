/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 50: '#f3efff', 100: '#e8ddff', 200: '#d4c0ff', 300: '#b995ff', 400: '#9764ff', 500: '#7b3ff2', 600: '#6c32df', 700: '#5724bb', 800: '#482096', 900: '#3d1d79' },
        ink: '#182236',
      },
      boxShadow: {
        brand: '0 14px 35px rgba(108, 50, 223, .22)',
        soft: '0 14px 45px rgba(24, 34, 54, .08)',
      },
      borderRadius: { '4xl': '2rem' },
    },
  },
  plugins: [],
};
