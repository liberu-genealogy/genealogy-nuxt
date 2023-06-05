import getSiteMeta from './utils/getSiteMeta'
import { cloneDeep } from 'lodash'
import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

const meta = getSiteMeta()
// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // server side rendering mode
  ssr: false,
  sitemap: [
    {
      hostname: process.env.BASE_URL || 'http://localhost:8000',
      path: '/sitemap.xml',
      gzip: true,
    },
  ],
  // typescripts
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // css
  css: [
    'animate.css/animate.compat.css',
    '~/assets/css/base.css',
    '~/assets/style/enso.scss',
    '~/assets/css/fontawesome.min.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/css/fan-chart/svg.css',
    '~/assets/css/fan-chart/fan-chart.css',
  ],
  // plugins
  plugins: ['~/plugins/navbar.ts'],

  // build
  build: {
    transpile: ['@headlessui/vue'],
  },

  // modules
  modules: [
    'unplugin-icons/nuxt',
    '@intlify/nuxt3',
    '@pinia/nuxt',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-windicss',
    'nuxt-vuex-router-sync',
    'nuxt-route-meta',
    '@nuxtjs/google-adsense',
  ],
  'google-adsense': {
    id: 'ca-pub-2152604506748832'
  },

  // experimental features
  experimental: {
    reactivityTransform: false,
  },

  // auto import components
  components: true,

  // vite plugins
  vite: {
    plugins: [
      UnpluginComponentsVite({
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
    ],
  },

  // app config
  app: {
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  // localization - i18n config
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'en',
      fallbackLocale: 'en',
      availableLocales: ['en', 'id', 'ja', 'ko'],
    },
  },

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  // windicss
  windicss: {
    analyze: {
      analysis: {
        interpretUtilities: false,
      },
      server: {
        port: 4000,
        open: false,
      },
    },
    scan: true,
  },

  // content
  content: {
    documentDriven: true,
    markdown: {
      mdc: true,
    },
    highlight: {
      theme: 'github-dark',
    },
  },
})