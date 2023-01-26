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
    name: 'authors.edit'
}
</router>
<script>
import { EnsoForm } from '@enso-ui/forms/bulma';

export default {
    meta: {
        breadcrumb: 'edit',
        // permission: { name: 'authors menu' },
        title: 'Edit Authors'
    },

    components: { EnsoForm },

    inject: ['i18n', 'route'],

    computed: {

    },
};
</script>

<style lang="scss">
</style>
