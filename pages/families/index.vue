<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="families"/>
</template>

<!-- <router>
{
    name: 'families.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';


layout: 'auth';
    meta: {
        permission: { name: 'families menu' };
        title: 'Families - Index';
    };

    components: { EnsoTable };
</script>

<style lang="scss">
</style>
