<template>
    <core-home v-slot:default="{ loading, showQuote, quote, hide }">
        <section class="hero is-fullheight is-primary is-bold">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <loader transparent
                        size="large"
                        color="#dbdbdb"
                        v-if="loading"/>
                    <div v-else-if="showQuote">
                        <div class="subtitle is-1 inspiring animated fadeInDown">
                            {{ quote }}
                        </div>
                        <button class="animated fadeInRightBig button is-outlined"
                            v-focus
                            @click="hide">
                            {{ i18n('Enter the application') }}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </core-home>
</template>

<script>
import { focus } from '@enso-ui/directives';
import Loader from '@enso-ui/loader/bulma';
import CoreHome from '~/components/ui/core/layouts/Home.vue';

export default {
    name: 'Home',

    components: { CoreHome, Loader },

    directives: { focus },

    inject: ['i18n'],
};
</script>

<style>
    .title.inspiring {
        font-weight: 100;
    }
</style>
