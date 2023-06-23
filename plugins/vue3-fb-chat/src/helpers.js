const defaultLocale = 'en_us'

export function fetchFbSdk(options) {
  const locale = options.locale ? options.locale : defaultLocale
  return new Promise((resolve, reject) => {
    ;(function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      const js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/' + locale + '/sdk/xfbml.customerchat.js'
      fjs.parentNode.insertBefore(js, fjs)
      js.onload = function() {
        console.log('vue3-fb-chat: loaded')
        resolve()
      }
      js.onerror = function() {
        reject()
        console.error('vue3-fb-chat: NOT loaded')
      }
    })(document, 'script', 'facebook-jssdk')
  })
}

export function initFbSdk(options) {
  return new Promise(resolve => {
    window.fbAsyncInit = function() {
      const defaults = { cookie: true, xfbml: true, version: 'v5.0' }
      options = { ...defaults, ...options }
      window.FB.init(options)
      resolve()
    }
  })
}

export function getFbSdk(options) {
  return new Promise(resolve => {
    if (window.FB) {
      resolve(window.FB)
    } else {
      fetchFbSdk(options).then(() => {
        initFbSdk(options).then(() => {
          resolve(window.FB)
        })
      })
    }
  })
}

export function mountFbCustomerChat(options) {
  const elem = document.createElement('div')
  elem.setAttribute('class', 'fb-customerchat')
  elem.setAttribute('attribution', 'setup_tool')

  // set attributes
  Object.entries(options).forEach(attr => {
    elem.setAttribute(attr[0], attr[1])
  })
  document.body.appendChild(elem)
}