<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="addrs" ref="table"/>
</template>
<!-- <router>
{
    name: 'addrs.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';


layout: 'auth';
    meta: {
        permission: { name: 'addresses menu' };
        title: 'Address - Index';
    };

    components: { EnsoTable };

</script>

<style lang="scss">
</style>
