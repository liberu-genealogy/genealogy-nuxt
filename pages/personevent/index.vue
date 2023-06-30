<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="person_events"/>
</template>

<!-- <router>
{
    name: 'personevent.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';



layout: 'auth';
    meta: {
        permission: { name: 'personevent menu' };
        title: 'Person Event - Index';
    };

    components: { EnsoTable };
</script>

<style lang="scss">
</style>
