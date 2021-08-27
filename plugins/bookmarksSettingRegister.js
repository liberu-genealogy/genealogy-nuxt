import Vue from 'vue';
import BookmarksState from '~/components/bookmarks/bulma/components/settings/BookmarksState.vue';

Vue.component('setting-bookmarks-state', BookmarksState);

export default ({ store }, inject) => {
    store.commit('layout/settings/registerItem', {component: 'setting-bookmarks-state', order: 500})
}