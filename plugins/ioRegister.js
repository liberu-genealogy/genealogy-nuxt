import {createApp} from 'vue';
import IO from '~/components/io/bulma/components/navbar/IO.vue';
const app = createApp({});

app.component('navbar-io', IO);

export default ({ store }, inject) => {
    if (store) {
    store.commit('layout/navbar/registerItem', { component: 'navbar-io', order: 200, permission: undefined });
}
}
app.mount('#app');