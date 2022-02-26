<template>
    <div v-click-outside="hide"
        :class="['navbar-item has-dropdown', { 'is-active': dropdown }]">
        <a class="navbar-link is-arrowless"
            @click="$emit('click')">
            <slot name="desktop-icon"
                :icon="icon">
                <span :class="[{ 'is-muted': loading }, 'icon']">
                    <fa :icon="icon"/>
                </span>
            </slot>
            <sup>
                <slot name="sup"/>
            </sup>
            <sub>
                <slot name="sub"/>
            </sub>
            <loader size="small"
                v-if="loading"/>
        </a>
        <div v-if="dropdown"
            class="navbar-dropdown is-right">
            <slot/>
        </div>
    </div>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { clickOutside } from '@enso-ui/directives';
import Loader from '@enso-ui/loader/bulma';
import { ref, computed, useStore, watch } from 'vue';


export default {
    name: 'NavbarItem',

    directives: { clickOutside, tooltip: VTooltip },

    components: { Loader },

    inject: ['i18n'],

    props: {
        icon: {
            type: String,
            required: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        const dropdown = ref(false)
        function hide() {
            this.dropdown = false;
        }
        function show() {
            this.dropdown = true;
        }
        function toggle() {
            this.dropdown = !this.dropdown;
        }
    }
};
</script>

<style lang="scss">
.navbar-item {
    sup, sub {
        font-size: 0.75em;
        font-weight: bold;
        right: 8px;
        position: absolute;
    }

    sup {
        top: 8px;
    }

    sub {
        bottom: 8px;
    }
}
</style>
