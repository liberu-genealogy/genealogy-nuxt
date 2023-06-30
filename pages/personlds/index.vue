<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="person_lds"/>
</template>
<!-- <router>
{
    name: 'personlds.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';



layout: 'auth';
    meta: {
        permission: { name: 'personlds menu' };
        title: 'Person LDS - Index';
    };

    components: { EnsoTable };
</script>

<style lang="scss">
</style>
