const colors = require('tailwindcss/colors')

module.exports = {
  prefix: '',
  purge: {
    enabled: process.argv.join(' ').includes('production'),
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  },
  darkMode: 'class',
  theme: {
    colors,
    extend: {
      height: {
        120: '30rem',
      },
      width: {
        xs: '20rem',
      },
      maxHeight: {
        120: '30rem',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      pointerEvents: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/custom-forms')],
}
