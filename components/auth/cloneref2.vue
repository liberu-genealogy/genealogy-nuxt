<template>
  <div class="container has-background-white auth is-fluid px-0">
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
                  mb-2
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

            <!-- Render with Slot  -->
            <img
              class="auth-img"
              src="~assets/images/mockup03@2x.webp"
              alt=""
            />
          </div>
        </div>
      </div>

      <!-- right column -->
      <div
        class="
          column
          is-6-tablet
          is-7-desktop
          is-7-widescreen
          is-7-fullhd
          is-gapless
          is-flex
          ai--c
        "
      >
        <div class="auth-form is-gapless">
          <div class="mb-5">
            <NuxtLink to="/" class="is-flex mb-2">
              <span
                class="is-capitalized is-size-6 has-text-weight-semibold"
                style="color: #4fcf8d !important"
                >back to home</span
              >
            </NuxtLink>
            <h1
              class="
                is-size-4 is-capitalized
                has-text-black has-text-weight-bold
              "
            >
              create your account
            </h1>
          </div>

          <div class="mb-5">
            <div class="columns">
              <div class="column">
                <div class="field">
                  <p class="control has-icons-left has-icons-right">
                    <input
                      class="input is-large"
                      type="text"
                      placeholder="First name"
                      :class="{
                        'is-danger': $v.registration.first_name.$error,
                      }"
                      v-model="registration.first_name"
                    />
                    <span class="icon is-small is-left">
                      <font-awesome-icon :icon="['fas', 'user']" />
                    </span>
                  </p>
                  <div v-if="$v.registration.first_name.$error">
                    <p
                      class="help"
                      :class="{
                        'is-danger': $v.registration.first_name.$error,
                      }"
                      v-if="!$v.registration.first_name.required"
                    >
                      Field is required
                    </p>
                    <p
                      class="help"
                      :class="{
                        'is-danger': $v.registration.first_name.$error,
                      }"
                      v-else-if="!$v.registration.first_name.minLength"
                    >
                      Minimum length is 3 characters
                    </p>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <p class="control has-icons-left has-icons-right">
                    <input
                      class="input is-large"
                      type="text"
                      :class="{
                        'is-danger': $v.registration.last_name.$error,
                      }"
                      placeholder="Last name"
                      v-model="registration.last_name"
                    />
                    <span class="icon is-small is-left">
                      <font-awesome-icon :icon="['fas', 'user']" />
                    </span>
                  </p>
                  <div v-if="$v.registration.last_name.$error">
                    <p
                      class="help"
                      :class="{
                        'is-danger': $v.registration.last_name.$error,
                      }"
                      v-if="!$v.registration.last_name.required"
                    >
                      Field is required
                    </p>
                    <p
                      class="help"
                      :class="{
                        'is-danger': $v.registration.last_name.$error,
                      }"
                      v-else-if="!$v.registration.last_name.minLength"
                    >
                      Minimum length is 3 characters
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { validationMixin } from "vuelidate";
  import {
    required,
    email,
    minLength,
    maxLength,
    sameAs,
  } from "vuelidate/lib/validators";
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

    validations: {
      registration: {
        first_name: {
          required,
          minLength: minLength(3),
        },
        last_name: {
          required,
          minLength: minLength(3),
        },
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(8),
        },
        password_confirmation: {
          required,
          minLength: minLength(8),
          sameAsPassword: sameAs("password"),
        },
        conditions_terms: {
          checked: (value) => value === true,
        },
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
        registration: {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password_confirmation: "",
          conditions_terms: false,
        },
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
        angelLeftIcon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="#4fcf8d" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
  </svg>

          `,
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
      async register() {
        this.$v.$touch();

        if (this.$v.$invalid) {
          console.log("fail");

          return -1;
        }

        try {
          this.isLoading = true;

          const response = await this.$axios.$post(
            "/api/register",
            this.registration
          );

          this.$router.push("/login");
          this.isLoading = false;
        } catch (error) {
          this.isLoading = false;
          this.error = true;
          this.message = error.response.data.message;
          this.errors = error.response.data.errors;
        }
      },
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
  .has-text-link {
    color: "4fcf8d" !important;
  }
</style>
