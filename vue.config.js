module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('vue', '@vue/compat')

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      })
  },
  
    css: {
      loaderOptions: {
        postcss: {
          config: {
            path: __dirname + '/postcss.config.js'
          }
        }
      }
    }
  };
  