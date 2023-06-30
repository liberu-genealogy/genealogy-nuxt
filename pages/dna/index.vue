<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="dna"/>
</template>

<!-- <router>
{
    name: 'dna.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';

layout: 'auth';
    meta: {
        permission: { name: 'dna menu' };
        title: 'DNA - Index';
    };
    components: { EnsoTable };
</script>

<style lang="scss">
</style>
