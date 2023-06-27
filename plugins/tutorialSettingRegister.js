import {createApp} from 'vue';
import Tutorial from '~/components/tutorials/bulma/components/settings/Tutorial.vue';
const app = createApp({});
app.component('setting-tutorials', Tutorial);

export default ({ store }, inject) => {
    if (store) {
    store.commit('layout/settings/registerItem', { component: 'setting-tutorials', order: 350 })
}
}
app.mount('#app');