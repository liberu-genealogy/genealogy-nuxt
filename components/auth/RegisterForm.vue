<template>
  <div class="container auth is-fluid px-0">
    <div class="columns is-multiline is-gapless">
      <!-- left column -->
      <div class="column is-6-tablet is-5-desktop is-5-widescreen is-5-fullhd">
        <div class="auth has-background-primary">
          <div class="auth-content">
            <div class="has-text-centered">
              <NuxtLink to="/">
                <img src="~assets/images/logo1.svg" alt="" width="300px" />
              </NuxtLink>
            </div>
            <div class="auth-inner-content my-6">
              <div
                class="
                  has-text-white has-text-weight-regular
                  is-flex
                  ai--fs
                  mb-5
                "
                v-for="(dataText, index) in rightText"
                :key="index"
              >
                <img
                  :src="require('~/assets/images/bcheckmark.webp')"
                  alt=""
                  class="bullet mt-1 mr-3"
                />
                {{ dataText.text }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- right column -->
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
    name: "RegisterForm",
    components: { RevealPassword },
    directives: { focus },

    props: {
      action: {
        required: true,
        type: String,
      },
      route: {
        required: true,
        type: String,
      },
    },
    data() {
      return {
        first_name: "",
        last_name: "",
        email: "",
        errors: new Errors(),
        isSuccessful: false,
        loading: false,
        password: "",
        passwordMeta: {
          content: "password",
        },
        password_confirmation: null,
        confirmationMeta: {
          content: "password",
        },
        terms: "true",
        rightText: [
          {
            text: "Family Tree 365 is a secure online website which you can use to create your own family tree(s) with.",
          },
          {
            text: "It has a tree viewer and DNA support more features are planned such as the inclusion of archive databases and collections",
          },
          {
            text: "Set up your first family tree free of charge. We offer different pricing levels with optional subscriptions if you need to create extra trees.",
          },
        ],
      };
    },

    computed: {
      ...mapState(["meta"]),
      hasPassword() {
        return this.password !== null && this.password.length;
      },
      match() {
        return this.hasPassword && this.password === this.password_confirmation;
      },
      postParams() {
        return this.registerParams;
      },
      registerParams() {
        const {
          email,
          password,
          first_name,
          last_name,
          password_confirmation,
        } = this;

        return {
          email,
          password,
          first_name,
          last_name,
          password_confirmation,
        };
      },
      registerLink() {
        return "/api/register";
      },
    },

    methods: {
      submit() {
        this.loading = true;
        this.isSuccessful = false;
        axios
          .post(this.registerLink, this.postParams)
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
  }
</style>
