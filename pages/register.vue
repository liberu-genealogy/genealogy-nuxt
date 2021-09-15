<template>
    <register-form action="Register" route="register" @success="init"></register-form>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Errors from '@enso-ui/laravel-validation';
import RegisterForm from '~/components/auth/RegisterForm.vue';
// import Email from '~/components/auth/fields/Email.vue';
// import Password from '~/components/auth/fields/Password.vue';
// import Remember from '~/components/auth/fields/Remember.vue';

export default {
    layout: 'index',
    meta: {
        guestGuard: true,
        title: 'Register',
    },

    components: { RegisterForm },

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

            // setTimeout(() => {
            //     this.login();
            //     this.home(true);
            // }, 500);
            setTimeout(() => {
                // redirect({ name: 'verify' });
            this.$router.push('/verify');
            // this.login();
            // this.home(true);
            }, 500);
        },
    },
};
</script>
