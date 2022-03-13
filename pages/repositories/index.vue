<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="repositories"/>
</template>
<router>
{
    name: 'repositories.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    name: 'Index',
    layout: 'auth',
    meta: {
        permission: { name: 'repositories menu' },
        title: 'Repositories - Index'
    },
    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
