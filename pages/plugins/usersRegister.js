import Vue from 'vue';
import ProfileController from '~/components/users/bulma/components/navbar/ProfileControl.vue';

Vue.component('navbar-profile-controller', ProfileController);

export default ({ store }, inject) => {
    store.commit('layout/navbar/registerItem', { component: 'navbar-profile-controller', order: 400, permission: undefined });
}