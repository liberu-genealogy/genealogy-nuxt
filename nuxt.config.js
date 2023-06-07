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
  plugins: [
    '~/plugins/bootEnums.js',
    '~/plugins/i18n.js',
    '~/plugins/pRoute.js',
    '~/plugins/filters.js',
    '~/plugins/numberFormat.js',
    '~/plugins/shortNumber.js',
    '~/plugins/toastr.js',
    '~/plugins/fontawesome.js',
    '~/plugins/themesSettingRegister.js',
    '~/plugins/bookmarksSettingRegister.js',
    '~/plugins/tutorialSettingRegister.js',
    '~/plugins/notificationsRegister.js',
    '~/plugins/localisationRegister.js',
    '~/plugins/ioRegister.js',
    '~/plugins/tasksNavbarRegister.js',
    '~/plugins/usersRegister.js',
    '~/plugins/Validator.js',
    '~/plugins/date-fns/format.js',
    '~/plugins/date-fns/formatDistance.js',
    '~/plugins/vue-select.js',
    '~/plugins/vuelidate.js',
    //'~/plugins/echo.js',
    "~/plugins/vue-fb-customer-chat.js",
    {src: '~/plugins/vue-stripe.js', ssr: false},
  ],

  // build
  build: {
    transpile: ['@headlessui/vue'],
  },

  // modules
 
  
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
  buildModules: ['@nuxtjs/vite'],
  vite: {
    optimizeDeps: {
      exclude: ['d3-dsv']
    },
    build: {
      rollupOptions: {
        external: ['vuex', 'vee-validate'],
        plugins: [
          {
            name: 'replace-d3-dsv',
            resolveId(source) {
              if (source === 'd3-dsv') {
                return require.resolve('d3-dsv');
              }
            }
          },
          {
            name: 'resolve-vee-validate-locale',
            resolveId(source) {
              if (source === 'vee-validate') {
                return require.resolve('node_modules/vee-validate');
              }
            }
          }
        ]
      }
    }
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