<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="userGroups"/>
</template>
<router>
{
    name: 'administration.userGroups.index'
}
</router>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    meta: {
        breadcrumb: 'index',
        title: 'User Groups',
    },

    components: { EnsoTable },
};
</script>
