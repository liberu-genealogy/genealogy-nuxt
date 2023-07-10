
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
    ssr: false,


  mode: "spa",

  sitemap: [
    {
      hostname: process.env.BASE_URL || 'http://localhost:3000',
      path: '/sitemap.xml',
      gzip: true,
    },
  ],
  telemetry: false,

  components: [
    {
      path: '~/',
      extensions: ['.vue'],
    }
  ],

  // Global page headers (https://go.nuxtjs.dev/config-head)
  
  head: {
    htmlAttrs: {
      lang: 'en-GB',
    },
    title:
      'Family Tree 365 - Start your family tree today - free! Your first tree is 100% free. Sign-up to begin your genealogy journey today!',
    meta: [
  
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
   
})
