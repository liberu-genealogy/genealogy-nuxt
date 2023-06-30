<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="person_assos"/>
</template>

<!-- <router>
{
    name: 'personasso.index'
}
</router> -->
<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';



layout: 'auth';
    meta: {
        permission: { name: 'personasso menu' };
        title: 'Person Asso - Index';
    };

    components: { EnsoTable };
</script>

<style lang="scss">
</style>
