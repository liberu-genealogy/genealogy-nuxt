<template>
    <core-sidebar>
        <template v-slot:default="{ menus }">
            <vue-aside class="sidebar no-scrollbars">
                <p class="menu-label is-bold has-text-centered">
                    {{ i18n("Menu") }}
                </p>
                <menus class="enso-menu"
                    :menus="menus"/>
            </vue-aside>
        </template>
    </core-sidebar>
</template>

<script>
import Menus from '~/components/menus/bulma/components/menu/Menus.vue';
import CoreSidebar from '../../../core/components/menu/Sidebar.vue';
import VueAside from '../VueAside.vue';

export default {
    name: 'Sidebar',

    components: { CoreSidebar, Menus, VueAside },

    inject: ['i18n'],
};
</script>

<style lang="scss">
    @import '~/assets/themes/variables';

    .aside.sidebar {
        overflow-y: auto;
        transition: width .5s;

        &.is-collapsed {
            width: $sidebar-collapsed-width;
        }
    }
</style>
