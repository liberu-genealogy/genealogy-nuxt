import Vue from 'vue';
import IO from '~/components/io/bulma/components/navbar/IO.vue';


Vue.component('navbar-io', IO);

export default ({ store }, inject) => {
    store.commit('layout/navbar/registerItem', { component: 'navbar-io', order: 200, permission: undefined });
}