<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="sources"/>
</template>
<!-- <router>
{
    name: 'sources.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';


    name: 'Index';
    layout: 'auth';
    meta: {
        permission: { name: 'sources menu' };
        title: 'Sources - Index';
    };
    components: { EnsoTable };
</script>

<style lang="scss">
</style>
