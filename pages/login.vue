<template>
    <login-form action="Login" route="login" @success="init" />
</template>

<script>
    // import { mapState, mapGetters, mapMutations } from 'vuex';
    // import Errors from '@enso-ui/laravel-validation';
    import LoginForm from '~/components/auth/LoginForm.vue';
    // import { ref, computed, useStore, watch } from 'vue';

    export default {
        // layout: 'index',
        meta: {
            guestGuard: true,
            title: 'Login',
        },
        components: { LoginForm },

        setup() {
            // const errors = new Errors();
            // const payload = [
            //     email = ref(''),
            //     password = ref(''),
            //     remember = ref('false')
            // ];
            // // const store = useStore();
            // return {
            //     one: computed(() => store.getters['$isWebview']),
            //     two: computed(() => store.state[meta])
            // };

            // return{
            //     ...mapMutations('auth', ['login']),
            //     ...mapMutations('layout', ['home']),
            //     ...mapMutations(['setShowQuote', 'setCsrfToken']),
            // };

            // function init(data) {
            //     this.setShowQuote(this.meta.showQuote);
            //     if (data.csrfToken) {
            //         this.setCsrfToken({token: data.csrfToken, $axios: this.$axios});
            //     }

            //     setTimeout(() => {
            //         this.$router.push('/dashboard');
            //         this.login();
            //         this.home(true);
            //     }, 500);
            // }
        }
    }

</script>
