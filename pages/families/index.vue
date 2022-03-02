<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="families"/>
</template>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';
import { ref, computed, useStore } from 'vue';
export default {
layout: 'auth',
    meta: {
        permission: { name: 'families menu' },
        title: 'Families - Index'
    },

    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
