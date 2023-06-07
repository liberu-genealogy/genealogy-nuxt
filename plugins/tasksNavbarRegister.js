import {createApp} from 'vue';
import Tasks from '~/components/tasks/bulma/components/navbar/Tasks.vue';

createApp.component('navbar-tasks', Tasks);

export default ({ store }, inject) => {
    store.commit('layout/navbar/registerItem', { component: 'navbar-tasks', order: 150, permission: 'tasks.count' });
}