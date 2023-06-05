import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createRequire } from 'module';
import Components from 'unplugin-vue-components/vite';
import {
  AntDesignVueResolver,
  ElementPlusResolver,
  VantResolver,
} from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [vue(),
    Components({
      resolvers: [
        AntDesignVueResolver(),
        ElementPlusResolver(),
        VantResolver(),
        IconsResolver()
      ],
    }),
  ],
  resolve: {
    alias: {
      vue: '@vue/compat'
    }
  },
  optimizeDeps: {
    exclude: ['d3-dsv']
  },
  esbuild: {
    loader: {
      '.csv': 'text'
    }
  },

  rollupInputOptions: {
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
});
