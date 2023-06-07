export default {
  buildModules: ['@nuxtjs/vite'],
  vite: {
    optimizeDeps: {
      exclude: ['d3-dsv']
    },
    build: {
      rollupOptions: {
        external: ['vuex',"vee-validate"],
        plugins: [
          {
            name: 'replace-d3-dsv',
            resolveId(source) {
              if (source === 'd3-dsv') {
                return require.resolve('d3-dsv');
              }
            }
          }
        ]
      }
    }
  }
};
