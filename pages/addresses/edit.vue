<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box form-box has-background-light raises-on-hover"/>
        </div>
    </div>
</template>
<router>
{
    name: 'addresses.edit'
}
</router>
<script>
import { EnsoForm } from '@enso-ui/forms/bulma';

export default {
layout: 'auth',
    meta: {
        permission: { name: 'addresses menu' },
        title: 'Address - Edit'
    },
    components: { EnsoForm },
};
</script>

<style lang="scss">
</style>
