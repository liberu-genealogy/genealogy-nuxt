<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="menus"/>
</template>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    name: 'system.menus.index',
    meta: {
        breadcrumb: 'index',
        title: 'Menus',
    },
    components: { EnsoTable },
};
</script>
