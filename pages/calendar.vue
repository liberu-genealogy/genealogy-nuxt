<template>
    <div class="wrapper">
        <div class="columns">
            <div class="column is-2-desktop is-8-tablet is-12-mobile">
                <calendar-filter @change-date="selectedDate = $event"
                    @update-selection="calendars = $event;"/>
            </div>
            <div class="column is-10-desktop is-12-tablet is-12-mobile">
                <enso-calendar :date="selectedDate"
                    :calendars="calendars"
                    ref="calendar"
                    @edit-event="event = $event || {}"/>
            </div>
        </div>
        <event-form :event="event"
            @submit="reloadEvents"
            @close="event = null"
            @destroy="reloadEvents"
            v-if="event"/>
            
    </div>
</template>
<router>
{
    name: 'core.calendar.index',
}
</router>

<script>
import { mapMutations } from 'vuex';
import EnsoCalendar from '~/components/calendar/bulma/pages/calendar/components/EnsoCalendar.vue';
import CalendarFilter from '~/components/calendar/bulma/pages/calendar/components/CalendarFilter.vue';
import EventForm from '~/components/calendar/bulma/pages/calendar/components/EventForm.vue';
import { ref, computed } from 'vue';

    export default {
        meta: {
            breadcrumb: 'calendar',
            title: 'Calendar',
        },

        components: { EnsoCalendar, CalendarFilter, EventForm },
        setup() {
            const inject = ref(['errorHandler', 'route']);
            const event = ref(null);
            const selectedDate = ref(null);
            const calendars = ref(['']);
            return { event, selectedDate, calendars };
            created(() => {
                this.hideFooter();
            });
            onBeforeUnmount(() => {
                this.showFooter();
            });
            return{
                ...mapMutations('layout', ['showFooter', 'hideFooter'])
            };
            function reloadEvents() {
                this.$refs.calendar.fetch();
                this.event = null;
            };
        },
    };


</script>
