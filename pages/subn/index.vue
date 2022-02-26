<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="subns"/>
</template>
<router>
{
    name: 'subn.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';
import { ref, computed, useStore } from 'vue';
export default {
    name: 'Index',
    layout: 'auth',
    meta: {
        permission: { name: 'subn menu' },
        title: 'subn - Index'
    },
    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
