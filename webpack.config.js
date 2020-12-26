const webpackMerge = require('webpack-merge')

module.exports = (config) => {
  const merge = webpackMerge && webpackMerge.merge ? webpackMerge.merge : webpackMerge
  const isProd = config.mode === 'production'
  const tailwindConfig = require('./tailwind.config.js')(isProd)

  return merge(config, {
    module: {
      rules: [
        {
          test: /\.scss$/,
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              ident: 'postcss',
              syntax: 'postcss-scss',
              plugins: [require('postcss-import'), require('tailwindcss')(tailwindConfig), require('autoprefixer')],
            },
          },
        },
      ],
    },
  })
}
