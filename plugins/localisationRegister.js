import {createApp} from 'vue';
import MissingKey from '~/components/localisation/bulma/components/navbar/MissingKeys.vue';
import KeyCollector from '~/components/localisation/bulma/components/settings/KeyCollector.vue';
import LanguageSelector from '~/components/localisation/bulma/components/settings/LanguageSelector.vue';
const app = createApp({});
app.component('navbar-missing-key', MissingKey);
app.component('setting-key-collector', KeyCollector);
app.component('setting-language-selector', LanguageSelector);

export default ({ store }, inject) => {
    if (store) {
    store.commit('layout/settings/registerItem', { component: 'setting-language-selector', order: 100 })
    store.commit('layout/settings/registerItem', { component: 'setting-key-collector', order: 600 })
    store.commit('layout/navbar/registerItem', { component: 'navbar-missing-key', order: 100, permission: undefined });
}
}
app.mount('#app');