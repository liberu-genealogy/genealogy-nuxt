<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="person_assos"/>
</template>

<router>
{
    name: 'personasso.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {

layout: 'auth',
    meta: {
        permission: { name: 'personasso menu' },
        title: 'Person Asso - Index'
    },

    components: { EnsoTable },
};
</script>

<style lang="scss">
</style>
