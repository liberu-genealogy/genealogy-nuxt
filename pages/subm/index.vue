<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="subms"/>
</template>
<router>
{
    name: 'subm.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    name: 'Index',
    layout: 'auth',
    meta: {
        permission: { name: 'subm menu' },
        title: 'subm - Index'
    },
    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
