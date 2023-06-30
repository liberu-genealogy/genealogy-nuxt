<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="person_ancis"/>
</template>

<!-- <router>
{
    name: 'personanci.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';



layout: 'auth';
    meta: {
        permission: { name: 'personanci menu' };
        title: 'Person Anci - Index';
    };

    components: { EnsoTable };
</script>

<style lang="scss">
</style>
