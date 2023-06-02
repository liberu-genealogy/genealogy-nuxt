<template>
    <modal class="calendar-modal"
        v-on="$listeners">
        <enso-form class="box has-background-light"
            :path="path"
            v-on="$listeners"
            ref="form"
            disable-state>
            <template v-slot:color="{field,errors}">
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
