<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="authors"/>
</template>
<!-- <router>
{
    name: 'authors.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';


layout: 'auth';
    meta: {
        permission: { name: 'authors menu' };
        title: 'Authors - Index';
    };

    components: { EnsoTable };
</script>

<style lang="scss">
</style>
