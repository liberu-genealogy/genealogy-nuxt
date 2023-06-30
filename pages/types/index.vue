<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="types"/>
</template>
<!-- <router>
{
    name: 'types.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';


    name: 'Index';
    layout: 'auth';
    meta: {
        permission: { name: 'types menu' };
        title: 'Types - Index';
    };
    components: { EnsoTable };
</script>

<style lang="scss">
</style>
