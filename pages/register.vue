<template>
    <register-form action="Register" route="register" @success="init"></register-form>
</template>

<script setup>
import { mapState, mapGetters, mapMutations } from 'vuex';
// import Errors from "@enso-ui/laravel-validation/src/Errors";
import RegisterForm from '~/components/auth/RegisterForm.vue';
// import Email from '~/components/auth/fields/Email.vue';
// import Password from '~/components/auth/fields/Password.vue';
// import Remember from '~/components/auth/fields/Remember.vue';


    meta: {
        guestGuard: true;
        title: 'Register';
    };

    components: { RegisterForm };

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
    login() {
      store.commit('auth/login');
    },
  };

  const layoutMutations = {
    home() {
      store.commit('layout/home');
    },
  };

  const rootMutations = {
    setShowQuote(value) {
      store.commit('setShowQuote', value);
    },
    setCsrfToken(token) {
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
              if(data.plan_id != ''){
                this.$router.push({
                  path: '/planDetail?price=' + data.plan_id + '&id=' + data.id,
                  params: {
                    price: data.plan_id,
                    id: data.id
                  }
                });
              }else{
                this.$router.push('/verify');
              }

            }, 500);
        };
    };
</script>
