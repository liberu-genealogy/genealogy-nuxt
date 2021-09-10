<template>
<div class="columns is-centered">
        <div class="column is-four-fifths-desktop is-full-touch">
            <enso-form class="box has-background-light raises-on-hover">
                <template v-slot:group_id="props">
                    <form-field v-bind="props"
                        @input="pivotParams.userGroups.id = $event"/>
                </template>
                <template v-slot:role_id="props">
                    <form-field v-bind="props"
                        :pivot-params="pivotParams"/>
                </template>
            </enso-form>
        </div>
    </div>
</template>
<router>
{
    name: 'administration.users.create'
}
</router>

<script>
import { EnsoForm, FormField } from '@enso-ui/forms/bulma';

export default {
    meta: {
        breadcrumb: 'create',
        title: 'Create User',
    },

    components: { EnsoForm, FormField },

    data: () => ({
        pivotParams: { userGroups: { id: null } },
    }),
};
</script>
