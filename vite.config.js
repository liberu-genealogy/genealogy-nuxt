export default {
  buildModules: ['@nuxtjs/vite'],
  vite: {
    optimizeDeps: {
      exclude: ['d3-dsv']
    },
    build: {
      rollupOptions: {
        external: ['vuex',
                   "vee-validate",
                   'vue-loading-overlay/dist/css/index.css',
                   'vue-video-player',
                   'vue-cal/dist/drag-and-drop.js'],
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
