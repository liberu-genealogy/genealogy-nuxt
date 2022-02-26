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
import { ref, computed, useStore, watch } from 'vue';

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
    setup() {
        const events = ref([])
        const vuecalEvent = ref(null)
        const confirm = ref(null)
        const hovering = ref(null)
        const dragedEvent = ref(null)
        const deleteEventFunction = ref(null)
        const store = useStore()
        return {
            one: computed(() => store.getters['${preferences}/lang']),
            two: computed(() => store.state[enums].meta)
        }
        const event = computed(() => {
            return this.vuecalEvent?event:''
        })
        const params = computed(() => {
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
        })
        const isFrequent = computed(() => {
            return this.event
                && `${this.event.frequency}` !== this.enums.eventFrequencies.Once;
        })
        const dateChanged = computed(() => {
            return this.vuecalEvent && this.vuecalEvent.oldDate && this.vuecalEvent.newDate
                && this.dateFormat(this.vuecalEvent.oldDate) !== this.dateFormat(this.vuecalEvent.newDate);
        })
        const calendars = ref('')
        watch(calendars, () => {
            const calendars = ref('fetch')
        })
        onMouted(() => {
            this.resize();
            window.addEventListener('resize', this.resize);
        })
        beforeUnmount(() => {
            window.removeEventListener('resize', this.resize);
        })
        function resize() {
            this.$el.style.height = `${document.body.clientHeight - 170}px`;
        }
        function fetch() {
            if (this.calendars) {
                this.$axios.get(this.route('core.calendar.events.index'), { params: this.params })
                    .then(({ data }) => (this.events = data))
                    .catch(this.errorHandler);
            }
        }
        function setDragedEvent(event, deleteEventFunction) {
            this.dragedEvent = event;
            this.deleteEventFunction = deleteEventFunction;
            return event;
        }
        function revert() {
            const index = this.events.findIndex((event) => event.id === this.event.id);
            this.events[index].end = new Date(this.vuecalEvent.originalEvent.end);
            this.events[index].start = new Date(this.vuecalEvent.originalEvent.start);
            this.events.splice(index, 1, this.events[index]);
        }
        function update(updateType = null) {
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
        }
        function updateInterval(interval) {
            this.interval = interval;
            this.fetch();
        }
        function selectEvent(event, e) {
            if (event.route) {
                this.$router.push(event.route)
                    .catch(this.routerErrorHandler);
                return;
            }
            if (!event.readonly) {
                this.$emit('edit-event', event);
            }
            e.stopPropagation();
        }
        function destroy(event, updateType = null) {
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
        }
        function needsConfirmation(updateType) {
            return updateType === null
                && this.isFrequent;
        }
        function dateTimeFormat(daysCount, date) {
            return daysCount > 1
                ? this.$format(date, 'm-d h:i')
                : this.$format(date, 'h:i');
        }
        function dateFormat(date) {
            return this.$format(date, 'Y-m-d');
        }
        function timeFormat(dateTime) {
            return this.$format(dateTime, 'H:i');
        }
        function cancelUpdate() {
            this.revert();
            this.confirm = null;
            this.vuecalEvent = null;
        }
        function eventDragCreated() {
            if (this.dragedEvent) {
                this.$emit('edit-event', this.dragedEvent);
                this.deleteEventFunction();
                this.dragedEvent = null;
            }
        }
    }
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
