<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="userGroups"/>
</template>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    name: 'administration.userGroups.index',
    meta: {
        breadcrumb: 'index',
        title: 'User Groups',
    },

    components: { EnsoTable },
};
</script>
