<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="person_subms"/>
</template>

<!-- <router>
{
    name: 'personsubm.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';



layout: 'auth';
    meta: {
        permission: { name: 'personsubm menu' };
        title: 'Person Subm - Index';
    };

    components: { EnsoTable };
</script>

<style lang="scss">
</style>
