<template>
    <datepicker v-model="param.value"
        alt-input
        :placeholder="i18n(param.placeholder)"
        :alt-format="dateFormat"/>
</template>

<script>
import { mapState } from 'vuex';
import { Datepicker } from '@enso-ui/datepicker/bulma';

export default {
    name: 'Date',

    components: { Datepicker },

    inject: ['i18n'],

    props: {
        param: {
            type: Object,
            required: true,
        },
    },

    computed: {
        ...mapState(['meta']),
        dateFormat() {
            return this.param.meta?.dateFormat
                ?? this.meta.dateFormat;
        },
    },

    created() {
        this.param.type = 'date';
    },
};
</script>
