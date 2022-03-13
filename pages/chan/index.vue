<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="chans"/>
</template>
<router>
{
    name: 'chan.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
layout: 'auth',
    meta: {
        permission: { name: 'chan menu' },
        title: 'Chan - Index'
    },

    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
