<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="objects"/>
</template>

<router>
{
    name: 'objects.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
layout: 'auth',
    meta: {
        permission: { name: 'object menu' },
        title: 'Object - Index'
    },

    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
