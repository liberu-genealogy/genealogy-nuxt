<template>
<div class="columns is-centered">
        <div class="column is-four-fifths-desktop is-full-touch">
            <enso-form class="box has-background-light raises-on-hover">
                <template #group_id="props">
                    <form-field v-bind="props"
                        @update:model-value="pivotParams.userGroups.id = $event"/>
                </template>
                <template #role_id="props">
                    <form-field v-bind="props"
                        :pivot-params="pivotParams"/>
                </template>
            </enso-form>
        </div>
    </div>
</template>

<script>
import { EnsoForm, FormField } from '@enso-ui/forms/bulma';

export default {
    name: 'Create',

    components: { EnsoForm, FormField },

    data: () => ({
        pivotParams: { userGroups: { id: null } },
    }),
};
</script>
