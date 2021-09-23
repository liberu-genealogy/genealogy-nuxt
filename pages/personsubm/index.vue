<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="person_subms"/>
</template>

<router>
{
    name: 'personsubm.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {

layout: 'auth',
    meta: {
        permission: { name: 'personsubm menu' },
        title: 'Person Subm - Index'
    },

    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
