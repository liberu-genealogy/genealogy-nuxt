<template>
	<AuthIndex>
		<template #form>
			<auth-form action="Set a new password" endpoint="password.reset" icon="lock" :payload="payload" @success="success" @submitting="status = null">
				<template #header>
					<NuxtLink to="/" class="is-size-6 is-flex has-text-link has-text-weight-medium mb-2"> Back to Home</NuxtLink>
					<h1 class="is-size-4 has-text-black has-text-weight-bold">Reset password</h1>
					<!-- <p class="my-3">Enter the email associated with your account and we'll send an email with instructions to reset your password</p> -->
				</template>
				<p class="has-text-success is-size-7" v-if="status">
					{{ status }}
				</p>
				<email v-model="payload.email" />
				<password v-model="payload.password" autocomplete="off" />
				<p class="help">
					<password-strength :password="payload.password" />
				</p>
				<confirmation v-model="payload.password_confirmation" :match="match" />
			</auth-form>
		</template>
      <template #footerImageForm>
			<img class="auth-img" src="~assets/images/mockup01@2x.webp" alt="" />
		</template>
	</AuthIndex>
</template>
<router>
{
    name: 'password.reset',
}
</router>
<script>
import AuthIndex from "~/components/auth/Index.vue";
import AuthForm from "~/components/auth/AuthForm.vue";
import PasswordStrength from "~/components/auth/PasswordStrength.vue";
import Email from "~/components/auth/fields/Email.vue";
import Password from "~/components/auth/fields/Password.vue";
import Confirmation from "~/components/auth/fields/Confirmation.vue";

export default {
	// head: {
	//     title: 'Reset Password'
	// },
	meta: {
		guestGuard: true,
		title: "Reset Password",
	},

	components: { AuthForm, Email, PasswordStrength, Password, Confirmation, AuthIndex },

	inject: ["routerErrorHandler"],

	data: (v) => ({
		payload: {
			email: v.$route.query.email || "",
			password: "",
			password_confirmation: "",
			token: v.$route.query.token || v.$route.params.token,
		},
		status: null,
	}),

	computed: {
		match() {
			const { password, password_confirmation } = this.payload;

			return password.length > 0 && password === password_confirmation;
		},
	},

	methods: {
		success({ status }) {
			this.status = status;
			setTimeout(() => this.$router.push({ name: "login" }).catch(this.routerErrorHandler), 500);
		},
	},
};
</script>
