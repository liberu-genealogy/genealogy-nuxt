<template>
	<AuthIndex>
		<template #form>
			<auth-form action="Reset password" endpoint="password.email" icon="paper-plane" :payload="payload" @success="status = $event.status" @submitting="status = null">
				<template #header>
					<NuxtLink to="/login" class="is-size-6 is-flex has-text-link has-text-weight-medium mb-2"> Back to Login </NuxtLink>
					<h1 class="is-size-4 has-text-black has-text-weight-bold">Forgot password?</h1>
					<p class="my-3">Enter the email associated with your account and we'll send an email with instructions to reset your password</p>
				</template>
				<div class="mb-5 mt-4 pt-4">
					<div class="field">
						<p class="has-text-success is-size-7" v-if="status">
							{{ status }}
						</p>
						<email v-model="payload.email" />
					</div>
				</div>
			</auth-form>
		</template>
		<template #footerImageForm>
			<img class="auth-img" src="~assets/images/mockup01@2x.webp" alt="" />
		</template>
	</AuthIndex>
</template>
<router>
{
    name: 'password.email'
}
</router>

<script>
import AuthIndex from "~/components/auth/Index.vue";
import AuthForm from "~/components/auth/AuthForm.vue";
import Email from "~/components/auth/fields/Email.vue";

export default {
	meta: {
		guestGuard: true,
		title: "Email Reset Link",
	},
	components: { AuthForm, Email, AuthIndex },

	data: () => ({
		payload: {
			email: "",
		},
		status: null,
	}),
};
</script>
