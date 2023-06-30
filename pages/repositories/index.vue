<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="repositories"/>
</template>
<!-- <router>
{
    name: 'repositories.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';


    layout: 'auth';
    meta: {
        permission: { name: 'repositories menu' };
        title: 'Repositories - Index';
    };
    components: { EnsoTable };
</script>

<style lang="scss">
</style>
