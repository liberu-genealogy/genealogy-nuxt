<template>
    <core-auth v-slot:default="{ guestState }">
        <section class="hero is-fullheight is-primary is-bold">
            <div class="hero-body">
                <div class="container">
                    <router v-if="guestState"/>
                </div>
            </div>
        </section>
    </core-auth>
</template>

<script>
import CoreAuth from './CoreAuth.vue';
import Router from '../Router.vue';

export default {
    name: 'Auth',

    components: { CoreAuth, Router },
};
</script>