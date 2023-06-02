<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="person_events"/>
</template>

<router>
{
    name: 'personevent.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {

layout: 'auth',
    meta: {
        permission: { name: 'personevent menu' },
        title: 'Person Event - Index'
    },

    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
