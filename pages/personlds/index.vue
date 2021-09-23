<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="person_lds"/>
</template>
<router>
{
    name: 'personlds.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {

layout: 'auth',
    meta: {
        permission: { name: 'personlds menu' },
        title: 'Person LDS - Index'
    },

    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
