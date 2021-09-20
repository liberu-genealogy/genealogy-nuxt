<template>
    <core-navbar>
        <template v-slot:default="{
            isMobile, isTouch, sidebar, meta, impersonating,
            toggleSidebar, canAccessTasks, items,
        }">
            <nav class="navbar app-navbar is-fixed-top">
                <div class="navbar-brand">
                    <a class="navbar-item"
                        @click="toggleSidebar(isTouch)">
                        <span class="icon">
                            <fa icon="bars"
                                :class="{ 'rotate': !sidebar.isExpanded || !sidebar.isVisible }"/>
                        </span>
                    </a>
                    <a class="navbar-item logo"
                        href="#">
                        <figure class="image is-32x32 is-flex">
                            <img src="~/assets/images/logo.svg">
                        </figure>
                        <h4 class="title is-4 animated ml-1"
                            v-if="!isMobile">
                            {{ meta.appName }}
                        </h4>
                    </a>
                    <div class="navbar-item"
                        v-if="meta.env !== 'production'">
                        <span class="tag is-warning is-clickable"
                            v-tooltip="meta.env">
                            <span class="icon is-small">
                                <fa icon="code"/>
                            </span>
                        </span>
                    </div>
                    <div class="navbar-item"
                        v-if="impersonating">
                        <a v-tooltip="i18n('Stop Impersonating')"
                            class="button is-small is-warning"
                            @click="$root.$emit('stop-impersonating')">
                            <span class="icon is-small">
                                <fa icon="user"/>
                            </span>
                            <span class="icon is-small">
                                <fa icon="times"/>
                            </span>
                        </a>
                    </div>
                </div>
                <div class="navbar-menu">
                    <div class="navbar-end">
                        <search v-if="!isMobile"/>
                        <app-update/>
                        <component v-for="item in items"
                            :is="item"
                            :key="item"/>
                        <settings-control/>
                    </div>
                </div>
            </nav>
        </template>
    </core-navbar>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBars, faCode, faUser, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import CoreNavbar from '../../../core/components/navbar/Navbar.vue';
import AppUpdate from './AppUpdate.vue';
import SettingsControl from './SettingsControl.vue';
import Search from './Search.vue';

library.add(faBars, faCode, faUser, faTimes);

export default {
    name: 'Navbar',

    directives: { tooltip: VTooltip },

    components: {
        AppUpdate,
        CoreNavbar,
        Search,
        SettingsControl,
    },

    inject: ['i18n'],
};
</script>

<style lang="scss">
@import '~/assets/themes/variables';

.navbar {
    z-index: 3;

    .navbar-item.logo .image img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        margin: auto;
    }

    .fa-bars {
        transition: transform .300s;

        &.rotate {
            transform: rotate(90deg);
        }
    }
}

</style>
