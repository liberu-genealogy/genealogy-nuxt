<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="refns"/>
</template>
<router>
{
    name: 'refn.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    name: 'Index',
    layout: 'auth',
    meta: {
        permission: { name: 'refn menu' },
        title: 'Refn - Index'
    },
    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
