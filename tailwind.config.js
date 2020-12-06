module.exports = (isProd) => ({
  prefix: '',
  purge: {
    enabled: isProd,
    content: ['./src/**/*.html', './src/**/*.ts'],
  },
  theme: {},
})
