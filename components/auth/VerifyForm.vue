<template>
  <div class="login">
    <div class="has-padding-medium">
      <h3
        class="
          title
          is-3
          has-text-black has-text-centered has-margin-bottom-medium
        "
      >
        <figure
          class="image logo is-clickable"
          @click="$router.push({ name: 'login' })"
        >
          <img src="~assets/images/logo1.svg" />
        </figure>
        <!-- {{ meta.appName }} -->
        <!-- <img src="~assets/images/logo1.svg" /> -->
      </h3>
      <div class="">
        <p class="t-center" v-if="!isSuccessful">Thank you for registering.</p>
        <p class="t-center" v-if="isSuccessful">Thank you for using Genealogia.</p>
        <p class="t-center">
          <NuxtLink to="/login"
            class="button
                  theme-button theme-button-xl
                  has-background-white
                  is-uppercase
                  has-text-weight-medium has-text-dark">
            {{ i18n("Log in") }}
        </NuxtLink>
        </p>
        
      </div>
      

      <!-- <nuxt-link :to="{ name: 'login' }" class="
                    button
                    theme-button theme-button-xl
                    has-background-white
                    is-uppercase
                    has-text-weight-medium has-text-dark">
        {{ i18n("Log in") }}
      </nuxt-link> -->
      <div class="is-clearfix" />
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { library } from "@fortawesome/fontawesome-svg-core";
  import {
    faEnvelope,
    faCheck,
    faExclamationTriangle,
    faLock,
    faUser,
  } from "@fortawesome/free-solid-svg-icons";
  import { focus } from "@enso-ui/directives";
  import Errors from "@enso-ui/laravel-validation";
  import RevealPassword from "@enso-ui/forms/src/bulma/parts/RevealPassword.vue";

  library.add([faEnvelope, faCheck, faExclamationTriangle, faLock, faUser]);

  export default {
    name: "VerifyForm",
    directives: { focus },
    inject: ["i18n", "route"],

    props: {
      action: {
        required: true,
        type: String,
      },
      isLogin: {
        default: false,
        type: Boolean,
      },
      isReset: {
        default: false,
        type: Boolean,
      },
      route: {
        required: true,
        type: String,
      },
    },

    data: () => ({
      errors: new Errors(),
      isSuccessful: false,
      loading: false,
    }),

    computed: {
      ...mapState(["meta"]),
      token() {
        return this.route.query.token;
      },

      postParams() {
        return this.verifyParams;
      },
      verifyParams() {
        const { token, loading } = this;
        return { token, loading };
      },
      verifyLink() {
        return "/api/verify";
      },
      resendLink() {
        return "/api/resend";
      },
    },
    mounted() {
      this.verify();
    },
    methods: {
      verify() {
        this.loading = true;
        this.isSuccessful = false;

        this.$axios
          .post(this.verifyLink, this.postParams)
          .then(({ data }) => {
            this.loading = false;
            this.isSuccessful = true;
            this.$emit("verified", data);
          })
          .catch((error) => {
            this.loading = false;
            const { status, data } = error.response;
            switch (status) {
              case 422:
                this.errors.set(data.errors);
                // go to email verify page
                break;
              case 429:
                this.$toastr.error(data.message);
                break;
              default:
                throw error;
            }
          });
      },
      resend() {
        this.loading = true;
        this.isSuccessful = false;

        this.$axios
          .post(this.resendLink, this.postParams)
          .then(({ data }) => {
            this.loading = false;
            this.isSuccessful = true;
            this.$emit("success", data);
          })
          .catch((error) => {
            this.loading = false;
            const { status, data } = error.response;
            switch (status) {
              case 422:
                this.errors.set(data.errors);
                // go to email verify page
                break;
              case 429:
                this.$toastr.error(data.message);
                break;
              default:
                throw error;
            }
          });
      },
    },
  };
</script>

<style lang="scss">
  .login {
    max-width: 400px;
    margin: auto;

    .is-spaced {
      margin-right: 1.6em;
    }

    figure.logo {
      display: inline-block;
    }
    .t-center {
      text-align: center;
    }
  }
</style>
