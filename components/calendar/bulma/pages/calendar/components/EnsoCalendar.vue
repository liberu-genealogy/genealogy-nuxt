<template>
    <div class="calendar-wrapper box is-paddingless raises-on-hover">
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
            :drag-to-create-threshold="0"
            v-on="$listeners">
            <template v-slot:today-button>
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
            <template v-slot:event="{ event, view }">
                <div>
                    <b class="has-text-centered">
                        {{ event.title }}
                    </b>
                    <p class="event-body mb-1"
                        v-if="event.body"
                        v-html="event.body"/>
                    <div v-if="!event.allDay">
                        <p class="has-text-centered"
                            v-if="hovering === event.id">
                                {{ dateTimeFormat(event.daysCount,event.start) }}
                                <fa icon="arrows-alt-h"/>
                                {{ dateTimeFormat(event.daysCount,event.end) }}
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
import VueCal from 'vue-cal';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFlag, faArrowsAltH } from '@fortawesome/free-solid-svg-icons';
import EventConfirmation from './EventConfirmation';

import 'vue-cal/dist/drag-and-drop.js';
import 'vue-cal/dist/i18n/ar.js';
import 'vue-cal/dist/i18n/de.js';
import 'vue-cal/dist/i18n/fr.js';
import 'vue-cal/dist/i18n/hu.js';
import 'vue-cal/dist/i18n/nl.js';
import 'vue-cal/dist/i18n/ro.js';
import 'vue-cal/dist/i18n/es.js';

import('../styles/colors.scss');

library.add(faFlag, faArrowsAltH);

export default {
    name: 'EnsoCalendar',

    components: { VueCal, EventConfirmation },

    inject: ['errorHandler', 'i18n', 'route', 'routerErrorHandler', 'toastr'],

    props: {
        date: {
            required: true,
        },
        calendars: {
            type: Array,
            required: true,
        },
    },

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
                && this.dateFormat(this.vuecalEvent.oldDate) !== this.dateFormat(this.vuecalEvent.newDate);
        },
    },

    watch: {
        calendars: 'fetch',
    },

    mounted() {
        this.resize();

        window.addEventListener('resize', this.resize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resize);
    },

    methods: {
        resize() {
            this.$el.style.height = `${document.body.clientHeight - 170}px`;
        },
        fetch() {
            if (this.calendars) {
                this.$axios.get(this.route('core.calendar.events.index'), { params: this.params })
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
            const index = this.events.findIndex((event) => event.id === this.event.id);
            this.events[index].end = new Date(this.vuecalEvent.originalEvent.end);
            this.events[index].start = new Date(this.vuecalEvent.originalEvent.start);
            this.events.splice(index, 1, this.events[index]);
        },
        update(updateType = null) {
            if (this.needsConfirmation(updateType)) {
                this.confirm = (updateType) => this.update(updateType);
                return;
            }

            const payload = {
                start_date: this.dateFormat(this.event.start),
                end_date: this.dateFormat(this.event.end),
                start_time: this.timeFormat(this.event.start),
                end_time: this.timeFormat(this.event.end),
                updateType,
            };

            this.$axios.patch(
                this.route('core.calendar.events.update', { event: this.event.id }),
                payload,
            ).then(({ data }) => {
                this.toastr.success(data.message);
                this.fetch();
            }).catch((e) => {
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
                this.confirm = (updateType) => this.destroy(event, updateType);
                return;
            }

            this.$axios.delete(
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
                ? this.$format(date, 'm-d h:i')
                : this.$format(date, 'h:i');
        },
        dateFormat(date) {
            return this.$format(date, 'Y-m-d');
        },
        timeFormat(dateTime) {
            return this.$format(dateTime, 'H:i');
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
