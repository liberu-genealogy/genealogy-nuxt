<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box has-background-light raises-on-hover"/>
        </div>
    </div>
</template>


<script setup>
import { EnsoForm } from '@enso-ui/forms/bulma';


    meta: {
        breadcrumb: 'create';
        title: 'Create Role';
    };

    components: { EnsoForm };
</script>
