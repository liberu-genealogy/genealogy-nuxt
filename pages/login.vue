<template>
  <login-form action="Login" route="login" @success="init" />
  <!-- <auth-form
    action="Login"
    icon="user"
    endpoint="login"
    :payload="payload"
    @success="init"
  >
    <email v-model="payload.email" />
    <password v-model="payload.password" />
    <remember v-model="payload.remember" v-if="!isWebview" />
    <template v-slot:footer>
      <nuxt-link class="is-pulled-right" :to="{ name: 'password.email' }">
        {{ "Forgot password" }}
      </nuxt-link>
      <div class="is-clearfix" />
    </template>
  </auth-form> -->
</template>

<script>
  import { mapState, mapGetters, mapMutations } from "vuex";
  import Errors from "@enso-ui/laravel-validation";
  import LoginForm from "~/components/auth/LoginForm.vue";
  // import AuthForm from "~/components/auth/AuthForm.vue";
  // import Email from "~/components/auth/fields/Email.vue";
  // import Password from "~/components/auth/fields/Password.vue";
  import Remember from "~/components/auth/fields/Remember.vue";
  import LoginRegister from "~/components/loginregister/index.vue";

  export default {
    name: "login",

    meta: {
      guestGuard: true,
      title: "Login",
    },

    components: { LoginRegister, LoginForm },

    // data: () => ({
    //   errors: new Errors(),
    //   payload: {
    //     email: "",
    //     password: "",
    //     remember: false,
    //   },
    //   provider: null,
    //   email: "",
    //   password: "",
    //   remember: false,
    // }),

    // watch: {
    //   remember(value) {
    //     console.log(value);
    //   },
    // },

    computed: {
      ...mapState(["meta"]),
      ...mapGetters(["isWebview"]),
    },

    methods: {
      ...mapMutations("auth", ["login"]),
      ...mapMutations("layout", ["home"]),
      ...mapMutations(["setShowQuote", "setCsrfToken"]),
      init(data) {
        this.setShowQuote(this.meta.showQuote);
        if (data.csrfToken) {
          this.setCsrfToken({ token: data.csrfToken, $axios: this.$axios });
        }

        setTimeout(() => {
          this.login();
          this.home(true);
        }, 500);
      },
    },
  };
</script>
<style>
  @import "~/assets/css/bulma.css";
  @import "~/assets/css/fontawesome.min.css";
  .auth-form .cnt-g {
    width: 100%;
    border: 1px solid #e4e4e4;
    border-radius: 3px;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    margin-top: 13px;
    color: #707070;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
    box-shadow: none !important;
    text-align: center;
    cursor: pointer;
  }

  .auth-form .cnt-g img {
    max-height: 20px;
    float: left;
    margin-top: 15px;
  }

  .auth-form .divider {
    text-align: center;
    position: relative;
    margin-top: 20px;
    line-height: 1;
    color: #4f4e60;
    font-size: 10px;
    text-transform: uppercase;
  }

  .auth-form .divider:before,
  .auth-form .divider:after {
    content: "";
    position: absolute;
    top: 3px;
    width: 47%;
    height: 1px;
    background-color: #e4e4e4;
  }

  .auth-form .divider:before {
    left: 0;
  }

  .auth-form .divider:after {
    right: 0;
  }
</style>
