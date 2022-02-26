<template>
    <div v-if="tooltip"
        class="navbar-item"
        v-tooltip="tooltip">
        <a @click="reload">
            <span class="icon has-text-danger animated infinite heartBeat slow delay-5s">
                <fa icon="exclamation-triangle"/>
            </span>
        </a>
    </div>
</template>

<script>
import {
    mapState, mapActions, mapGetters, mapMutations,
} from 'vuex';
import { VTooltip } from 'v-tooltip';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ref, computed, useStore, watch } from 'vue';

library.add(faExclamationTriangle);

export default {
    name: 'AppUpdate',

    directives: { tooltip: VTooltip },

    inject: ['i18n', 'toastr'],
    setup() {
        const message = ref(null)
        const title = ref(null)
        const tooltip = ref(null)
        const store = useStore()
        return {
            one: computed(() => store.state[meta]),
            two: computed(() => store.state[layout].isTouch),
            three: computed(() => store.getters['${websockets}/channels'])
        }
        created(() => {
            this.connect();
            this.listen();
            this.$root.$on('notify-new-release', () => this.notify());
        })
        return {
            ...mapMutations(['newRelease']),
            ...mapActions('websockets', ['connect']),
        }
        function listen() {
            window.Echo.private(this.channels.appUpdates)
                .listen('.new-update', ({ title, message, tooltip }) => {
                    this.newRelease();
                    this.message = this.i18n(message);
                    this.title = this.i18n(title);
                    this.tooltip = this.i18n(tooltip);
                    this.notify();
                });
        }
        function notify() {
            this.toastr.duration(30000)
                .title(this.title)
                .warning(this.message);
        }
        function reload() {
            window.location.reload(true);
        }
    }
};
</script>
