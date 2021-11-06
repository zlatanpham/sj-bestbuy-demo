module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  // These paths are just examples, customize them to match your project structure
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0046be',
        blue: {
          400: '#4976e6',
          700: '#0046be',
        },
        yellow: {
          300: '#fff200',
          500: '#ffe000',
        },
        red: {
          600: '#BB0628',
        },
        gray: {
          300: '#c5cbd5',
          900: '#040c13',
        },
        green: {
          500: '#318000',
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
