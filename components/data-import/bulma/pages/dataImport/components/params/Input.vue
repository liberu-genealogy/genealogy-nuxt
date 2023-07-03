<template>
    <datepicker v-model="param.value"
        alt-input
        :placeholder="i18n(param.placeholder)"
        :alt-format="dateFormat"/>
</template>

<script setup>
import { mapState } from 'vuex';
import { Datepicker } from '@enso-ui/datepicker/bulma';


    name: 'Date';

    components: { Datepicker };

    inject: ['i18n'];

   const props = {
        param: {
            type: Object,
            required: true,
        },
    };

   const computed = {
        ...mapState(['meta']),
        dateFormat() {
            return this.param.meta?.dateFormat
                ?? this.meta.dateFormat;
        },
    };

    function created() {
        this.param.type = 'date';
    };
</script>
