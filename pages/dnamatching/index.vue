<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="dnamatching"/>
</template>

<router>
{
    name: 'dnamatching.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';
import { ref, computed, useStore } from 'vue';
export default {
layout: 'auth',
    meta: {
        permission: { name: 'dnamatching menu' },
        title: 'DNA Matching - Index'
    },
    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
