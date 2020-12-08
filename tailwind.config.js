module.exports = (isProd) => ({
  prefix: '',
  purge: {
    enabled: isProd,
    content: ['./src/**/*.html', './src/**/*.ts'],
  },
  darkMode: 'class',
  theme: {},
  plugins: [
    //
    require('@tailwindcss/forms'),
  ],
})
