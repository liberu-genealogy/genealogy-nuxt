<template>
    <div class="columns is-centered">
        <div class="column is-half-desktop is-full-touch">
            <enso-form class="box has-background-light raises-on-hover"/>
        </div>
    </div>
</template>
<router>
{
    name: 'administration.userGroups.edit'
}
</router>

<script>
import { EnsoForm } from '@enso-ui/forms/bulma';

export default {
    // path: ':userGroup/edit',
    meta: {
        breadcrumb: 'edit',
        title: 'Edit User Group',
    },

    components: { EnsoForm },
};
</script>
