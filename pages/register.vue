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
            setTimeout(() => {
              if(data.plan_id != ''){
                this.$router.push({
                  path: '/planDetail?price=' + data.plan_id + '&id=' + data.id,
                  params: {
                    price: data.plan_id,
                    id: data.id
                  }
                });
              }else{
                this.$router.push('/login');
              }

            }, 500);
        },
    },
};
</script>
