<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box form-box has-background-light raises-on-hover"/>
        </div>
    </div>
</template>
<!-- <router>
{
    name: 'places.create'
}
</router> -->
<script setup>
import { EnsoForm } from '@enso-ui/forms/bulma';


    name: 'Create';

    layout: 'auth';
	meta: {
        permission: { name: 'places menu' };
        title: 'Places - Create';
    };
    components: { EnsoForm };
</script>

<style lang="scss">
</style>
