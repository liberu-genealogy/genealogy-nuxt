import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    buildModules: [
        // '@nuxtjs/style-resources',
        // '@nuxtjs/fontawesome',
        // '@nuxtjs/vuetify',
    //     // ['@nuxtjs/vuetify', { /* module options */ }],
    ],
    fontawesome: {
        component: 'fa',
        icons: {
            solid: ['faEnvelope', 'faLock', 'faSignInAlt'],
            brands: ['faGoogle', 'faLinkedin']
        }
    },
    // vite: {
    //     resolve: {
    //         alias: {
    //         }
    //     }
    // }
})

