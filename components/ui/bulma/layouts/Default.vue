<template>
    <core-default v-slot:default="{
            appState, lightsOff, bookmarks, sidebar, settings, rtl,
            slideIn, slideOut, footer,
        }">
        <div class="app-main"
            :class="{ 'lights-off': lightsOff }">
            <navbar-refresh/>
            <slide-down>
                <bookmarks :class="[
                        { 'with-sidebar': sidebar.isVisible },
                        { 'sidebar-collapsed': !sidebar.isExpanded }
                    ]"
                    v-if="bookmarks"/>
            </slide-down>
            <horizontal-slide :rtl="rtl">
                <sidebar :class="{ 'is-collapsed' : !sidebar.isExpanded }"
                    v-if="sidebar.isVisible"/>
            </horizontal-slide>
            <section class="main-content"
                :class="[
                    sidebar.isExpanded ? 'is-expanded' : 'is-collapsed',
                    { 'with-bookmarks': bookmarks }
                ]">
                <div class="wrapper page-content">
                    <page-header :key="$route.path"/>
                    <main-router v-if="appState"/>
                </div>
            </section>
            <scroll-to-top type="is-medium is-primary is-raised"/>
            <settings class="animated"
                :class="settings.isVisible ? slideIn : slideOut"/>
            <app-footer class="animated slideInUp"
                :class="{ 'sidebar-collapsed': !sidebar.isExpanded }"
                v-if="footer"/>
        </div>
    </core-default>
</template>

<script>
import { SlideDown, HorizontalSlide } from '@enso-ui/transitions';
import ScrollToTop from '@enso-ui/scroll-to-top/bulma';
import Bookmarks from '~/components/bookmarks/bulma/components/Bookmarks.vue';
import CoreDefault from '../../core/layouts/Default.vue';
import NavbarRefresh from '../components/navbar/NavbarRefresh.vue';
import Sidebar from '../components/menu/Sidebar.vue';
import Settings from '../components/settings/Settings.vue';
import AppFooter from '../components/AppFooter.vue';
import MainRouter from '../pages/MainRouter.vue';
import PageHeader from '../components/PageHeader.vue';

export default {
    name: 'Default',

    components: {
        CoreDefault,
        SlideDown,
        HorizontalSlide,
        NavbarRefresh,
        Sidebar,
        Settings,
        ScrollToTop,
        AppFooter,
        MainRouter,
        Bookmarks,
        PageHeader,
    },
};
</script>

<style lang="scss">
    @import '~/assets/themes/variables';

    .app-main {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        opacity: 1;
        transition: all .15s ease;

        &.lights-off {
            opacity: 0;
        }
    }

    .main-content {
        flex: 1;
        z-index: 1;
        margin-top: $navbar-height;
        transition: margin .5s;

        &.with-bookmarks {
            margin-top: 82px;
        }

        &.is-collapsed {
            [dir='ltr'] & {
                margin-left: $sidebar-collapsed-width;
            }
            [dir='rtl'] & {
                margin-right: $sidebar-collapsed-width;
            }
        }

        &.is-expanded {
            [dir='ltr'] & {
                margin-left: $sidebar-width;
            }
            [dir='rtl'] & {
                margin-right: $sidebar-width;
                }
        }
    }

    @media screen and (max-width: 1023px) {
        .main-content {
            &.is-expanded, &.is-collapsed {
                [dir='ltr'] & {
                    margin-left: 0;
                }
                [dir='rtl'] & {
                    margin-right: 0;
                }
            }
        }
    }

    .wrapper.page-content {
        padding: 1.2em;
        margin-top: 0;
    }
</style>
