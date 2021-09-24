<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="places"/>
</template>
<router>
{
    name: 'places.create'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    name: 'Index',
    layout: 'auth',
	meta: {
        permission: { name: 'places menu' },
        title: 'Places - Index'
    },
    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
