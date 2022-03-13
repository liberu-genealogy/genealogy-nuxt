<template>
  <verify-form action="Resend" @verified="init" />
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  import VerifyForm from "~/components/auth/VerifyForm.vue";

  export default {
    name: "Verify",
    meta: {
      guestGuard: true,
    },
    components: { VerifyForm },

    computed: {
      ...mapState(["meta"]),
    },

    methods: {
      ...mapMutations("auth", ["login"]),
      ...mapMutations("layout", ["home"]),
      ...mapMutations(["setShowQuote", "setCsrfToken"]),
      init(data) {
        this.setShowQuote(this.meta.showQuote);
        this.setCsrfToken(data.csrfToken);
        setTimeout(() => {
          this.login();
          this.home(true);
        }, 3000);
      },
    },
  };
</script>
