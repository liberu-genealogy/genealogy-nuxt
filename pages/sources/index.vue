<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="sources"/>
</template>
<router>
{
    name: 'sources.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';
import { ref, computed, useStore } from 'vue';
export default {
    name: 'Index',
    layout: 'auth',
    meta: {
        permission: { name: 'sources menu' },
        title: 'Sources - Index'
    },
    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
