/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f2ff',
          100: '#ece8ff',
          200: '#d9d1ff',
          300: '#b9abff',
          400: '#977dff',
          500: '#7c53ff',
          600: '#6b3ff5',
          700: '#5b30d6',
          800: '#4c29ac',
          900: '#3f2589',
          950: '#241556',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(20, 15, 60, 0.08)',
      },
    },
  },
  plugins: [],
}

