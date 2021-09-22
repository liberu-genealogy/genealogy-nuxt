<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="addrs"/>
</template>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
layout: 'auth',
    meta: {
        permission: { name: 'addresses menu' },
        title: 'Address - Index'
    },

    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
<router>
{
    name: 'addresses.index'
}
</router>
