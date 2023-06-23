import { getFbSdk, mountFbCustomerChat } from './helpers'

export default {
  install : function (app, options) {
    app.config.globalProperties.$fbCustomerChat = {
      setOptions(otherOptions) {
        options = { ...options, ...otherOptions }
      }
    }

    app.mixin({
      mounted() {
        if (!this.parent) {
          getFbSdk(options).then(() => {
            if (options.page_id) {
              mountFbCustomerChat(options)
            } else {
              console.error(
                'vue3-fb-chat: You have to specify `page_id`',
              )
            }
          })
        }
      }
    })
  }
}