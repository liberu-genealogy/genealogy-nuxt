import {createApp} from 'vue';
import Notification from '~/components/notifications/bulma/components/navbar/Notifications.vue';
import ToastPosition from '~/components/notifications/bulma/components/settings/ToastrPosition.vue';
const app = createApp({});
app.component('navbar-notification', Notification);
app.component('setting-toaster-position', ToastPosition);

export default ({ store }, inject) => {
    if (store) {
    store.commit('layout/settings/registerItem', { component: 'setting-toaster-position', order: 300 })
    store.commit('layout/navbar/registerItem', { component: 'navbar-notification', order: 300, permission: 'core.notifications.count' });
}
}
app.mount('#app');