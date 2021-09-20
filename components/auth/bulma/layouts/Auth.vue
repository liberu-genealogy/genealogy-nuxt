<template>
    <core-auth v-slot:default="{ guestState }">
        <!-- <section class="hero is-fullheight is-primary is-bold">
            <div class="hero-body">
                <div class="container">
                    <router v-if="guestState"/>
                </div>
            </div>
        </section> -->
        <router v-if="guestState"/>
    </core-auth>
</template>

<script>
import CoreAuth from '~/components/auth/core/layouts/Auth.vue';
import Router from '~/components/ui/bulma/pages/Router.vue';

export default {
    name: 'Auth',

    components: { CoreAuth, Router },
};
</script>
