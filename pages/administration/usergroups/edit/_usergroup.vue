<template>
    <div class="columns is-centered">
        <div class="column is-half-desktop is-full-touch">
            <enso-form class="box has-background-light raises-on-hover"
                :path="`api${this.$route.path}`"
            />
        </div>
    </div>
</template>
<!-- <router>
{
    name: 'administration.userGroups.edit'
}
</router> -->

<script setup>
import { EnsoForm } from '@enso-ui/forms/bulma';


    // path: ':userGroup/edit',
    meta: {
        breadcrumb: 'edit';
        title: 'Edit User Group';
    };

    components: { EnsoForm };
</script>
