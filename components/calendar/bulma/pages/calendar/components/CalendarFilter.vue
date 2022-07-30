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
                active-view="month"
                :disable-views="['years', 'year', 'week', 'day']"
                @cell-focus="$emit('change-date', $event)">
                <template #today-button>
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
            v-for="item in calendars"
            :key="item.id">
            <div class="level-left">
                <div class="level-item">
                    <label class="checkbox">
                        <input class="is-hidden"
                            v-model="selected"
                            type="checkbox"
                            :value="item.id"
                            @change="updateSelection">
                        <span class="calendar-color"
                            :class="`calendar-${selected.includes(item.id)
                            ? item.color
                            : 'gray'}`"/>
                            {{ i18n(item.name) }}
                    </label>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <a class="button is-naked">
                        <span class="icon"
                            @click="setCalendar(item)"
                            v-if="!item.readonly">
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
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import VueCal from 'vue-cal';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faPlus, faFlag, faArrowsAltH, faCrosshairs,
} from '@fortawesome/free-solid-svg-icons';
import 'vue-cal/dist/vuecal.css';
import { FilterState } from '@enso-ui/filters/renderless';
import CalendarForm from './CalendarForm.vue';

library.add(faPlus, faFlag, faArrowsAltH, faCrosshairs);

export default {
    name: 'CalendarFilter',

    components: {
        Fa, CalendarForm, VueCal, FilterState,
    },

    inject: ['errorHandler', 'http', 'i18n', 'route'],

    emits: ['change-date', 'update-selection'],

    data: () => ({
        apiVersion: 2,
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
            return this.http.get(this.route('core.calendar.index'))
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
                    .findIndex(id => id === this.calendar.id);

                this.selected.splice(index, 1);
                this.calendar = null;
                this.updateSelection();
            });
        },
    },
};
</script>

<style lang="scss">
    @import '../styles/colors.scss';

    .small-calendar {
        height: 290px;
    }

    .calendar-item .level-left {
        flex-shrink: 1;
        overflow: hidden;
    }
</style>
