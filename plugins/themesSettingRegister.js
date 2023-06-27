import { createApp } from 'vue';
import ThemeSelector from '~/components/themes/bulma/ThemeSelector.vue';

createApp().component('setting-theme-selector', ThemeSelector);

export default ({ store }, inject) => {
  // store is give you undefined if value is null
  if (store) {
    store.commit('layout/settings/registerItem', { component: 'setting-theme-selector', order: 200 });
  }
};