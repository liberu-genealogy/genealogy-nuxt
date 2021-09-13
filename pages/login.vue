<template>
    <auth-form action="Login"
        icon="user"
        endpoint="login"
        :payload="payload"
        @success="init">
        <email v-model="payload.email"/>
        <password v-model="payload.password"/>
        <remember v-model="payload.remember"
            v-if="!isWebview"/>
        <template v-slot:footer>
            <nuxt-link class="is-pulled-right"
                :to="{ name: 'password.email' }">
                {{ i18n('Forgot password') }}
            </nuxt-link>
            <div class="is-clearfix"/>
        </template>
    </auth-form>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Errors from '@enso-ui/laravel-validation';
import AuthForm from '~/components/auth/AuthForm.vue';
import Email from '~/components/auth/fields/Email.vue';
import Password from '~/components/auth/fields/Password.vue';
import Remember from '~/components/auth/fields/Remember.vue';

export default {
    inject: ['i18n', 'route'],

    meta: {
        guestGuard: true,
        title: 'Login',
    },

    components: { AuthForm, Email, Password, Remember },

    data: () => ({
        errors: new Errors(),
        payload: {
            email: '',
            password: '',
            remember: false,
        }
    }),

    computed: {
        ...mapState(['meta']),
        ...mapGetters(['isWebview']),
    },

    methods: {
        ...mapMutations('auth', ['login']),
        ...mapMutations('layout', ['home']),
        ...mapMutations(['setShowQuote', 'setCsrfToken']),
        init(data) {
            this.setShowQuote(this.meta.showQuote);

            if (data.csrfToken) {
                this.setCsrfToken({token: data.csrfToken, $axios: this.$axios});
            }

            setTimeout(() => {
                this.login();
                this.home(true);
            }, 500);
        },
    },
};
</script>
