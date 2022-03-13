<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="dna"/>
</template>

<router>
{
    name: 'dna.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';
export default {
layout: 'auth',
    meta: {
        permission: { name: 'dna menu' },
        title: 'DNA - Index'
    },
    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
