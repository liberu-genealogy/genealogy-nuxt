<template>
    <div>
        <label class="label">
            {{ i18n(field.label) }}
        </label>
        <vue-select v-bind="field.meta"
            v-model="field.value"
            :has-error="errors.has(field.name)"
            @fetch="field.meta.options = $event"
            @input="errors.clear(field.name); $emit('changed')"
            v-on="$listeners">
            <template v-slot:selection="{ selection, selectionBindings, selectionEvents }"
                :selection-bindings="selectionBindings"
                :selection-events="selectionEvents">
                <div v-if="selection">
                    <span :class="`calendar-color calendar-${selection[colorField]}`"/>
                    <span>{{ selection.name }}</span>
                </div>
            </template>
            <template v-slot:option="{option}">
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

    inject: ['i18n', 'route'],

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
