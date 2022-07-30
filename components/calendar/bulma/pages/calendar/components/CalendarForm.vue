<template>
    <modal class="calendar-modal">
        <enso-form class="box has-background-light"
            :path="path"
            ref="form"
            disable-state
            @destroy="$emit('destroy')"
            @submit="$emit('submit', $event)">
            <template #color="{field,errors}">
                <color-select
                    :field="field"
                    :errors="errors"
                    color-field="id"/>
            </template>
        </enso-form>
    </modal>
</template>

<script>
import { mapState } from 'vuex';
import { EnsoForm } from '@enso-ui/forms/bulma';
import { Modal } from '@enso-ui/modal/bulma';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinus, faPlus, faUserClock } from '@fortawesome/free-solid-svg-icons';
import ColorSelect from './ColorSelect.vue';

library.add(faUserClock, faPlus, faMinus);

export default {
    name: 'CalendarForm',

    components: { Modal, EnsoForm, ColorSelect },

    inject: ['i18n', 'route'],

    props: {
        calendar: {
            type: Object,
            required: true,
        },
    },

    emits: ['destroy', 'submit'],

    computed: {
        ...mapState(['meta']),
        path() {
            return this.calendar.id
                ? this.route('core.calendar.edit', { calendar: this.calendar.id })
                : this.route('core.calendar.create');
        },
    },
};
</script>

<style lang="scss">
    .modal.calendar-modal .modal-content {
        overflow: visible;
        width: 400px;
    }
</style>
