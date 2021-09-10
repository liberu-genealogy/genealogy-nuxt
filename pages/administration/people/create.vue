<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box form-box has-background-light raises-on-hover">
                <template v-slot:companies="props">
                    <form-field v-bind="props"
                        @input="companies = $event"/>
                </template>
                <template v-slot:company="props">
                    <form-field v-bind="props"
                        :params="params"/>
                </template>
            </enso-form>
        </div>
    </div>
</template>
<router>
{
    name: 'administration.people.create',
}
</router>

<script>
import { EnsoForm, FormField } from '@enso-ui/forms/bulma';

export default {
    meta: {
        breadcrumb: 'create',
        title: 'Create Person',
    },

    components: { EnsoForm, FormField },

    data: () => ({
        companies: [],
    }),

    computed: {
        params() {
            return {
                id: this.companies,
            };
        },
    },
};
</script>
