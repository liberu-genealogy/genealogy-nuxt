import { defineNuxtPlugin } from '#app'
import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const getGDPR = localStorage.getItem('GDPR:accepted');
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: 'UA-208194369-1'
    },
    appName: 'Family Tree 365',
    enabled: getGDPR === 'true',
    pageTrackerScreenviewEnabled: true
  }, nuxtApp.vueApp.router);
});
