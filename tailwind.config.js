// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.vue',
    './src/components/*.vue',
    './src/components/**/*.vue',
    './src/components/**/**/*.vue',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      deepBlack: '#000000',
      secondary: '#1C1917',
      black: colors.black,
      white: colors.white,
      green: colors.green,
      gray: colors.trueGray,
      indigo: colors.indigo,
      blue: colors.blue,
      red: colors.rose,
      yellow: colors.amber,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
