<template>
  <verify-form action="Resend" @verified="init" />
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  import VerifyForm from "~/components/auth/VerifyForm.vue";
  import { ref, computed, useStore} from 'vue';

    export default {
      name: "Verify",
      meta: {
        guestGuard: true
      },
      components: { VerifyForm },
      setup () {
        const store = useStore()
        return {
          two: computed(() => store.state[meta]),
          ...mapMutations("auth", ["login"]),
          ...mapMutations("layout", ["home"]),
          ...mapMutations(["setShowQuote", "setCsrfToken"]),
        }
        function init(data) {
          this.setShowQuote(this.meta.showQuote);
          this.setCsrfToken(data.csrfToken);
          setTimeout(() => {
            this.login();
            this.home(true);
          }, 3000);
        }
      }
    }

</script>
