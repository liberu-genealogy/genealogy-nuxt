<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="family_events"/>
</template>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {

layout: 'auth',
    meta: {
        permission: { name: 'familyevents menu' },
        title: 'Family Events - Index'
    },


    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
