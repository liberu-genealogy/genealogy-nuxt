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

<script setup>
import { useStore } from 'vuex';
// import Errors from '@enso-ui/laravel-validation/src/Errors';
import LoginForm from '~/components/auth/LoginForm.vue';
// import Email from '~/components/auth/fields/Email.vue';
// import Password from '~/components/auth/fields/Password.vue';
// import Remember from '~/components/auth/fields/Remember.vue';

name:'login';
    layout: 'index';
    meta: {
        guestGuard: true;
        title: 'Login';
    };

    components: { LoginForm };

    data: () => ({
        // errors: new Errors(),
        errors:'',
        payload: {
            email: '',
            password: '',
            remember: false,
        }
    });

  const computed = {
  ...mapState(['meta']),
  ...mapGetters(['isWebview']),
};

    methods: {
     function useMutations() {
  const store = useStore();

  const authMutations = {
    login: () => {
      store.commit('auth/login');
    },
  };

  const layoutMutations = {
    home: () => {
      store.commit('layout/home');
    },
  };

  const rootMutations = {
    setShowQuote: (value) => {
      store.commit('setShowQuote', value);
    },
    setCsrfToken: (token) => {
      store.commit('setCsrfToken', token);
    },
  };

  return {
    ...authMutations,
    ...layoutMutations,
    ...rootMutations,
  };
}
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
        };
    };
</script>
