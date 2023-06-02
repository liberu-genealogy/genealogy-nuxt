<template>
    <div class="wrapper">
        <calendar-form :calendar="calendar"
            @submit="updateCalendar"
            @close="calendar = null"
            @destroy="destroy"
            v-if="calendar"/>
        <div class="box p-1 raises-on-hover">
            <vue-cal class="small-calendar is-paddingless"
                xsmall
                today-button
                :locale="lang"
                :time="false"
                hide-view-selector
                default-view="month"
                :disable-views="['years', 'year', 'week', 'day']"
                @cell-focus="$emit('change-date', $event)">
                <template v-slot:today-button>
                    <span class="icon is-small is-clickable is-naked"
                        @click="$emit('change-date', new Date())">
                        <fa icon="crosshairs"
                            size="xs"/>
                    </span>
                </template>
            </vue-cal>
        </div>
        <div class="level is-marginless">
            <div class="level-left">
                <div class="level-item">
                    <label class="label">
                        {{ i18n('Calendars') }}
                    </label>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <a class="button is-naked">
                        <span class="icon"
                            @click="calendar = {}">
                            <fa icon="plus"/>
                        </span>
                    </a>
                </div>
            </div>
        </div>
        <div class="level is-marginless calendar-item"
            v-for="calendar in calendars"
            :key="calendar.id">
            <div class="level-left">
                <div class="level-item">
                    <label class="checkbox">
                        <input class="is-hidden"
                            v-model="selected"
                            type="checkbox"
                            :value="calendar.id"
                            @change="updateSelection">
                        <span class="calendar-color"
                            :class="`calendar-${selected.includes(calendar.id) ? calendar.color : 'gray'}`"/>
                            {{ i18n(calendar.name) }}
                    </label>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <a class="button is-naked">
                        <span class="icon"
                            @click="setCalendar(calendar)"
                            v-if="!calendar.readonly">
                            <fa icon="pencil-alt"/>
                        </span>
                    </a>
                </div>
            </div>
        </div>
        <filter-state :api-version="apiVersion"
            name="calendarFilters"
            :filters="filtered"
            @ready="load"
            ref="filterState"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueCal from 'vue-cal';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faPlus, faFlag, faArrowsAltH, faCrosshairs,
} from '@fortawesome/free-solid-svg-icons';
import 'vue-cal/dist/vuecal.css';
import { FilterState } from '@enso-ui/filters/renderless';
import CalendarForm from './CalendarForm.vue';

import('../styles/colors.scss');

library.add(faPlus, faFlag, faArrowsAltH, faCrosshairs);

export default {
    name: 'CalendarFilter',

    components: { CalendarForm, VueCal, FilterState },

    inject: ['errorHandler', 'i18n', 'route'],

    data: () => ({
        apiVersion: 1.0,
        calendars: [],
        calendar: null,
        selected: [],
        filtered: {
            calendars: [],
        },
    }),

    computed: {
        ...mapGetters('preferences', ['lang']),
    },

    methods: {
        load() {
            this.fetch().then(() => {
                this.selected = this.calendars.map(({ id }) => id)
                    .filter(id => !this.filtered.calendars.includes(id));

                this.updateSelection();
            });
        },
        fetch() {
            return this.$axios.get(this.route('core.calendar.index'))
                .then(({ data }) => {
                    this.calendars = data;
                }).catch(this.errorHandler);
        },
        updateSelection() {
            this.filtered.calendars = this.calendars.map(({ id }) => id)
                .filter(id => !this.selected.includes(id));

            this.$emit('update-selection', this.selected);
        },
        setCalendar(calendar) {
            this.calendar = calendar;
        },
        updateCalendar({ calendar }) {
            this.fetch().then(() => {
                if (!this.calendar.id) {
                    this.selected.push(calendar.id);
                }

                this.calendar = null;
                this.updateSelection();
            });
        },
        destroy() {
            this.fetch().then(() => {
                const index = this.selected
                    .findIndex((id) => id === this.calendar.id);

                this.selected.splice(index, 1);
                this.calendar = null;
                this.updateSelection();
            });
        },
    },
};
</script>

<style lang="scss">
    .small-calendar {
        height: 290px;
    }

    .calendar-item .level-left {
        flex-shrink: 1;
        overflow: hidden;
    }
</style>
