/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'shuryan-primary': {
          50: '#f0f9f8',
          100: '#e1f3f1',
          200: '#bde6e2',
          300: '#99d9d3',
          400: '#75ccc4',
          500: '#51bfb5',
          600: '#419891',
          700: '#31726d',
          800: '#214b49',
          900: '#102524',
          DEFAULT: '#105e58',
        },
        'shuryan-secondary': {
          50: '#f0fdfc',
          100: '#e1fbf9',
          200: '#bdf6f2',
          300: '#99f1eb',
          400: '#75ece4',
          500: '#51e7dd',
          600: '#41b9b1',
          700: '#318b85',
          800: '#215d59',
          900: '#102f2d',
          DEFAULT: '#a5f0e7',
        },
        'shuryan-accent': {
          50: '#f0fbfa',
          100: '#e1f7f5',
          200: '#bdeeeb',
          300: '#99e5e1',
          400: '#75dcd7',
          500: '#51d3cd',
          600: '#41a8a4',
          700: '#317e7b',
          800: '#215452',
          900: '#102a29',
          DEFAULT: '#1ebdb2',
        },
      },
      fontFamily: {
        'arabic': ['Tajawal', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  }
}