export const state = () => ({
    i18n: {},
    languages: [],
    rtl: [],
    keyCollector: false,
    missingKeys: [],
});

export const getters = {
    documentTitle: (state, getters, rootState) => (title) => (rootState.meta.extendedDocumentTitle
        ? `${getters.i18n(title)} | ${rootState.meta.appName}`
        : getters.i18n(title)),
    i18n: (state, getters, rootState) => (key) => {
        const { lang } = rootState.preferences.global;
        return state.i18n[lang] ? state.i18n[lang][key] : key;
    },
    isRtl: (state) => (lang) => state.rtl.includes(lang),
    ready: (state) => Object.keys(state.i18n).length > 0,
    rtl: (state, getters, rootState) => state.rtl.includes(rootState.preferences.global.lang),
};

export const mutations = {
    configure: (state, { i18n, languages, rtl }) => {
        state.i18n = i18n;
        state.languages = languages;
        state.rtl = rtl;
    },
    setI18n: (state, i18n) => (state.i18n = i18n),
    setLanguages: (state, languages) => (state.languages = languages),
    setRtl: (state, rtl) => (state.rtl = rtl),
    addKey: (state, key) => {
        Object.keys(state.i18n).forEach((lang) => {
            state.i18n[lang][key] = '';
        });
    },
    setKeyCollector: (state, status) => {
        if (status === false) {
            state.missingKeys = [];
        }

        state.keyCollector = status;
    },
    clearMissingKeys: (state) => (state.missingKeys = []),
    addMissingKey: (state, key) => {
        if (!state.missingKeys.includes(key)) {
            state.missingKeys.push(key);
        }
    },
};
