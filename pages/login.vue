<template>
    <login-form action="Login" route="login" @success="init" />
    <!-- <auth-form action="Login"
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
    </auth-form> -->
</template>

<script>
    import { mapState, mapGetters, mapMutations } from 'vuex';
    import Errors from '@enso-ui/laravel-validation';
    import LoginForm from '~/components/auth/LoginForm.vue';
    import { useStore } from 'vuex';
    // import Email from '~/components/auth/fields/Email.vue';
    // import Password from '~/components/auth/fields/Password.vue';
    // import Remember from '~/components/auth/fields/Remember.vue';

    export default {
        layout: 'index',
        meta: {
            guestGuard: true,
            title: 'Login',
        },
        components: { LoginForm },

        setup() {
            const errors = new Errors();
            const payload = [
                email = ref(''),
                password = ref(''),
                remember = ref('false')
            ];
            const store = useStore();
            return {
                one: computed(() => store.getters['$isWebview']),
                two: computed(() => store.state[meta])
            };

            return{
                ...mapMutations('auth', ['login']),
                ...mapMutations('layout', ['home']),
                ...mapMutations(['setShowQuote', 'setCsrfToken']),
            };

            function init(data) {
                this.setShowQuote(this.meta.showQuote);
                if (data.csrfToken) {
                    this.setCsrfToken({token: data.csrfToken, $axios: this.$axios});
                }

                setTimeout(() => {
                    this.$router.push('/dashboard');
                    this.login();
                    this.home(true);
                }, 500);
            }
        }
    }

</script>
