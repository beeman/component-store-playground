module.exports = (isProd) => ({
  prefix: '',
  purge: {
    enabled: isProd,
    content: ['./apps/**/*.html', './apps/**/*.ts', './libs/**/*.html', './libs/**/*.ts'],
  },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: { cursor: ['disabled'], opacity: ['disabled'] },
  },
  plugins: [require('@tailwindcss/forms')],
})
