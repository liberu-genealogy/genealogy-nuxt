<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="objects"/>
</template>

<!-- <router>
{
    name: 'objects.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';


layout: 'auth';
    meta: {
        permission: { name: 'object menu' };
        title: 'Object - Index';
    };

    components: { EnsoTable };
</script>

<style lang="scss">
</style>
