<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="publications"/>
</template>
<!-- <router>
{
    name: 'publications.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';


    name: 'Index';
    layout: 'auth';
	meta: {
        permission: { name: 'publications menu' };
        title: 'Publications - Index';
    };
    components: { EnsoTable };
</script>

<style lang="scss">
</style>
