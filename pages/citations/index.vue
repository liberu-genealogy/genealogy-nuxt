<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="citations"/>
</template>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {

layout: 'auth',
    meta: {
        permission: { name: 'citations menu' },
        title: 'Citations - Index'
    },


    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
