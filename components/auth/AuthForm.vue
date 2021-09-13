<template>
    <div class="login">
        <div class="box p-3">
            <div class="logo mb-3 is-flex">
                <figure class="image is-48x48  is-clickable is-flex"
                    @click="$router.push({ name: 'login' })">
                    <img src="~/assets/images/logo.svg"
                        :alt="meta.appName">
                </figure>
            </div>
            <form class="mb-2"
                @submit.prevent="submit()">
                <slot/>
                <submit v-bind="$attrs"
                    v-on="$listeners"/>
                <slot name="footer"/>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Errors from '@enso-ui/laravel-validation';
import Submit from './Submit.vue';

export default {
    name: 'AuthForm',

    components: { Submit },

    inject: ['routerErrorHandler'],

    data: () => ({
        errors: new Errors(),
        state: {
            successful: false,
        },
    }),

    computed: {
        ...mapState(['meta']),
    },

    provide() {
        return {
            state: this.state,
            errors: this.errors,
        }
    },
};
</script>

<style lang="scss">
    .login {
        max-width: 400px;
        margin: auto;

        .logo {
            justify-content: center;
        }

        .is-spaced {
            margin-right: 1.6em;
        }

        figure.logo {
            display: inline-block;
        }
    }
</style>
