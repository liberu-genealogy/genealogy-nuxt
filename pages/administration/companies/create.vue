<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box has-background-light raises-on-hover"/>
        </div>
    </div>
</template>
<router>
{
    name: 'administration.companies.create',
}
</router>

<script>
import { EnsoForm } from '@enso-ui/forms/bulma';

export default {
    meta: {
        breadcrumb: 'create',
        title: 'Create Company',
    },

    components: { EnsoForm },
};
</script>
