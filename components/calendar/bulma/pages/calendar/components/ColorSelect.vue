<template>
    <div>
        <label class="label">
            {{ i18n(field.label) }}
        </label>
        <vue-select v-bind="field.meta"
            v-model="field.value"
            :http="http"
            :i18n="i18n"
            :has-error="errors.has(field.name)"
            @fetch="field.meta.options = $event"
            @update:model-value="errors.clear(field.name); $emit('changed')">
            <template #selection="{ selection }">
                <div v-if="selection">
                    <span :class="`calendar-color calendar-${selection[colorField]}`"/>
                    <span>{{ selection.name }}</span>
                </div>
            </template>
            <template #option="{option}">
                <div>
                    <span :class="`calendar-color calendar-${option[colorField]}`"/>
                    <span>{{ option.name }}</span>
                </div>
            </template>
        </vue-select>
    </div>
</template>

<script>
import { VueSelect } from '@enso-ui/select/bulma';

export default {
    name: 'ColorSelect',

    components: { VueSelect },

    inject: ['http', 'i18n', 'route'],

    props: {
        field: {
            type: Object,
            required: true,
        },
        errors: {
            type: Object,
            required: true,
        },
        colorField: {
            type: String,
            default: 'color',
        },
    },

    emits: ['changed'],
};
</script>

<style lang="scss">
    .calendar-color {
        width: 10px;
        height: 10px;
        border-radius: 10px;
        display: inline-block;
        margin-right: 5px;
    }
</style>
