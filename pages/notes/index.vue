<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="notes"/>
</template>
<!-- 
<router>
{
    name: 'notes.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';



layout: 'auth';
    meta: {
        permission: { name: 'notes menu' };
        title: 'Notes - Index';
    };

    components: { EnsoTable };

</script>

<style lang="scss">
</style>
