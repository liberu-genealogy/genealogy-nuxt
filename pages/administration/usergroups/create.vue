<template>
    <div class="columns is-centered">
        <div class="column is-half-desktop is-full-touch">
            <enso-form class="box has-background-light raises-on-hover"/>
        </div>
    </div>
</template>
<!-- <router>
{
    name: 'administration.userGroups.create',
}
</router> -->

<script setup>
import { EnsoForm } from '@enso-ui/forms/bulma';


    meta: {
        breadcrumb: 'create';
        title: 'Create User Group';
    };

    components: { EnsoForm };
</script>
