<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box form-box has-background-light raises-on-hover"
                ref="form"
                :path="`api${this.$route.path}`"
            />
        </div>
    </div>
</template>
<router>
{
    name: 'repositories.edit'
}
</router>
<script>
import { EnsoForm } from '@enso-ui/forms/bulma';

export default {
    name: 'Edit',
    meta: {
        breadcrumb: 'edit',
        // permission: { name: 'authors menu' },
        title: 'Edit Repositories'
    },
    components: { EnsoForm },
    
    inject: ['i18n', 'route'],
};
</script>

<style lang="scss">
</style>
