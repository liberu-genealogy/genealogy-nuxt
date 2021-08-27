<template>
    <vue-pull-refresh
        :config="config"
        :on-refresh="refresh">
        <navbar class="animated slideInDown"/>
    </vue-pull-refresh>
</template>

<script>

import VuePullRefresh from 'vue-pull-refresh';
import Navbar from './Navbar.vue';

export default {
    name: 'NavbarRefresh',

    components: {
        VuePullRefresh, Navbar,
    },

    inject: ['i18n'],

    data: v => ({
        config: {
            startLabel: v.i18n('Pull down to refresh'),
            readyLabel: v.i18n('Release to refresh'),
            loadingLabel: v.i18n('Refreshing...'),
            errorLabel: v.i18n('Something wrong happened'),
        },
    }),

    methods: {
        refresh() {
            return new Promise(() => window.location.reload(true));
        },
    },
};
</script>

<style>
    .pull-down-header {
        z-index: 1000;
    }
</style>
