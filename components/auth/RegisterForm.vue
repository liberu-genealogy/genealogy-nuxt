<template>
  <AuthIndex>
    <template #form>
    
        <form
            @submit.prevent="onSubmit"
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
              {{ error }}
            </div>
            <div class="mb-5">
              <div class="columns">
                <div class="column">
                  <div class="field">
                    <ValidationProvider
                        name="First Name"
                        rules="required|min:3"
                        
                    >
                      <p class="control has-icons-left has-icons-right">
                        <input
                            class="input is-large"
                            type="text"
                            :class="{ 'is-danger': errors.first_name }"
                            placeholder="First name"
                           v-bind="first_name"
                        />
                      </p>
                      <p
                          v-if="errors.first_name"
                          class="has-text-danger p-2 is-size-7"
                          v-text="errors.first_name"
                      ></p>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <ValidationProvider
                        name="Last Name"
                      
                        rules="required|min:3"
                    >
                      <p class="control has-icons-left has-icons-right">
                        <input
                            class="input is-large"
                            type="text"
                            :class="{ 'is-danger': errors.last_name }"
                            placeholder="Last name"
                            v-bind="last_name"
                        />
                        <span class="icon is-small is-left">
                          <font-awesome-icon :icon="['fas', 'user']" />
                        </span>
                      </p>

                      <p
                          v-if="errors.last_name"
                          class="has-text-danger p-2 is-size-7"
                          v-text="errors.last_name"
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
                   
                    rules="required|email"
                >
                  <p class="control has-icons-left has-icons-right">
                    <input
                        class="input is-large"
                        type="text"
                        :class="{ 'is-danger': errors.email }"
                        placeholder="Email address"
                        v-bind="email"
                    />
                    <span class="icon is-small is-left">
                      <font-awesome-icon :icon="['fas', 'envelope']" />
                    </span>
                  </p>
                  <p
                      v-if="errors.email"
                      class="has-text-danger p-2 is-size-7"
                      v-text="errors.email"
                  ></p>
                </ValidationProvider>
              </div>
            </div>
            <div class="mb-5">
              <div class="field">
                <ValidationProvider
                   
                    name="Password"
                    vid="password"
                    rules="required|min:8"
                >
                  <p class="control has-icons-left has-icons-right">
                    <input
                        class="input is-large"
                        :class="{ 'is-danger': errors.password }"
                        type="password"
                        placeholder="Password"
                        v-bind="password"
                    />
                    <span class="icon is-small is-left">
                      <font-awesome-icon :icon="['fas', 'lock']" />
                    </span>
                  </p>
                  <p
                      v-if="errors.password"
                      class="has-text-danger p-2 is-size-7"
                      v-text="errors.password"
                  ></p>
                </ValidationProvider>
              </div>
            </div>
            <div class="mb-5">
              <div class="field">
                <ValidationProvider
                    name="Password Confirm"
                    rules="required|confirmed:password"
                   
                >
                  <p class="control has-icons-left has-icons-right">
                    <input
                        class="input is-large"
                        type="password"
                        :class="{ 'is-danger': errors.password_confirmation }"
                        placeholder="Confirm Password"
                        v-bind="password_confirmation" name="password_confirmation" rules="confirmed:@password"
                    />
                    <span class="icon is-small is-left">
                      <font-awesome-icon :icon="['fas', 'lock']" />
                    </span>
                  </p>

                  <p
                      v-if="errors.password_confirmation"
                      class="has-text-danger p-2 is-size-7"
                      v-text="errors.password_confirmation"
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
                     
                  >
                    <label class="checkbox">
                      <input type="checkbox" v-bind="terms" />
                      Agree to
                      <NuxtLink
                          to="/termsandconditions"
                          class="has-text-link has-text-weight-medium"
                      >terms and conditions</NuxtLink
                      >
                    </label>

                    <div v-if="errors.terms">
                      <p class="help has-text-danger" v-text="errors.terms"></p>
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
     
    </template>

    <template #footerImageForm>
      <img class="auth-img" src="~assets/images/mockup03@2x.webp" alt="" />
    </template>
  </AuthIndex>
</template>

<script setup>
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

import { useForm} from 'vee-validate';
import * as yup from 'yup';
library.add([faEnvelope, faCheck, faExclamationTriangle, faLock, faUser]);


  name: "RegisterForm";
  components: { AuthIndex };
  directives: { focus };
  // inject: {
  //   i18n: { from: "i18n" },
  // },
  // inject: ['errorHandler', 'route', 'routerErrorHandler', 'toastr'],

  const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: yup.object({
    first_name: yup.string().min(3).required(),
    last_name: yup.string().min(3).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required('Password is required'),
    password_confirmation: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match')
  }),
});

// Creates a submission handler
// It validate all fields and doesn't call your function unless all fields are valid
const first_name = defineInputBinds('first_name');
const last_name = defineInputBinds('last_name');
const email = defineInputBinds('email');
const password = defineInputBinds('password');
const password_confirmation = defineInputBinds('password_confirmation');
async function getToken() {
  const { data } = await useFetch('http://localhost:8000/sanctum/csrf-cookie', {
    method: 'GET',
    credentials:"include",
  });
  console.log(data,"cook")
  return data.token;
}

const token = useCookie('XSRF-TOKEN');
const onSubmit = handleSubmit(async (values) => {
  try {
   
    console.log('token',token)
    const { data, error } = await useFetch('http://localhost:8000/api/register', {
      method: 'POST',
      credentials:'include',
      query: {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        confirm:values.confirm,
      },
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': token.value
      },
    });

    if (error) {
      let errorMessage = 'Unknown error occurred during registration.';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error._defaultValue) {
        errorMessage = error._defaultValue.toString();
      }
      
      console.error('Error registering user:', errorMessage);
      return;
    }

    // Process the response data or handle success

    localStorage.setItem('token', data.token);
  } catch (error) {
    console.error('Error registering user:', error);
  }

   
});
  const props= {
    action: {
      required: true,
      type: String,
    },
    route: {
      required: true,
      type: String,
    },
  };
  function data (){
        // for plans
       const plans= [];
     const selected_plan= null;
      // for plans
      const first_name= "";
     const last_name= "";
      const email= "";
      // errors: new Errors(),
     const errors='';
     const errorInput= "";
     const message= "";
     const isSuccessful= false;
     const loading= false;
     const password= "";
     const passwordMeta= {
        content: "password",
      };
      const password_confirmation= null;
      const confirmationMeta= {
        content: "password",
      };
     const terms= "";
     const device_name= 'mac';
    }

  const computed = {
    ...mapState(["meta"]),
    hasPassword() {
      return this.password !== null && this.password.length;
    },
    match() {
      return this.hasPassword && this.password === this.password_confirmation;
    },
   
    registerParams() {
      const {
        email,
        password,
        first_name,
        last_name,
        selected_plan,
        password_confirmation,
      } = this;

      return {
        email,
        password,
        first_name,
        last_name,
        selected_plan: selected_plan.id,
        password_confirmation,
      };
    },
    registerLink() {
      return "api/register";
    },
  };

  // methods: {
    // #stripe(){
    //   // window.location.href='https://www.google.com/';
    //   this.$router.push({
    //     path: '/planDetail?name=price_1MHma5Hdo4UCTry3KigIkhrH',
    //     params: {
    //       name: 'price_1MHma5Hdo4UCTry3KigIkhrH',
    //     }
    //   });
    // },
    function getplans() {
  const { fetch } = useFetch();
  const { data, error } = fetch('/api/get-subscription-plan');

  if (error) {
    console.error('Error fetching subscription plans:', error);
    return;
  }

  const plans = data.map((plan) => {
    if (plan.nickname === 'free') {
      this.selected_plan = plan;
    }
    return plan;
  });

  this.plans = plans;
}
    function loginSocial(provider) {
      this.provider = provider;
      window.location.href = `${process.env.baseUrl}/api/login/${provider}`;
    };
    function submit() {

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
    };
  // };
  function created() {
    this.getplans();
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
