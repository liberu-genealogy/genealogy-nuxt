<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="subns"/>
</template>
<!-- <router>
{
    name: 'subn.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';


    name: 'Index';
    layout: 'auth';
    meta: {
        permission: { name: 'subn menu' };
        title: 'subn - Index';
    };
    components: { EnsoTable };
</script>

<style lang="scss">
</style>
