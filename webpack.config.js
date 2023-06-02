// webpack.config.js
module.exports = {
    resolve: {
      alias: {
        vue: '@vue/compat'
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              compatConfig: {
                MODE: 2
              }
            }
          }
        }
      ]
    }
  }
  