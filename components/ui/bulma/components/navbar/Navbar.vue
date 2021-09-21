<template>
    <core-navbar>
        <template v-slot:default="{
            isMobile, isTouch, sidebar, meta, impersonating,
            toggleSidebar, canAccessTasks, items,
        }">
            <nav class="navbar app-navbar is-fixed-top" :class="{'isAuthenticated':!!loggedInUser}">
                <div class="navbar-brand">
                    <a class="navbar-item"
                        @click="toggleSidebar(isTouch)">
                        <span class="icon">
                            <font-awesome-icon :icon="['fas', 'bars']"
                                :class="{ 'rotate': !sidebar.isExpanded || !sidebar.isVisible }"/>
                        </span>
                    </a>
                    <a class="navbar-item logo"
                        href="#">
                        <figure class="image is-flex" style="width: 230px">
                           <img src="~assets/images/main-logo.svg" alt="">
                        </figure>
                    </a>
                   <!--  <div class="navbar-item"
                        v-if="meta.env !== 'production'">
                        <span class="tag is-warning is-clickable"
                            v-tooltip="meta.env">
                            <span class="icon is-small">
                                <fa icon="code"/>
                            </span>
                        </span>
                    </div> -->
                    <div class="navbar-item"
                        v-if="impersonating">
                        <a v-tooltip="i18n('Stop Impersonating')"
                            class="button is-small is-warning"
                            @click="$root.$emit('stop-impersonating')">
                            <span class="icon is-small">
                                <font-awesome-icon :icon="['fas', 'user']" />
                            </span>
                            <span class="icon is-small">
                                <font-awesome-icon :icon="['fas', 'user']" />
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
import { mapGetters, mapActions } from "vuex";
library.add(faBars, faCode, faUser, faTimes);

export default {
    name: 'Navbar',

    directives: { tooltip: VTooltip },

    computed: {
        ...mapGetters(['loggedInUser'])
    },
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
@import '~/assets/css/base.css';

.navbar {
    z-index: 3;
    height: $navbar-height;
    
    &.isAuthenticated {
        -webkit-box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
    }

    .navbar-end {
        justify-content: flex-end !important;
        margin-right: 0 !important
    }
    .navbar-item.logo .image img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        margin: auto;
    }

    .navbar-brand {
        min-height: 3.25em !important;
    }
    .fa-bars {
        transition: transform .300s;

        &.rotate {
            transform: rotate(90deg);
        }
    }

    .icon {
        color: #2b2b2b !important;
    }

    .navbar-link.is-arrowless span {
        color: #2b2b2b;
    }
}

</style>
