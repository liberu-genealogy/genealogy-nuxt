<template>
  <AuthIndex>
    <template #form>
      <ValidationObserver slim v-slot="{ handleSubmit }">
        <form
          @submit.prevent="handleSubmit(submit)"
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
            <div v-if="message" class="notification is-danger">
              {{ message }}
            </div>
            <div
              v-for="(error, index) in errorInput"
              :key="index"
              class="notification is-danger"
            >
              {{ error[0] }}
            </div>
            <div class="mb-5">
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <ValidationProvider
                      name="First Name"
                      rules="required|min:3"
                      v-slot="{ errors }"
                    >
                      <p class="control has-icons-left has-icons-right">
                        <input
                          class="input is-large"
                          type="text"
                          :class="{ 'is-danger': errors[0] }"
                          placeholder="First name"
                          v-model="first_name"
                        />
                      </p>
                      <p
                        v-if="errors[0]"
                        class="has-text-danger p-2 is-size-7"
                        v-text="errors[0]"
                      ></p>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <ValidationProvider
                      name="Last Name"
                      v-slot="{ errors }"
                      rules="required|min:3"
                    >
                      <p class="control has-icons-left has-icons-right">
                        <input
                          class="input is-large"
                          type="text"
                          :class="{ 'is-danger': errors[0] }"
                          placeholder="Last name"
                          v-model="last_name"
                        />
                        <span class="icon is-small is-left">
                          <font-awesome-icon :icon="['fas', 'user']" />
                        </span>
                      </p>

                      <p
                        v-if="errors[0]"
                        class="has-text-danger p-2 is-size-7"
                        v-text="errors[0]"
                      ></p>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-5">
              <div class="field">
                <ValidationProvider
                  name="Email"
                  v-slot="{ errors }"
                  rules="required|email"
                >
                  <p class="control has-icons-left has-icons-right">
                    <input
                      class="input is-large"
                      type="text"
                      :class="{ 'is-danger': errors[0] }"
                      placeholder="Email address"
                      v-model="email"
                    />
                    <span class="icon is-small is-left">
                      <font-awesome-icon :icon="['fas', 'envelope']" />
                    </span>
                  </p>
                  <p
                    v-if="errors[0]"
                    class="has-text-danger p-2 is-size-7"
                    v-text="errors[0]"
                  ></p>
                </ValidationProvider>
              </div>
            </div>
            <div class="mb-5">
              <div class="field">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required|min:8"
                >
                  <p class="control has-icons-left has-icons-right">
                    <input
                      class="input is-large"
                      :class="{ 'is-danger': errors[0] }"
                      type="password"
                      placeholder="Password"
                      v-model="password"
                    />
                    <span class="icon is-small is-left">
                      <font-awesome-icon :icon="['fas', 'lock']" />
                    </span>
                  </p>
                  <p
                    v-if="errors[0]"
                    class="has-text-danger p-2 is-size-7"
                    v-text="errors[0]"
                  ></p>
                </ValidationProvider>
              </div>
            </div>
            <div class="mb-5">
              <div class="field">
                <ValidationProvider
                  name="Password Confirm"
                  rules="required|confirmed:password"
                  v-slot="{ errors }"
                >
                  <p class="control has-icons-left has-icons-right">
                    <input
                      class="input is-large"
                      :type="passwordMeta.content"
                      :class="{ 'is-danger': errors[0] }"
                      placeholder="Confirm Password"
                      v-model="password_confirmation"
                    />
                    <span class="icon is-small is-left">
                      <font-awesome-icon :icon="['fas', 'lock']" />
                    </span>
                  </p>

                  <p
                    v-if="errors[0]"
                    class="has-text-danger p-2 is-size-7"
                    v-text="errors[0]"
                  ></p>
                </ValidationProvider>
              </div>
            </div>
            <div class="mb-5 px-1">
              <div class="columns is-mobile is-gapless">
                <div class="column">
                  <ValidationProvider
                    name="Terms And Conditions"
                    :rules="{ required: { allowFalse: false } }"
                    v-slot="{ errors }"
                  >
                    <label class="checkbox">
                      <input type="checkbox" v-model="terms" />
                      Agree to
                      <NuxtLink
                        to="/termsandconditions"
                        class="has-text-link has-text-weight-medium"
                        >terms and conditions</NuxtLink
                      >
                    </label>

                    <div v-if="errors[0]">
                      <p class="help has-text-danger" v-text="errors[0]"></p>
                    </div>
                  </ValidationProvider>
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
                Already have an account?
                <NuxtLink
                  to="/login"
                  class="has-text-link has-text-weight-medium"
                  v-text="'Sign in'"
                >
                </NuxtLink>
              </p>
            </div>
            <div class="divider">or</div>
            <a
                @click="loginSocial('google')"
                href="javascript:;"
                class="btn cnt-g"
            >
                <img src="~assets/images/google.jpg" />
                Continue with google
            </a>
            <a
                @click="loginSocial('facebook')"
                href="javascript:;"
                class="btn cnt-g"
            >
                <img src="~assets/images/facebook.png" />
                Continue with Facebook
            </a>
            <a
                @click="loginSocial('github')"
                href="javascript:;"
                class="btn cnt-g mb-5"
            >
                <img src="~assets/images/github.png" />
                Continue with Github
            </a>
          </div>
        </form>
      </ValidationObserver>
    </template>

    <template #footerImageForm>
      <img class="auth-img" src="~assets/images/mockup03@2x.webp" alt="" />
    </template>
  </AuthIndex>
</template>

<script>
  import AuthIndex from "~/components/auth/Index.vue";
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
    components: { AuthIndex },
    directives: { focus },
    // inject: {
    //   i18n: { from: "i18n" },
    // },

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

    data: () => ({
      first_name: "",
      last_name: "",
      email: "",
      // errors: new Errors(),
      errorInput: "",
      message: "",
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
      terms: "",
      device_name: 'mac',
    }),

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
        return "api/register";
      },
    },

    methods: {
      loginSocial(provider) {
        this.provider = provider;
        //const newWindow = openWindow("", "message");

        let url = "api/login/" + provider;
        this.$axios
          .get(url)
          .then((res) => {
            // console.log(res);
            // window.location.href = res.data;
            newWindow.location.href = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      submit() {
        this.loading = true;
        this.isSuccessful = false;
        let user = this.postParams;

        this.$axios
        .get('/sanctum/csrf-cookie').then(response =>{
          this.$axios
            .post(this.registerLink, user)
            .then(({ data }) => {
              this.loading = false;
              this.isSuccessful = true;
              this.$emit("success", data);
            })
            .catch((error) => {
              console.log(error);
              this.loading = false;
              const { status, data } = error.response;
              switch (status) {
                case 422:
                  this.errorInput = data.errors;
                  break;
                case 429:
                  // this.$toastr.error(data.message); // error Toastr can't displayed
                  this.message = data.message;
                  break;
                case 500:
                  this.message = data.message;
                  this.$forceUpdate();
                  break;
                default:
                  throw error;
              }
            });
          })
      },
    },
  };

  function openWindow(url, title, options = {}) {
    if (typeof url === 'object') {
        options = url
        url = ''
    }
    options = {
        url,
        title,
        width: 600,
        height: 720,
        ...options
    }
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top
    const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width
    const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height
    options.left = ((width / 2) - (options.width / 2)) + dualScreenLeft
    options.top = ((height / 2) - (options.height / 2)) + dualScreenTop
    const optionsStr = Object.keys(options).reduce((acc, key) => {
        acc.push(`${key}=${options[key]}`)
        return acc
    }, []).join(',')
    const newWindow = window.open(url, title, optionsStr)
    if (window.focus) {
        newWindow.focus()
    }
    // console.log(newWindow);
    return newWindow
}
</script>

<style scoped>
@import '~/assets/css/base.css';
</style>
