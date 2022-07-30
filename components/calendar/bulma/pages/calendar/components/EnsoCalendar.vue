<template>
    <div class="calendar-wrapper box is-paddingless raises-on-hover"
        :class="$attrs.class">
        <vue-cal v-bind="$attrs"
            :time-from="7 * 60"
            :locale="lang"
            :selected-date="date"
            :events="events"
            show-all-day-events
            today-button
            watch-real-time
            events-count-on-year-view
            @ready="updateInterval"
            @view-change="updateInterval"
            @event-mouse-enter="hovering = $event.id"
            @event-mouse-leave="hovering = null"
            @event-delete="dragedEvent === null && destroy($event)"
            @event-duration-change="vuecalEvent = $event; update()"
            @event-drop="vuecalEvent = $event; update()"
            :on-event-dblclick="selectEvent"
            :on-event-create="setDragedEvent"
            @event-drag-create="eventDragCreated"
            editable-events
            :drag-to-create-threshold="0">
            <template #today-button>
                <a class="button is-small">
                    <span class="is-bold">
                        {{ i18n('Today') }}
                    </span>
                    <span class="icon is-small">
                        <fa icon="crosshairs"
                            size="xs"/>
                    </span>
                </a>
            </template>
            <template #event="{ event: item }">
                <div>
                    <b class="has-text-centered">
                        {{ item.title }}
                    </b>
                    <p class="event-body mb-1"
                        v-if="item.body"
                        v-html="item.body"/>
                    <div v-if="!item.allDay">
                        <p class="has-text-centered"
                            v-if="hovering === item.id">
                                {{ dateTimeFormat(item.daysCount,item.start) }}
                                <fa icon="arrows-alt-h"/>
                                {{ dateTimeFormat(item.daysCount,item.end) }}
                        </p>
                    </div>
                </div>
            </template>
        </vue-cal>
        <event-confirmation v-if="confirm"
            :event="event"
            :date-changed="dateChanged"
            @confirm="confirm($event); confirm = null; vuecalEvent = null"
            @cancel="cancelUpdate"
            @close="cancelUpdate"/>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import VueCal from 'vue-cal';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFlag, faArrowsAltH } from '@fortawesome/free-solid-svg-icons';
import format from '@enso-ui/ui/src/modules/plugins/date-fns/format';
import EventConfirmation from './EventConfirmation.vue';

import 'vue-cal/dist/drag-and-drop';
import 'vue-cal/dist/i18n/ar';
import 'vue-cal/dist/i18n/de';
import 'vue-cal/dist/i18n/fr';
import 'vue-cal/dist/i18n/hu';
import 'vue-cal/dist/i18n/nl';
import 'vue-cal/dist/i18n/ro';
import 'vue-cal/dist/i18n/es';

library.add(faFlag, faArrowsAltH);

export default {
    name: 'EnsoCalendar',

    components: { Fa, VueCal, EventConfirmation },

    inject: [
        'errorHandler', 'http', 'i18n', 'route', 'routerErrorHandler', 'toastr',
    ],

    inheritAttrs: false,

    props: {
        date: {
            type: [Date, null],
            required: true,
        },
        calendars: {
            type: Array,
            required: true,
        },
    },

    emits: ['edit-event'],

    data: () => ({
        events: [],
        vuecalEvent: null,
        confirm: null,
        hovering: null,
        interval: null,
        dragedEvent: null,
        deleteEventFunction: null,
    }),

    computed: {
        ...mapState(['enums', 'meta']),
        ...mapGetters('preferences', ['lang']),
        event() {
            return this.vuecalEvent?.event;
        },
        params() {
            if (!this.interval) {
                return { calendars: this.calendars };
            }

            if (this.interval.view === 'month') {
                return {
                    calendars: this.calendars,
                    startDate: `${this.dateFormat(this.interval.firstCellDate)} 00:00:00`,
                    endDate: `${this.dateFormat(this.interval.lastCellDate)} 23:59:59`,
                };
            }

            return {
                calendars: this.calendars,
                startDate: `${this.dateFormat(this.interval.startDate)} 00:00:00`,
                endDate: `${this.dateFormat(this.interval.endDate)} 23:59:59`,
            };
        },
        isFrequent() {
            return this.event
                && `${this.event.frequency}` !== this.enums.eventFrequencies.Once;
        },
        dateChanged() {
            return this.vuecalEvent && this.vuecalEvent.oldDate && this.vuecalEvent.newDate
                && this.dateFormat(this.vuecalEvent.oldDate)
                    !== this.dateFormat(this.vuecalEvent.newDate);
        },
    },

    watch: {
        calendars: {
            handler: 'fetch',
            deep: true,
        },
    },

    mounted() {
        this.resize();

        window.addEventListener('resize', this.resize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.resize);
    },

    methods: {
        resize() {
            this.$el.style.height = `${document.body.clientHeight - 170}px`;
        },
        fetch() {
            if (this.calendars) {
                this.http.get(this.route('core.calendar.events.index'), { params: this.params })
                    .then(({ data }) => (this.events = data))
                    .catch(this.errorHandler);
            }
        },
        setDragedEvent(event, deleteEventFunction) {
            this.dragedEvent = event;
            this.deleteEventFunction = deleteEventFunction;
            return event;
        },
        revert() {
            const index = this.events.findIndex(event => event.id === this.event.id);
            this.events[index].end = new Date(this.vuecalEvent.originalEvent.end);
            this.events[index].start = new Date(this.vuecalEvent.originalEvent.start);
            this.events.splice(index, 1, this.events[index]);
        },
        update(updateType = null) {
            if (this.needsConfirmation(updateType)) {
                this.confirm = updateType => this.update(updateType);
                return;
            }

            const payload = {
                start_date: this.dateFormat(this.event.start),
                end_date: this.dateFormat(this.event.end),
                start_time: this.timeFormat(this.event.start),
                end_time: this.timeFormat(this.event.end),
                updateType,
            };

            this.http.patch(
                this.route('core.calendar.events.update', { event: this.event.id }),
                payload,
            ).then(({ data }) => {
                this.toastr.success(data.message);
                this.fetch();
            }).catch(e => {
                this.revert();
                this.errorHandler(e);
            });
        },
        updateInterval(interval) {
            this.interval = interval;
            this.fetch();
        },
        selectEvent(event, e) {
            if (event.route) {
                this.$router.push(event.route)
                    .catch(this.routerErrorHandler);
                return;
            }
            if (!event.readonly) {
                this.$emit('edit-event', event);
            }
            e.stopPropagation();
        },
        destroy(event, updateType = null) {
            this.vuecalEvent = { event, originalEvent: event };

            if (this.needsConfirmation(updateType)) {
                this.confirm = updateType => this.destroy(event, updateType);
                return;
            }

            this.http.delete(
                this.route('core.calendar.events.destroy', { event: event.id }),
                { params: { updateType } },
            ).then(({ data }) => {
                this.toastr.success(data.message);
                this.fetch();
            }).catch(this.errorHandler);
        },
        needsConfirmation(updateType) {
            return updateType === null
                && this.isFrequent;
        },
        dateTimeFormat(daysCount, date) {
            return daysCount > 1
                ? format(date, 'm-d h:i')
                : format(date, 'h:i');
        },
        dateFormat(date) {
            return format(date, 'Y-m-d');
        },
        timeFormat(dateTime) {
            return format(dateTime, 'H:i');
        },
        cancelUpdate() {
            this.revert();
            this.confirm = null;
            this.vuecalEvent = null;
        },
        eventDragCreated() {
            if (this.dragedEvent) {
                this.$emit('edit-event', this.dragedEvent);
                this.deleteEventFunction();
                this.dragedEvent = null;
            }
        },
    },
};
</script>

<style lang="scss">
    @import '../styles/colors.scss';

    .calendar-wrapper {
        height: 100%;
        .vuecal {
            border-radius: inherit;
            .vuecal__body {
                overflow: auto;
                .vuecal__bg {
                    overflow: visible;
                }
            }
            .vuecal__cell:hover {
                cursor: pointer;
            }
        }
        .vuecal__event {
            .event-body {
                white-space: pre;
            }
        }
        .vuecal__event-resize-handle {
                &:after {
                    top: 5px;
                    left: calc(50% - 10px);
                }
                &:before {
                    top: 10px;
                    left: calc(50% - 10px);
                }
                &:after, &:before {
                    display: block;
                    content: "";
                    position: absolute;
                    width: 20px;
                    height: 2px;
                    transition-timing-function: ease;
                    transition-duration: .15s;
                    transition-property: transform;
                    border-radius: 4px;
                    background-color: #fff;
                }
            }
        .vuecal__time-column {
            height: auto;
            .vuecal__time-cell .label {
                color: inherit;
                display: inherit;
                font-size: inherit;
                font-weight: inherit;
            }
        }
    }
</style>
