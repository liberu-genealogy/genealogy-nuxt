<template>

	<AuthIndex>
	<template #form>
				<form @submit.prevent="onSubmit" class="column is-6-tablet is-7-desktop is-7-widescreen is-7-fullhd is-gapless is-flex ai--c">
					<div class="auth-form is-gapless">
						<div>
							<div class="mb-5">
								<NuxtLink to="/" class="is-size-6 is-flex has-text-link has-text-weight-medium mb-2"> Back to Home </NuxtLink>
								<h1 class="is-size-4 has-text-black has-text-weight-bold">Sign in to your account</h1>
							</div>

							<template v-if="hasError">
								<div
									
									:key="index"
									class="notification is-danger"
								>
								
								</div>
							</template>

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
										  name="email"
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
								<div class="columns is-mobile is-gapless">
									<div class="column">
										<label class="checkbox">
											<input v-model="remember" class="mr-1" type="checkbox" />
											Remember me
										</label>
									</div>
									<div class="column has-text-right">
										<NuxtLink to="/forgot-password" class="has-text-link has-text-weight-medium"> Forgot password? </NuxtLink>
									</div>
								</div>
							</div>
							<div class="mb-6">
								<button class="button theme-button theme-button-xl has-background-primary is-uppercase has-text-weight-medium has-text-white">Login</button>
							</div>
							<div>
								<p class="is-size-6 has-text-dark has-text-centered has-text-weight-regular">
									Don't have an account?
									<NuxtLink to="/register" class="has-text-link has-text-weight-medium"> Register Now </NuxtLink>
								</p>
							</div>
						</div>
						<div class="divider">or</div>
						<a @click="loginSocial('google')" href="javascript:;" class="btn cnt-g">
							<img src="~assets/images/google.jpg" />
							Continue with google
						</a>
						<a @click="loginSocial('facebook')" href="javascript:;" class="btn cnt-g">
							<img src="~assets/images/facebook.png" />
							Continue with Facebook
						</a>
						<a @click="loginSocial('github')" href="javascript:;" class="btn cnt-g mb-5">
							<img src="~assets/images/github.png" />
							Continue with Github
						</a>
					</div>
				</form>
		</template>
		<template #footerImageForm>
			<img class="auth-img" src="~assets/images/mockup01@2x.webp" alt="" />
		</template>
	</AuthIndex>
</template>
<script setup>
import { ref } from 'vue';
import AuthIndex from "~/components/auth/Index.vue";
import { mapState, mapGetters } from "vuex";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faCheck, faExclamationTriangle, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { focus } from "@enso-ui/directives";
import { useForm } from 'vee-validate';
import * as yup from 'yup';

library.add([faEnvelope, faCheck, faExclamationTriangle, faLock, faUser]);
// const { errors } = 'required';

	
	const name= "LoginForm";
	const components= { AuthIndex };
	const directives= { focus };
	const isWebview = ref(false); 

	let loading = ref(false);
    let isSuccessful = ref(false);
    let hasError = ref(false);

	const { errors, handleSubmit, defineInputBinds } = useForm({
	validationSchema: yup.object({
		email: yup.string().email().required(),
		password: yup.string().min(6).required(),
	}),
	});
	const email = defineInputBinds('email');
const password = defineInputBinds('password');
// console.log(values.email,"ggh")

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
    const { data, error } = await useFetch('http://localhost:3000/api/login', {
      method: 'POST',
      credentials:'include',
      query: {
        email: values.email,
        password: values.password,
        
      },
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': token.value
      },
    });

    if (error) {
      let errorMessage = 'Unknown error occurred during login.';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error._defaultValue) {
        errorMessage = error._defaultValue.toString();
      }
      
      console.error('Error login user:', errorMessage);
      return;
    }

    // Process the response data or handle success

    localStorage.setItem('token', data.token);
  } catch (error) {
    console.error('Error registering user:', error);
  }

   
});

// console.log(values)
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

	


function  config() {
    return isWebview.value ? { headers: { isWebview: true } } : {};
  }
	const computed = {
		
  hasPassword() {
    return this.password !== null && this.password.length;
  },
  match() {
    return this.hasPassword && this.password === this.password_confirmation;
  },
  postParams() {
    return this.loginParams;
  },
  loginParams() {
    const { email, password, remember } = this;

    return {
      email,
      password,
      remember,
    };
  },
  loginLink() {
    return "api/login";
  },
 
};
	const methods = {
  validate() {
    this.$refs.email.validate().then((res) => {
      console.log(res.valid);
    });
  },

  loginSocial(provider) {
    this.provider = provider;
    window.location.href = `${process.env.baseUrl}/api/login/${provider}`;
  },


};


function openWindow(url, title, options = {}) {
	if (typeof url === "object") {
		options = url;
		url = "";
	}
	options = {
		url,
		title,
		width: 600,
		height: 720,
		...options,
	};
	const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left;
	const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top;
	const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width;
	const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height;
	options.left = width / 2 - options.width / 2 + dualScreenLeft;
	options.top = height / 2 - options.height / 2 + dualScreenTop;
	const optionsStr = Object.keys(options)
		.reduce((acc, key) => {
			acc.push(`${key}=${options[key]}`);
			return acc;
		}, [])
		.join(",");
	const newWindow = window.open(url, title, optionsStr);
	if (window.focus) {
		newWindow.focus();
	}
	// console.log(newWindow);
	return newWindow;
}
</script>

<style scoped>
@import "~/assets/css/base.css";
</style>
