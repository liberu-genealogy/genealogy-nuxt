<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="userGroups"/>
</template>
<!-- <router>
{
    name: 'administration.userGroups.index'
}
</router> -->

<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';


    meta: {
        breadcrumb: 'index';
        title: 'User Groups';
    };

    components: { EnsoTable };
</script>
