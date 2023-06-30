<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="source_data_evens"/>
</template>
<!-- <router>
{
    name: 'sourcedataevent.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';


    name: 'Index';
    layout: 'auth';
    meta: {
        permission: { name: 'sourcedataevent menu' };
        title: 'Sourcedataevent - Index';
    };
    components: { EnsoTable };
</script>

<style lang="scss">
</style>
