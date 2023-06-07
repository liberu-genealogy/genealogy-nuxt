import {createApp} from 'vue';
import Notification from '~/components/notifications/bulma/components/navbar/Notifications.vue';
import ToastPosition from '~/components/notifications/bulma/components/settings/ToastrPosition.vue';

createApp.component('navbar-notification', Notification);
createApp.component('setting-toaster-position', ToastPosition);

export default ({ store }, inject) => {
    store.commit('layout/settings/registerItem', { component: 'setting-toaster-position', order: 300 })
    store.commit('layout/navbar/registerItem', { component: 'navbar-notification', order: 300, permission: 'core.notifications.count' });
}