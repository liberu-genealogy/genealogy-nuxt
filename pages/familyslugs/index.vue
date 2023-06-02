<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="family_slgs"/>
</template>

<router>
{
    name: 'familyslugs.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {

layout: 'auth',
    meta: {
        permission: { name: 'familyslugs menu' },
        title: 'Family Slugs - Index'
    },


    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
