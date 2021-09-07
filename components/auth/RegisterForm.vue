<template>
  <div>
    <div class="container auth is-fluid px-0">
      <div class="columns is-multiline is-gapless">
        <div
          class="column is-6-tablet is-5-desktop is-5-widescreen is-5-fullhd"
        >
          <div class="auth has-background-primary">
            <div class="auth-content">
              <div class="has-text-centered">
                <NuxtLink to="/"
                  ><img src="~assets/images/logo1.svg" alt="" width="300px"
                /></NuxtLink>
              </div>
              <div class="auth-inner-content my-6">
                <div
                  class="
                    has-text-white has-text-weight-regular
                    is-flex
                    ai--fs
                    mb-5
                  "
                >
                  <img
                    src="~assets/images/bcheckmark.webp"
                    alt=""
                    class="bullet mt-1 mr-3"
                  />
                  Family Tree 365 is a secure online website which you can use
                  to create your own family tree(s) with.
                </div>
                <div
                  class="
                    has-text-white has-text-weight-regular
                    is-flex
                    ai--fs
                    mb-5
                  "
                >
                  <img
                    src="~assets/images/bcheckmark.webp"
                    alt=""
                    class="bullet mt-1 mr-3"
                  />
                  It has a tree viewer and DNA support more features are planned
                  such as the inclusion of archive databases and collections
                </div>
                <div
                  class="has-text-white has-text-weight-regular is-flex ai--fs"
                >
                  <img
                    src="~assets/images/bcheckmark.webp"
                    alt=""
                    class="bullet mt-1 mr-3"
                  />
                  Set up your first family tree free of charge. We offer
                  different pricing levels with optional subscriptions if you
                  need to create extra trees.
                </div>
              </div>
              <img
                class="auth-img"
                src="~assets/images/mockup03@2x.webp"
                alt=""
              />
            </div>
          </div>
        </div>
        <form
          @submit.prevent="submit()"
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
              <NuxtLink
                to="/"
                class="
                  is-size-6 is-flex
                  has-text-link has-text-weight-medium
                  mb-2
                "
              >
                <font-awesome-icon
                  :icon="['fas', 'angle-left']"
                  class="mt-1 mr-2"
                />Back to Home</NuxtLink
              >
              <h1 class="is-size-4 has-text-black has-text-weight-bold">
                Create your account
              </h1>
            </div>
            <div v-if="error" class="notification is-danger">
              {{ message }}
            </div>
            <!-- <div v-for="error in errors" class="notification is-danger">
              {{ error[0] }}
            </div> -->
            <div class="mb-5">
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        class="input is-large"
                        type="text"
                        placeholder="First name"
                        v-model="registration.first_name"
                      />
                    </p>
                    <!-- <div v-if="$v.registration.first_name.$error">
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
                    </div> -->
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        class="input is-large"
                        type="text"
                        placeholder="Last name"
                        v-model="registration.last_name"
                      />
                      <span class="icon is-small is-left">
                        <font-awesome-icon :icon="['fas', 'user']" />
                      </span>
                    </p>
                    <!-- <div v-if="$v.registration.last_name.$error">
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
                    </div> -->
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-5">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input
                    class="input is-large"
                    type="text"
                    placeholder="Email address"
                    v-model="registration.email"
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon :icon="['fas', 'envelope']" />
                  </span>
                </p>
                <!-- <div v-if="$v.registration.email.$error">
                  <p class="help" v-if="!$v.registration.email.required">
                    Field is required
                  </p>
                  <p class="help" v-if="!$v.registration.email.email">
                    Please enter a valid email address
                  </p>
                </div> -->
              </div>
            </div>
            <div class="mb-5">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input
                    class="input is-large"
                    type="password"
                    placeholder="Password"
                    v-model="registration.password"
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon :icon="['fas', 'lock']" />
                  </span>
                </p>
                <!-- <div v-if="$v.registration.password.$error">
                  <p
                    class="help"
                    :class="{ 'is-danger': $v.registration.password.$error }"
                    v-if="!$v.registration.password.required"
                  >
                    Field is required
                  </p>
                  <p
                    class="help"
                    :class="{ 'is-danger': $v.registration.password.$error }"
                    v-else-if="!$v.registration.password.minLength"
                  >
                    Minimum length is 8 characters
                  </p>
                </div> -->
              </div>
            </div>
            <div class="mb-5">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input
                    class="input is-large"
                    type="password"
                    placeholder="Confirm Password"
                    v-model="registration.password_confirmation"
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon :icon="['fas', 'lock']" />
                  </span>
                </p>
                <!-- <div v-if="$v.registration.password_confirmation.$error">
                  <p
                    class="help"
                    :class="{
                      'is-danger': $v.registration.password_confirmation.$error,
                    }"
                    v-if="!$v.registration.password_confirmation.required"
                  >
                    Field is required
                  </p>
                  <p
                    class="help"
                    :class="{
                      'is-danger': $v.registration.password_confirmation.$error,
                    }"
                    v-else-if="!$v.registration.password_confirmation.minLength"
                  >
                    Minimum length is 8 characters
                  </p>
                  <p
                    class="help"
                    :class="{
                      'is-danger': $v.registration.password_confirmation.$error,
                    }"
                    v-else-if="!$v.registration.password_confirmation.sameAs"
                  >
                    Password must match
                  </p>
                </div> -->
              </div>
            </div>
            <div class="mb-5">
              <div class="columns is-mobile is-gapless">
                <div class="column">
                  <label class="checkbox">
                    <input
                      type="checkbox"
                      v-model="registration.conditions_terms"
                    />
                    Agree to
                    <NuxtLink
                      to="/termsandconditions"
                      class="has-text-link has-text-weight-medium"
                      >terms and conditions</NuxtLink
                    >
                  </label>
                  <!-- <div v-if="$v.registration.conditions_terms.$error">
                    <p
                      class="help"
                      :class="{
                        'is-danger': $v.registration.conditions_terms.$error,
                      }"
                      v-if="!$v.registration.conditions_terms.checked"
                    >
                      Field is required
                    </p>
                  </div> -->
                </div>
              </div>
            </div>
            <div class="mb-6">
              <button
                class="
                  button
                  theme-button theme-button-xl
                  has-background-primary
                  is-uppercase
                  has-text-weight-medium has-text-white
                "
              >
                register
              </button>
            </div>
            <div>
              <p
                class="
                  is-size-6
                  has-text-dark has-text-centered has-text-weight-regular
                "
              >
                Already have an account?<NuxtLink
                  to="/login"
                  class="has-text-link has-text-weight-medium"
                >
                  Sign in
                </NuxtLink>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    required,
    email,
    minLength,
    maxLength,
    sameAs,
  } from "vuelidate/lib/validators";

  import { library } from "@fortawesome/fontawesome-svg-core";

  import {
    faEnvelope,
    faCheck,
    faExclamationTriangle,
    faLock,
    faUser,
  } from "@fortawesome/free-solid-svg-icons";

  library.add([faEnvelope, faCheck, faExclamationTriangle, faLock, faUser]);

  import "vue-loading-overlay/dist/vue-loading.css";
  export default {
    middleware: "guest",

    data() {
      return {
        error: false,
        message: "",
        errors: null,
        isLoading: false,
        fullPage: true,
        color: "#4fcf8d",
        backgroundColor: "#ffffff",
        registration: {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password_confirmation: "",
          conditions_terms: false,
        },
      };
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
    methods: {
      submit() {
        this.loading = true;
        this.isSuccessful = false;

        this.$axios
          .$post(`${process.env.BASE_URL}/register`, this.registration)
          .then(({ data }) => {
            this.loading = false;
            this.isSuccessful = true;
            // this.$emit("success", data);
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
      // async register() {
      //   this.$v.$touch();

      //   if (this.$v.$invalid) {
      //     console.log("fail");

      //     return -1;
      //   }

      //   try {
      //     this.isLoading = true;

      //     const response = await this.$axios.$post(
      //       "/api/register",
      //       this.registration
      //     );

      //     this.$router.push("/login");
      //     this.isLoading = false;
      //   } catch (error) {
      //     this.isLoading = false;
      //     this.error = true;
      //     this.message = error.response.data.message;
      //     this.errors = error.response.data.errors;
      //   }
      // },
    },
  };
</script>

<style scoped>
  @import "~/assets/css/base.css";
</style>
