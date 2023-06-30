<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <base-form/>
        </div>
    </div>
</template>


<script setup>
import BaseForm from '~/components/tasks/bulma/pages/tasks/BaseForm.vue';


    meta: {
        breadcrumb: 'create';
        title: 'Create Task';
    };

    components: { BaseForm };
</script>
