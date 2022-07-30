import ThemeSelector from '~/components/themes/bulma/components/settings/ThemeSelector.vue';

Vue.component('setting-theme-selector', ThemeSelector);

export default ({ store }, inject) => {
    store.commit('layout/settings/registerItem', {component: 'setting-theme-selector', order: 200})
}
