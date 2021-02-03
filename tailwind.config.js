module.exports = {
  prefix: '',
  purge: {
    content: ['./apps/**/*.html', './apps/**/*.ts', './libs/**/*.html', './libs/**/*.ts'],
  },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      pointerEvents: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
