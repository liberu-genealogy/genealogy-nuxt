<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="family_slgs"/>
</template>

<!-- <router>
{
    name: 'familyslugs.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';



layout: 'auth';
    meta: {
        permission: { name: 'familyslugs menu' };
        title: 'Family Slugs - Index';
    };


    components: { EnsoTable };
</script>

<style lang="scss">
</style>
