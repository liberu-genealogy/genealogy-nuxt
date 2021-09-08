<template>
  <LoginRegister>
    <template #form>
      <div
        class="
          column
          is-6-tablet is-7-desktop is-7-widescreen is-7-fullhd is-gapless
        "
      >
        <div class="auth-form is-gapless">
          <div>
            <div class="mb-5">
              <NuxtLink
                to="/"
                class="
                  is-size-6 is-flex
                  has-text-link has-text-weight-medium
                  mb-2
                "
              >
                Back to Home
              </NuxtLink>
              <h1 class="is-size-4 has-text-black has-text-weight-bold">
                Sign in to your account
              </h1>
            </div>

            <!-- <div
              v-for="(error, index) in errors"
              :key="index"
              class="notification is-danger"
            >
              {{ error[0] }}
            </div> -->

            <div class="mb-5">
              <div class="field">
                <ValidationProvider
                  name="Email"
                  ref="email"
                  rules="required|email"
                  v-slot="{ errors }"
                >
                  <p class="control has-icons-left has-icons-right">
                    <input
                      class="input"
                      :class="{ 'is-danger': errors[0] }"
                      type="email"
                      placeholder="Email address"
                      v-model="payload.email"
                    />
                  </p>

                  <p
                    v-if="errors[0]"
                    class="has-text-danger p-2"
                    v-text="errors[0]"
                  ></p>
                </ValidationProvider>
              </div>
            </div>
            <div class="mb-5">
              <div class="field">
                <ValidationProvider
                  name="Password"
                  ref="password"
                  v-slot="{ errors }"
                  rules="required"
                >
                  <p class="control has-icons-left has-icons-right">
                    <input
                      class="input"
                      :class="{ 'is-danger': errors[0] }"
                      type="password"
                      placeholder="Password"
                      v-model="payload.password"
                    />
                  </p>

                  <p
                    v-if="errors[0]"
                    class="has-text-danger p-2"
                    v-text="errors[0]"
                  ></p>
                </ValidationProvider>
              </div>
            </div>
            <div class="mb-5">
              <div class="columns is-mobile is-gapless">
                <div class="column">
                  <label class="checkbox">
                    <input
                      v-model="payload.remember"
                      class="mr-1"
                      type="checkbox"
                    />
                    Remember me
                  </label>
                </div>
                <div class="column has-text-right">
                  <NuxtLink
                    to="/forgotpassword"
                    class="has-text-link has-text-weight-medium"
                  >
                    Forgot password?
                  </NuxtLink>
                </div>
              </div>
            </div>
            <div class="mb-6">
              <button
                @click="login"
                class="
                  button
                  theme-button theme-button-xl
                  has-background-primary
                  is-uppercase
                  has-text-weight-medium has-text-white
                "
              >
                Login
              </button>
            </div>
            <div>
              <p
                class="
                  is-size-6
                  has-text-dark has-text-centered has-text-weight-regular
                "
              >
                Don't have an account?
                <NuxtLink
                  to="/register"
                  class="has-text-link has-text-weight-medium"
                >
                  Register Now
                </NuxtLink>
              </p>
            </div>
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
            <img src="~assets/images/enso-favicon.png" />
            Continue with Github
          </a>
        </div>
      </div>
    </template>

    <template #footerImageForm>
      <img class="auth-img" src="~assets/images/mockup01@2x.webp" alt="" />
    </template>
  </LoginRegister>
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
  import AuthForm from "~/components/auth/AuthForm.vue";
  import Email from "~/components/auth/fields/Email.vue";
  import Password from "~/components/auth/fields/Password.vue";
  import Remember from "~/components/auth/fields/Remember.vue";
  import LoginRegister from "~/components/loginregister/index.vue";

  export default {
    name: "login",

    meta: {
      guestGuard: true,
      title: "Login",
    },

    components: { AuthForm, Email, Password, Remember, LoginRegister },

    data: () => ({
      errors: new Errors(),
      payload: {
        email: "",
        password: "",
        remember: false,
      },
      provider: null,
      email: "",
      password: "",
      remember: false,
    }),

    watch: {
      remember(value) {
        console.log(value);
      },
    },

    computed: {
      ...mapState(["meta"]),
      ...mapGetters(["isWebview"]),
    },

    methods: {
      validate() {
        this.$refs.email.validate().then((res) => {
          console.log(res.valid);
        });
      },

      loginSocial(provider) {
        this.provider = provider;
        //const newWindow = openWindow("", "message");

        let url = "/api/login/" + provider;
        this.$axios
          .get(url)
          .then((res) => {
            console.log(res);
            newWindow.location.href = res.data;
            //window.location.href = url;
          })
          .catch((err) => {
            console.log(err);
          });
      },

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
