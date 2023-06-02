import Vue from 'vue'
import { init as sentryInit, setContext } from '@sentry/browser'
import { Vue as SentryVue } from '@sentry/integrations'
import reportable from '@enso-ui/sentry'
import bootEnums from '~/utils/bootEnums'

const legacyBuild = (data, state, commit, _router, _i18n) => {
  const enums = bootEnums(data.enums, _i18n)
  commit('setUser', data.user)
  commit('preferences/set', data.preferences)
  commit('setImpersonating', data.impersonating)
  commit('menu/set', data.menus)
  commit('localisation/setLanguages', data.languages)
  commit('localisation/setRtl', data.rtl)
  commit('localisation/setI18n', data.i18n)
  commit('layout/setThemes', data.themes)
  commit('setEnums', enums)
  commit('websockets/configure', data.websockets)
  commit('setMeta', data.meta)
  commit('setRoutes', data.routes)
  commit('setDefaultRoute', { route: data.implicitRoute, _router })
}

export const state = () => ({
  appState: false,
  appUpdate: false,
  enums: {},
  guestState: false,
  impersonating: null,
  meta: {},
  pageTitle: null,
  requests: [],
  routes: {},
  showQuote: false,
  user: {},
})

export const getters = {
  routes: (state) => Object.keys(state.routes),
  isWebview: () => typeof ReactNativeWebView !== 'undefined',
  requests: (state) => state.requests.length,
  loggedInUser: (state) => state.user,
  requestIndex:
    (state) =>
      ({ url, method }) =>
        state.requests.findIndex(
          (request) => method === request.method && url === request.url
        ),
}

export const mutations = {
  addRequest: (state, { method, url }) => state.requests.push({ method, url }),
  appState: (state, value) => {
    state.appState = value
  },
  guestState: (state, value) => {
    state.guestState = value
  },
  newRelease: (state) => {
    state.appUpdate = true
  },
  removeRequest: (state, index) => state.requests.splice(index, 1),
  setCsrfToken: (state, { token, $axios }) => {
    state.meta.csrfToken = token
    $axios.defaults.withCredentials = true;
    $axios.defaults.headers.common['X-XSRF-TOKEN'] = token
    window.Laravel = { csrfToken: token }
  },
  setDefaultRoute: (state, { route, _router }) => {
    _router.addRoute({
      path: '/dashboard',
      redirect: { name: route },
    })
  },
  setEnums: (state, enums) => {
    state.enums = enums
  },
  setImpersonating: (state, impersonating) => {
    state.impersonating = impersonating
  },
  setMeta: (state, meta) => {
    state.meta = meta
  },
  setPageTitle: (state, title) => {
    state.pageTitle = title
  },
  setRoutes: (state, routes) => {
    state.routes = routes
  },
  setShowQuote: (state, value) => {
    state.showQuote = value
  },
  setUser: (state, user) => {
    state.user = user
    console.log(state.user)
  },
  setUserAvatar: (state, avatarId) => {
    state.user.avatar.id = avatarId
  },
}

export const actions = {
  loadAppState(context) {
    const { state, commit, dispatch } = context
    commit('appState', false)

    const _router = this.$router;
    const _i18n = this.$i18n;

    this.$axios
      .get('/api/core/home')
      .then(({ data }) => {
       
        data.forEach(({ mutation, state }) => {
          if (mutation === 'setEnums') {
            const enums = bootEnums(state, _i18n)
            commit(mutation, enums)
          } else if (mutation === 'setDefaultRoute') {
            commit(mutation, { route: state, _router })
          } else {
            commit(mutation, state)
          }
        })

        commit(
          'layout/sidebar/update',
          state.preferences.global.expandedSidebar
        )
        commit('setCsrfToken', { token: state.meta.csrfToken, $axios: this.$axios })

        if (state.meta.sentryDsn) {
          sentryInit({
            environment: state.meta.env,
            dsn: state.meta.sentryDsn,
            integrations: [new SentryVue({ Vue, logErrors: true })],
            beforeSend: (event) => reportable(event),
          })

          setContext('user', {
            id: state.user.id,
            email: state.user.email,
            role: state.user.role,
          })
        }

        dispatch('layout/setTheme').then(() => {
          window.dispatchEvent(
            new CustomEvent('local-state-fetched', {
              detail: { context, data: data.local },
            })
          )

          commit('appState', true)
        })
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          commit('auth/logout')
          _router.push({ name: 'login' })
        } else {
          throw error
        }
      })
  },
  loadGuestState({ state, commit }) {
    this.$axios
      .get('/api/meta', {
        params: { locale: localStorage.getItem('locale') },
      })
      .then(({ data }) => {
        const { meta, i18n, routes } = data
        const lang = Object.keys(i18n).shift()
        commit('localisation/setI18n', i18n)
        commit('preferences/lang', lang)
        commit('setMeta', meta)
        commit('setRoutes', routes)
        commit('guestState', true)

        // if (
        //   !['login', 'password.email', 'password.reset'].includes(
        //     state.route.name
        //   )
        // ) {
        //   this.$router.push({ name: 'login' })
        // }
      })
  },
  setPageTitle({ commit }, title) {
    commit('setPageTitle', title)
    commit('bookmarks/title', title)
  },
}
