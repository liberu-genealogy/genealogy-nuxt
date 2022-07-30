<template>
    <div class="activity-log">
        <h4 class="title is-4 has-text-centered"
            v-if="!feed.length">
            {{ i18n('No activity found') }}
        </h4>
        <fade v-else>
            <div :class="['timeline', {'is-centered':!isTouch}]"
                v-for="(day, index) in feed"
                :key="`${day}-${index}`">
                <header class="timeline-header">
                    <span class="tag is-medium is-bold is-primary">
                        {{ formatDate(day.date) }}
                    </span>
                </header>
                <div class="timeline-item"
                    v-for="event in day.entries"
                    :key="event.id">
                    <div class="timeline-marker is-icon"
                        :class="event.meta.iconClass">
                        <span class="icon is-small has-text-white">
                            <fa :icon="event.meta.icon"
                                size="xs"/>
                        </span>
                    </div>
                    <div class="timeline-content">
                        <event :event="event"/>
                    </div>
                </div>
            </div>
        </fade>
        <div class="has-text-centered"
            v-if="feed.length">
            <button :class="['button', {'is-loading': loading}]"
                @click="$emit('load-more')">
                {{ i18n('Load more') }}
            </button>
        </div>
    </div>
</template>

<script>
import { Fade } from '@enso-ui/transitions';
import { mapState } from 'vuex';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faSpinner, faSyncAlt, faPlus, faPencilAlt, faTrashAlt, faFlag,
} from '@fortawesome/free-solid-svg-icons';
import format from '@enso-ui/ui/src/modules/plugins/date-fns/format';
import Event from './Event.vue';

library.add(faSpinner, faSyncAlt, faPlus, faPencilAlt, faTrashAlt, faFlag);

export default {
    name: 'Timeline',

    components: { Fa, Fade, Event },

    inject: ['i18n'],

    props: {
        feed: {
            type: Array,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        },
    },

    emits: ['load-more'],

    computed: {
        ...mapState('layout', ['isTouch']),
        days() {
            return this.feed.reduce();
        },
    },

    methods: {
        formatDate(date) {
            return format(date, 'l F d');
        },
    },
};
</script>

<style lang="scss">
    .activity-log .timeline .timeline-content {
        width: 100%;
        .box {
            width:100%;
        }
    }
</style>
