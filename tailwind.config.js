/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/assets/css/main.css',
    './app/components/**/*.{js,vue,ts}',
    './app/composables/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/stores/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ['Comfortaa', 'system-ui', 'sans-serif'],
        roboto: ['Roboto', 'system-ui', 'sans-serif'],
      },
      colors: {
        warm: {
          50: '#FEF9F7',
          100: '#FDF4F0',
          200: '#FCEBE2',
          300: '#FDE4D5',
          400: '#FDD7BE',
          500: '#FCC5A2',
          600: '#FBA07A',
          700: '#F67A52',
          800: '#E65A3A',
          900: '#C94A2F',
        },
        teal: {
          50: '#F0FCFD',
          100: '#D9F4F6',
          200: '#B3E6E9',
          300: '#7DD4DB',
          400: '#3AC9D0',
          500: '#13B4BD',
          600: '#0D9AA3',
          700: '#0A7A82',
          800: '#085E65',
          900: '#064A4F',
        },
        link: '#010103',
        glass: {
          surface: 'rgba(255, 255, 255, 0.08)',
          surfaceStrong: 'rgba(255, 255, 255, 0.14)',
          border: 'rgba(255, 255, 255, 0.22)',
          highlight: 'rgba(255, 255, 255, 0.45)',
          shadow: 'rgba(31, 38, 135, 0.28)',
        },
      },
      backgroundImage: {
        'portfolio-gradient':
          'linear-gradient(120deg, #B3E6E9 0%, #D9F4F6 42%, #FDF4F0 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.28)',
        'glass-inset':
          'inset 1px 1px 0.12px rgba(255, 255, 255, 0.45), 1px 1px 3px rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        glass: '10px',
      },
    },
  },
  plugins: [],
}
