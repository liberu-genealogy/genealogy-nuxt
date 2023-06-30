<template>
    <enso-table class="box is-paddingless raises-on-hover"
        id="people" ref="table"/>
</template>
<!-- <router>
{
    name: 'administration.people.index',
}
</router> -->

<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';


    meta: {
        breadcrumb: 'index';
        title: 'People';
    };

    components: { EnsoTable };
    
    inject: ['canAccess', 'i18n'];

</script>
