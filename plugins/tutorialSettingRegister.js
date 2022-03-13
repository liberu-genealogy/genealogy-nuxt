import Vue from 'vue';
import Tutorial from '~/components/tutorials/bulma/components/settings/Tutorial.vue';

Vue.component('setting-tutorials', Tutorial);

export default ({ store }, inject) => {
    store.commit('layout/settings/registerItem', { component: 'setting-tutorials', order: 350 })
}