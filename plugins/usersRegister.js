import {createApp} from 'vue';
import ProfileController from '~/components/users/bulma/components/navbar/ProfileControl.vue';
const app = createApp({});
app.component('navbar-profile-controller', ProfileController);

export default ({ store }, inject) => {
    store.commit('layout/navbar/registerItem', { component: 'navbar-profile-controller', order: 400, permission: undefined });
}
app.mount('#app');