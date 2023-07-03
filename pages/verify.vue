<template>
  <verify-form action="Resend" @verified="init" />
</template>

<script setup>
  import { useStore } from "vuex";
  import VerifyForm from "~/components/auth/VerifyForm.vue";

  
    name: "Verify";
    meta: {
      guestGuard: true;
    };
    components: { VerifyForm };

   const computed = {
      ...mapState(["meta"]),
    };

    methods: {
     function useMutations() {
  const store = useStore();

  const authMutations = {
    login: (payload) => {
      store.commit('auth/login', payload);
    },
  };

  const layoutMutations = {
    home: (payload) => {
      store.commit('layout/home', payload);
    },
  };

  const generalMutations = {
    setShowQuote: (payload) => {
      store.commit('setShowQuote', payload);
    },
    setCsrfToken: (payload) => {
      store.commit('setCsrfToken', payload);
    },
  };

  return {
    ...authMutations,
    ...layoutMutations,
    ...generalMutations,
  };
}

     function init(data) {
        this.setShowQuote(this.meta.showQuote);
        this.setCsrfToken(data.csrfToken);
        setTimeout(() => {
          this.login();
          this.home(true);
        }, 3000);
      }; 45
    };
</script>
