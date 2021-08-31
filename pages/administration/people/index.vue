<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="people"/>
</template>

<script>
import { EnsoTable } from '@enso-ui/tables/bulma';

export default {
    name: 'administration.people.index',
    meta: {
        breadcrumb: 'index',
        title: 'People',
    },

    components: { EnsoTable },
};
</script>
