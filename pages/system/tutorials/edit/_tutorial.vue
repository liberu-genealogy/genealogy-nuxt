<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box has-background-light raises-on-hover"/>
        </div>
    </div>
</template>


<script setup>
import { EnsoForm } from '@enso-ui/forms/bulma';


    // path: ':tutorial/edit',
    meta: {
        breadcrumb: 'edit';
        title: 'Edit Tutorial';
    };

    components: { EnsoForm };
</script>
