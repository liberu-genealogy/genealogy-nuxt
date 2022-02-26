<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box form-box has-background-light raises-on-hover"/>
        </div>
    </div>
</template>
<router>
{
    name: 'types.create'
}
</router>
<script>
import { EnsoForm } from '@enso-ui/forms/bulma';
import { ref, computed, useStore } from 'vue';
export default {
    name: 'Create',
    layout: 'auth',
    meta: {
        permission: { name: 'types menu' },
        title: 'Types - Create'
    },
    components: { EnsoForm },
};
</script>

<style lang="scss">
</style>
