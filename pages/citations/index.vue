<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="citations"/>
</template>

<!-- <router>
{
    name: 'citations.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';



layout: 'auth';
    meta: {
        permission: { name: 'citations menu' };
        title: 'Citations - Index';
    };


    components: { EnsoTable };
</script>

<style lang="scss">
</style>
