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

library.add(faExclamationTriangle);

export default {
    name: 'AppUpdate',

    directives: { tooltip: VTooltip },

    inject: ['i18n', 'toastr'],

    data: () => ({
        message: null,
        title: null,
        tooltip: null,
    }),

    computed: {
        ...mapState(['meta']),
        ...mapState('layout', ['isTouch']),
        ...mapGetters('websockets', ['channels']),
    },

    created() {
        this.connect();
        this.listen();
        this.$root.$on('notify-new-release', () => this.notify());
    },

    methods: {
        ...mapMutations(['newRelease']),
        ...mapActions('websockets', ['connect']),
        listen() {
            window.Echo.private(this.channels.appUpdates)
                .listen('.new-update', ({ title, message, tooltip }) => {
                    this.newRelease();
                    this.message = this.i18n(message);
                    this.title = this.i18n(title);
                    this.tooltip = this.i18n(tooltip);
                    this.notify();
                });
        },
        notify() {
            this.toastr.duration(30000)
                .title(this.title)
                .warning(this.message);
        },
        reload() {
            window.location.reload(true);
        },
    },
};
</script>
