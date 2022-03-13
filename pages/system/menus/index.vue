<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="menus"/>
</template>
<router>
{
    name: 'system.menus.index',
}
</router>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    meta: {
        breadcrumb: 'index',
        title: 'Menus',
    },
    components: { EnsoTable },
};
</script>
