<template>
	<form class="column is-6-tablet is-7-desktop is-7-widescreen is-7-fullhd is-gapless is-flex ai--c" @submit.prevent="submit()">
		<div class="auth-form is-gapless is-justify-content-flex-start">
			<div>
				<div class="mb-5">
					<slot name="header"></slot>
				</div>
				<slot />

				<div class="mb-6">
					<submit v-bind="$attrs" v-on="$listeners" />
				</div>
			</div>
		</div>
		<slot name="footer"></slot>
	</form>
</template>

<script>
import { mapState } from "vuex";
import Errors from "@enso-ui/laravel-validation";
import Submit from "./Submit.vue";

export default {
	name: "AuthForm",

	components: { Submit },

	inject: ["routerErrorHandler"],

	data: () => ({
		errors: new Errors(),
		state: {
			successful: false,
		},
	}),

	computed: {
		...mapState(["meta"]),
	},

	provide() {
		return {
			state: this.state,
			errors: this.errors,
		};
	},
};
</script>

<style lang="scss">
.login {
	max-width: 400px;
	margin: auto;

	.logo {
		justify-content: center;
	}

	.is-spaced {
		margin-right: 1.6em;
	}

	figure.logo {
		display: inline-block;
	}
}
</style>
