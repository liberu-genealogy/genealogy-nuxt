<template>
    <modal class="event-modal">
        <enso-form class="box has-background-light"
            :path="path"
            ref="form"
            disable-state
            @destroy="$emit('destroy')"
            @submit="$emit('submit', $event)"
            @ready="init">
            <template #start_date="props">
                <form-field v-bind="props"
                    @update:model-value="
                        $refs.form.field('end_date').meta.min = $event;
                        $refs.form.field('recurrence_ends_at').meta.min = $event;
                    "/>
            </template>
            <template #end_date="props">
                <form-field v-bind="props"
                    @update:model-value="$refs.form.field('start_date').meta.max = $event;"/>
            </template>
            <template #frequency="props">
                <form-field v-bind="props"
                    @update:model-value="changeFrequency($event)"/>
            </template>
            <template #reminders="{ field }">
                <div class="field">
                    <label class="label">{{ i18n('Reminders') }}</label>
                    <div class="columns">
                        <div class="column is-3">
                            <fade>
                                <a @click="field.value.push(reminderFactory())"
                                   class="button is-small is-naked mt-2 is-pulled-right"
                                   v-if="field.value.length < 3
                                        && !field.value.some(({ scheduled_at }) => !scheduled_at)">
                                    <span class="icon is-small">
                                        <fa icon="plus"/>
                                    </span>
                                    <span class="icon is-small">
                                        <fa icon="user-clock"/>
                                    </span>
                                </a>
                            </fade>
                        </div>
                        <div class="column">
                            <div class="columns"
                                v-for="(reminder, index) in field.value"
                                :key="index">
                                <fade>
                                    <div class="column is-9">
                                        <p class="mb-1">
                                            <enso-datepicker v-bind="field.meta"
                                                v-model="reminder.scheduled_at"
                                                format="Y-m-d H:i:s"
                                                :alt-format="`${meta.dateFormat} H:i`"/>
                                        </p>
                                    </div>
                                </fade>
                                <div class="column">
                                    <a class="button is-small is-naked mt-1"
                                        @click="field.value.splice(index, 1)">
                                        <span class="icon is-small">
                                            <fa icon="minus"/>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div class="has-text-centered mt-2"
                                v-if="field.value.length === 0">
                                {{ i18n('No reminders yet') }}
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #calendar_id="{field,errors}">
                <color-select
                    :field="field"
                    :errors="errors"/>
            </template>
            <template #actions-right v-if="isEdit">
                <div class="level-right">
                    <div class="button is-success" @click="submit">
                        <span>Update</span>
                        <span class="icon">
                            <fa icon="check"/>
                        </span>
                    </div>
                </div>
            </template>
        </enso-form>
        <event-confirmation v-if="confirm"
            :event="event"
            @confirm="confirm($event); confirm = null;"
            @cancel="confirm = null;"
            @close="confirm = null;"/>
    </modal>
</template>

<script>
import { mapState } from 'vuex';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { EnsoForm, FormField } from '@enso-ui/forms/bulma';
import { Modal } from '@enso-ui/modal/bulma';
import { EnsoDatepicker } from '@enso-ui/datepicker/bulma';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserClock, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Fade } from '@enso-ui/transitions';
import format from '@enso-ui/ui/src/modules/plugins/date-fns/format';
import ColorSelect from './ColorSelect.vue';
import EventConfirmation from './EventConfirmation.vue';

library.add(faUserClock, faPlus, faMinus);

export default {
    name: 'EventForm',

    components: {
        ColorSelect,
        EnsoDatepicker,
        EnsoForm,
        EventConfirmation,
        Fa,
        Fade,
        FormField,
        Modal,
    },

    inject: ['i18n', 'http', 'route', 'toastr'],

    props: {
        event: {
            type: Object,
            required: true,
        },
    },

    emits: ['destroy', 'submit'],

    data: () => ({
        timeFormat: 'H:i',
        confirm: null,
    }),

    computed: {
        ...mapState(['meta', 'enums']),
        isEdit() {
            return this.event.id;
        },
        path() {
            return this.isEdit
                ? this.route('core.calendar.events.edit', { event: this.event.id })
                : this.route('core.calendar.events.create');
        },
        reminderFormat() {
            return `${this.meta.dateFormat} ${this.timeFormat}`;
        },
    },

    methods: {
        init() {
            this.$nextTick(() => {
                this.$refs.form.field('start_date').value = this.date(this.event.start);
                this.$refs.form.field('start_time').value = this.time(this.event.start);
                this.$refs.form.field('end_date').value = this.date(this.event.end);
                this.$refs.form.field('end_time').value = this.time(this.event.end);
            });
        },
        reminderFactory() {
            return {
                id: null,
                event_id: this.event.id,
                scheduled_at: null,
            };
        },
        addReminder() {
            this.$refs.form.field('reminders')
                .value.push(this.reminder());
        },
        date(date) {
            return format(date, 'Y-m-d');
        },
        time(dateTime) {
            return format(dateTime, 'H:i');
        },
        changeFrequency(frequency) {
            this.$refs.form.field('recurrence_ends_at')
                .meta.hidden = frequency === this.enums.eventFrequencies.Once;
        },
        submit($event, updateType) {
            if (this.needConfirm(updateType)) {
                this.confirm = updateType => this.submit($event, updateType);
                return;
            }
            this.submitForm({ ...this.$refs.form.formData, updateType });
        },
        submitForm(params) {
            this.http.patch(
                this.route('core.calendar.events.update', { event: this.event.id }),
                params,
            ).then(({ data }) => {
                this.toastr.success(data.message);
                this.$emit('submit');
            }).catch(error => {
                const { status, data } = error.response;

                if (status === 422) {
                    this.$refs.form.errors.set(data.errors);
                    this.$nextTick(this.$refs.form.focusError);
                    return;
                }

                this.$refs.form.errorHandler(error);
            });
        },
        needConfirm(updateType) {
            return this.isEdit && updateType === undefined
                && this.enums.eventFrequencies.Once !== `${this.event.frequency}`;
        },
    },
};
</script>

<style lang="scss">
    .modal.event-modal .modal-content {
        overflow: visible;
        width: 750px;
    }
</style>
