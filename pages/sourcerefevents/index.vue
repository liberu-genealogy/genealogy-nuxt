<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="source_ref_evens"/>
</template>
<router>
{
    name: 'sourcerefevents.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    name: 'Index',
    layout: 'auth',
    meta: {
        permission: { name: 'sourcerefevents menu' },
        title: 'Sourcerefevents - Index'
    },
    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
