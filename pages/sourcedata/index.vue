<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="source_datas"/>
</template>
<router>
{
    name: 'sourcedata.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';
import { ref, computed, useStore } from 'vue';
export default {
    name: 'Index',
    layout: 'auth',
    meta: {
        permission: { name: 'sourcedata menu' },
        title: 'Sourcedata - Index'
    },
    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
