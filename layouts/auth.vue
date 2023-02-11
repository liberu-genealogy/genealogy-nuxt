<template>
    <core-app>
        <template v-slot:default="{ isAuth, home, direction }">
            <div id="app"
                :dir="direction">
                <document-title/>
                <loader/>
                <fade>
                    <auth v-if="!isAuth"/>
                    <home v-else-if="home"/>
                    <default v-else/>
                </fade>
            </div>
        </template>
    </core-app>
</template>

<script>
import { Fade } from '@enso-ui/transitions';
import CoreApp from '~/components/ui/core/CoreApp.vue';
import DocumentTitle from '~/components/ui/core/components/DocumentTitle.vue';
import Loader from '~/components/ui/bulma/components/Loader.vue';
import Auth from '~/components/auth/bulma/layouts/Auth.vue';
import Home from '~/components/ui/bulma/layouts/Home.vue';
import Default from '~/components/ui/bulma/layouts/Default.vue';

export default {
    name: 'Root',

    components: {
        CoreApp, DocumentTitle, Loader, Fade, Auth, Home, Default,
    },
};
</script>
