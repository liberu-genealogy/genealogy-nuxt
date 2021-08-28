<template>
    <core-settings>
        <template v-slot:default="{ multiLanguage, multiTheme, meta, items }">
            <vue-aside class="settings">
                <p class="menu-label is-bold has-text-centered">
                    {{ i18n("Settings") }}
                </p>
                <ul class="menu-list">
                    <li v-for="item in items"
                        class="settings-item"
                        :key="item">
                        <component :is="item"/>
                    </li>
                    <li class="settings-item">
                        <sidebar-state/>
                    </li>
                </ul>
            </vue-aside>
        </template>
    </core-settings>
</template>

<script>
import CoreSettings from '../../../core/components/settings/Settings.vue';
import VueAside from '../VueAside.vue';
import SidebarState from './SidebarState.vue';

export default {
    name: 'Settings',

    inject: ['canAccess', 'i18n'],

    components: {
        CoreSettings,
        VueAside,
        SidebarState,
    },
};

</script>

<style lang="scss">

    .settings {
        overflow-y: auto;
        [dir='ltr'] & {
            right: 0;
        }
        [dir='rtl'] & {
            left: 0;
        }

        .settings-item {
            &:not(:empty) {
                padding: 6px;
            }

            .level-item {
                [dir='ltr'] & {
                    margin-right: unset;
                }
                [dir='rtl'] & {
                    margin-left: unset;
                }
            }
        }
    }

</style>
