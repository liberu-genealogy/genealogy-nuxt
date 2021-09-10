<template>
  <register-form action="Register" route="register" @success="init" />
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  import RegisterForm from "~/components/auth/RegisterForm.vue";

  export default {
    name: "Register",
    meta: {
      guestGuard: true,
    },
    components: { RegisterForm },
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
          this.$router.push({ name: "verify" });
          // this.login();
          // this.home(true);
        }, 500);
      },
    },
  };
</script>
