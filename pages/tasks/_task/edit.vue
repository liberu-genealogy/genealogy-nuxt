<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <base-form/>
        </div>
    </div>
</template>
<router>
{
    name: 'tasks.edit',
}
</router>

<script>
import BaseForm from '~/components/tasks/bulma/pages/tasks/BaseForm.vue';

export default {
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Task',
    },

    components: { BaseForm },
};
</script>
