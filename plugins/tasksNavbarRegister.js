import {createApp} from 'vue';
import Tasks from '~/components/tasks/bulma/components/navbar/Tasks.vue';
const app = createApp({});
app.component('navbar-tasks', Tasks);

export default ({ store }, inject) => {
    if (store) {
    store.commit('layout/navbar/registerItem', { component: 'navbar-tasks', order: 150, permission: 'tasks.count' });
}
}
app.mount('#app');