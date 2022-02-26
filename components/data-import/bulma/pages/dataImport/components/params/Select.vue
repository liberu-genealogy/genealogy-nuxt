<template>
    <enso-select v-model="param.value"
         :source="param.route"
         :label="param.selectLabel"
         :placeholder="placeholder"
         :multiple="param.multiple"
         :params="param.params"/>
</template>

<script>
import { EnsoSelect } from '@enso-ui/select/bulma';
import { ref, computed, useStore, watch } from 'vue';

export default {
    name: 'Select',

    components: { EnsoSelect },

    inject: ['i18n'],

    props: {
        param: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const placeholder = computed(() => {
            return this.param.placeholder
                ? this.i18n(this.param.placeholder)
                : this.param.placeholder;
        })
    }
};
</script>
