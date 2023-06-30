<template>
    <vue-switch class="is-medium"
        v-model="param.value"/>
</template>

<script setup>
import VueSwitch from '@enso-ui/switch/bulma';


    name: 'Checkbox';

    components: { VueSwitch };

    inject: ['i18n'];

    props: {
        param: {
            type: Object,
            required: true,
        },
    };
</script>
