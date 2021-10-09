import getSiteMeta from './utils/getSiteMeta'
import { cloneDeep } from 'lodash'

const meta = getSiteMeta()

export default {
  ssr: false,

  // server: {
  //   host: process.env.HOST || 'localhost' // default: localhost
  // },

  sitemap: [
    {
      hostname: process.env.BASE_URL || 'http://localhost:3000',
      path: '/sitemap.xml',
      gzip: true,
    },
  ],




  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'en-GB',
    },
    title:
      'Family Tree 365 - Start your family tree today - free! Your first tree is 100% free. Sign-up to begin your genealogy journey today!',
    meta: [
      ...meta,
      { charset: 'utf-8' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { property: 'og:site_name', content: 'Family Tree 365' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Our user-friendly yet powerful platform lets you create your own family tree the quick and easy way. No technical knowledge is required. Start your family tree today - free!',
      },
      { property: 'og:image:width', content: '2500' },
      { property: 'og:image:height', content: '780' },
      { name: 'twitter:site', content: '@familytree365' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      {
        hid: 'canonical',
        rel: 'canonical',
        href: process.env.BASE_URL,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ["~/assets/style/enso.scss", "animate.css/animate.compat.css"],
  css: [
    'animate.css/animate.compat.css',
    '~/assets/css/base.css',
    '~/assets/style/enso.scss',
    '~/assets/css/fontawesome.min.css',
  ],

  router: {
    middleware: 'auth'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
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

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // "@nuxtjs/eslint-module",
    '@nuxtjs/fontawesome',
    '@nuxtjs/router-extras',
    '@nuxtjs/google-analytics',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-vuex-router-sync',
    'nuxt-route-meta',
  ],

  fontawesome: {
    icons: {
      solid: true,
      brands: true,
    },
  },
  nuxtContentAlgolia: {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_API_KEY,
    paths: [
      {
        name: 'articles',
        index: 'articles',
        fields: ['title', 'description', 'bodyPlainText'],
      },
    ],
  },

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID, // Use as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BASE_URL || 'http://localhost:3000',
    },
    appEnv: process.env.APP_ENV || 'production',
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID,
    },
  },

  env: {
    STRIPE_PK: process.env.STRIPE_KEY,
    baseUrl: process.env.BASE_URL ||'http://localhost:3000'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    credentials: true,
  },
  proxy: {
    '/api/': process.env.BASE_URL || 'http://localhost:8000',
    '/broadcasting/': process.env.BASE_URL || 'http://localhost:8000',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : '[chunkhash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[chunkhash].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : '[contenthash].css'),
      img: ({ isDev }) => (isDev ? '[path][name].[ext]' : 'img/[hash:7].[ext]'),
      font: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'fonts/[hash:7].[ext]',
      video: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'videos/[hash:7].[ext]',
    },

    transpile: [
      '@enso-ui/strings',
      'vee-validate/dist/rules',
      '@enso-ui/enums',
      '@sentry/browser',
      '@sentry/integrations',
      '@enso-ui/sentry',
      '@enso-ui/route-mapper',
      'd3-dag',
    ],

    extend(config) {
      const isScssRule = (rule) => rule.test.toString() === '/\\.scss$/i'

      config.module.rules.forEach((rule) => {
        if (isScssRule(rule)) {
          const normalRule = rule.oneOf.find(
            ({ resourceQuery, test }) =>
              resourceQuery === undefined && test === undefined
          )

          const lazyRule = cloneDeep(normalRule)

          lazyRule.test = /\.lazy\.scss$/
          const idx = lazyRule.use.findIndex(({ loader }) =>
            loader.includes('vue-style-loader')
          )
          if (idx > -1) {
            lazyRule.use.splice(idx, 1, {
              loader: 'style-loader',
              options: {
                injectType: 'lazyStyleTag',
                insert: function insertAtTop(element) {
                  const parent = document.querySelector('head')
                  parent.insertBefore(element, parent.firstChild)
                },
              },
            })
          }

          rule.oneOf.push(lazyRule)
        }
      })

      // const scssRules = config.module.rules.find('scss').oneOfs;
      // const normalRule = scssRules.store.get('normal');
      // const lazyRule = config.module.rules.find('scss').oneOf('scss-lazy');

      // normalRule.uses.values().forEach(use => {
      //   if (use.name !== 'vue-style-loader') {
      //     lazyRule.use(use.name).merge(use.entries());
      //     return;
      //   }

      //   lazyRule.use('style-loader')
      //     .loader('style-loader')
      //     .options({
      //       injectType: 'lazyStyleTag',
      //       insert: function insertAtTop(element) {
      //         const parent = document.querySelector('head');
      //         parent.insertBefore(element, parent.firstChild);
      //       },
      //     });
      // });

      // lazyRule.test(/\.lazy\.scss$/);

      // scssRules.store.delete('normal', 'scss-lazy');
      // scssRules.store.set('scss-lazy', lazyRule);
      // scssRules.store.set('normal', normalRule);
    },
  },
}
