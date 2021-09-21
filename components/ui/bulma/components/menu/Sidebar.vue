<template>
    <core-sidebar>
        <template v-slot:default="{ menus }">
            <vue-aside class="sidebar no-scrollbars menu-container has-background-primary">
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
        background: #4FCF8D !important;
        border: none;
        color: white;

        &.is-collapsed {
            width: $sidebar-collapsed-width;
        }

        ul.menu-list li {
            line-height: 2.25;
            ul {
                border-right: none !important;
                border-left: none !important;    
            }
            
        }
    }
</style>
