
# vue3-fb-chat

Based on https://github.com/dmnCodes/vue-fb-customer-chat

Rewritten for Vue 3

## To use in Nuxt 3
Create a new file in your plugins directory:

```
import Vue3FBChat from 'vue3-fb-chat/dist/main'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3FBChat, {
    page_id: 'your-page-id'
  })
})
```
