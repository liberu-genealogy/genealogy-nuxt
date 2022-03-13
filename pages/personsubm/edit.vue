<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box form-box has-background-light raises-on-hover"/>
        </div>
    </div>
</template>

<router>
{
    name: 'personsubm.edit'
}
</router>
<script>
import { EnsoForm } from '@enso-ui/forms/bulma';

export default {

layout: 'auth',
    meta: {
        permission: { name: 'personsubm menu' },
        title: 'Person Subm - Edit'
    },

    components: { EnsoForm },
};
</script>

<style lang="scss">
</style>
