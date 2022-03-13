<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="person_alias"/>
</template>

<router>
{
    name: 'personalias.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {

layout: 'auth',
    meta: {
        permission: { name: 'personalias menu' },
        title: 'Person Alias - Index'
    },

    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
