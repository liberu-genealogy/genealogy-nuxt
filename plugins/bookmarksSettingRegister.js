import {createApp} from 'vue';
import BookmarksState from '~/components/bookmarks/bulma/components/settings/BookmarksState.vue';

const app = createApp({});
app.component('setting-bookmarks-state', BookmarksState);

export default ({ store }, inject) => {
    store.commit('layout/settings/registerItem', {component: 'setting-bookmarks-state', order: 500})
}
app.mount('#app');