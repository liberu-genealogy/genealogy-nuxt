<template>
	<div class="login">
		<div class="box has-padding-medium">
			<h3 class="title is-3 has-text-black has-text-centered has-margin-bottom-medium">
			   	<figure class="image is-24x24 logo is-clickable"	 @click="$router.push({ name: 'login' })">
					<img src="/images/logo.svg">
				</figure>
				{{ meta.appName }}
			</h3>
			<form class="has-margin-bottom-medium"	 @submit.prevent="submit()">
				<div class="field">
					<div class="control has-icons-left has-icons-right">
						<input 	v-model="first_name"
								v-focus
							   	class="input"
							   	type="text"
							   	:class="{ 'is-danger': errors.has('first_name'), 'is-success': isSuccessful }"
							   	:placeholder="i18n('First Name')"
							   	@input="errors.clear('first_name')">
						<span class="icon is-small is-left">
							<fa icon="user"/>
						</span>
						<span v-if="isSuccessful" class="icon is-small is-right has-text-success">
							<fa icon="check"/>
						</span>
						<span v-if="errors.has('first_name')" class="icon is-small is-right has-text-danger">
							<fa icon="exclamation-triangle"/>
						</span>
					</div>
					<p 	class="has-text-left has-text-danger is-size-7"
					   	v-if="errors.has('first_name')">
						{{ errors.get('first_name') }}
					</p>
				</div>
				<div class="field">
					<div class="control has-icons-left has-icons-right">
						<input v-model="last_name"
							   v-focus
							   class="input"
							   type="text"
							   :class="{ 'is-danger': errors.has('last_name'), 'is-success': isSuccessful }"
							   :placeholder="i18n('Last Name')"
							   @input="errors.clear('last_name')">
						<span class="icon is-small is-left">
							<fa icon="user"/>
						</span>
						<span 	v-if="isSuccessful"
								class="icon is-small is-right has-text-success">
							<fa icon="check"/>
						</span>
						<span v-if="errors.has('last_name')" class="icon is-small is-right has-text-danger">
							<fa icon="exclamation-triangle"/>
						</span>
					</div>
					<p class="has-text-left has-text-danger is-size-7"  v-if="errors.has('last_name')">
						{{ errors.get('last_name') }}
					</p>
				</div>
				<div class="field">
					<div class="control has-icons-left has-icons-right">
						<input 	v-model="email"
							   	v-focus
							   	class="input"
							   	type="email"
							   	:class="{ 'is-danger': errors.has('email'), 'is-success': isSuccessful }"
							   	:placeholder="i18n('Email')"
							   	@input="errors.clear('email')">
						<span class="icon is-small is-left">
							<fa icon="envelope"/>
						</span>
						<span v-if="isSuccessful" class="icon is-small is-right has-text-success">
							<fa icon="check"/>
						</span>
						<span v-if="errors.has('email')" class="icon is-small is-right has-text-danger">
							<fa icon="exclamation-triangle"/>
						</span>
					</div>
					<p 	class="has-text-left has-text-danger is-size-7"
					   	v-if="errors.has('email')">
						{{ errors.get('email') }}
					</p>
				</div>
				<div class="field">
					<div class="control has-icons-left has-icons-right">
						<input 	v-model="password"
							   	class="input"
							   	:type="passwordMeta.content"
							   	:class="{ 'is-danger': errors.has('password'), 'is-success': isSuccessful }"
							   	:placeholder="i18n('Password')"
							   	@input="errors.clear('password')">
						<span class="icon is-small is-left">
							<fa icon="lock"/>
						</span>
						<reveal-password 	:meta="passwordMeta"
											:class="{ 'is-spaced': isSuccessful || errors.has('password') }"
										   	v-if="password"/>
						<span v-if="isSuccessful"  class="icon is-small is-right has-text-success">
							<fa icon="check"/>
						</span>
						<span v-if="errors.has('password')"	 class="icon is-small is-right has-text-danger">
							<fa icon="exclamation-triangle"/>
						</span>
						<slot 	name="password-strength"
							 	:password="password"
							 	:has-password="hasPassword"/>
					</div>
					<p 	class="has-text-left has-text-danger is-size-7"
					   	v-if="errors.has('password')">
						{{ errors.get('password') }}
					</p>
				</div>
				<div class="field">
					<div class="control has-icons-left has-icons-right">
						<input v-model="password_confirmation"
							   class="input"
							   :type="confirmationMeta.content"
							   :class="{ 'is-danger': errors.has('password'), 'is-success': isSuccessful }"
							   :placeholder="i18n('Repeat Password')"
							   @input="errors.clear('password')">
						<span class="icon is-small is-left">
							<fa icon="lock"/>
						</span>
						<reveal-password 	:meta="confirmationMeta"
										   	:class="{ 'is-spaced': match || isSuccessful || errors.has('password')}"
										   	v-if="password_confirmation"/>
						<span 	v-if="errors.has('password')"
								class="icon is-small is-right has-text-danger">
							<fa icon="exclamation-triangle"/>
						</span>
						<span 	v-if="match && !errors.has('password') || isSuccessful"
								class="icon is-small is-right has-text-success">
							<fa icon="check"/>
						</span>
					</div>
					<p 	class="has-text-left has-text-danger is-size-7"
					   	v-if="errors.has('password')">
						{{ errors.get('password') }}
					</p>
				</div>
				<div class="form-group">
					<label>Agree to <a href="/termsandconditions" target="_blank">terms and conditions</a> </label>
					<input type="radio" id="yes" value="true" v-model="terms">
					<label for="yes">Yes</label>
					<input type="radio" id="no" value="false" v-model="terms">
					<label for="no">No</label>
				</div>
				<div class="field">
					<button v-if="terms === 'true'" class="button is-primary is-fullwidth"
						 	:class="{ 'is-loading': loading }"
						 	type="submit"
						 	@click.prevent="submit()">
							<span class="icon is-small">
								<fa :icon="'user'"/>
							</span>
							<span>{{ i18n(action) }}</span>
					</button>
				</div>
			</form>
			<router-link
				:to="'/login'"
				class="is-pulled-right">
				{{ i18n('Log in') }}
			</router-link>
			<div>
				<br /><br />
				<router-link
							 :to="{ name: 'about.index' }"
							 class="is-pulled-left">
					{{ i18n('About') }}&nbsp;
				</router-link>
				<router-link
							 :to="{ name: 'contact.index' }"
							 class="is-pulled-right">
					{{ i18n('Contact') }} &nbsp;
				</router-link>
			</div>
			<br />
			<div>
				<router-link
							 :to="{ name: 'privacy.index' }"
							 class="is-pulled-left">
					{{ i18n('Privacy Policy') }}
				</router-link>
				<router-link
							 :to="{ name: 'termsandconditions.index' }"
							 class="is-pulled-right">
					{{ i18n('Terms and Conditions') }}
				</router-link>
			</div>
			<br /><br /><br />
			<div>
				Copyright 2020 Genealogia Ltd. International House, 12 Constance Street
				London, E16 2DQ. Company Number: 12734769
			</div>
			<div class="is-clearfix"/>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import { library } from '@fortawesome/fontawesome-svg-core';
	import {
		faEnvelope, faCheck, faExclamationTriangle, faLock, faUser,
	} from '@fortawesome/free-solid-svg-icons';
	import { focus } from '@enso-ui/directives';
	import Errors from '@enso-ui/laravel-validation';
	import RevealPassword from '@enso-ui/forms/src/bulma/parts/RevealPassword.vue';

	library.add([
		faEnvelope, faCheck, faExclamationTriangle, faLock, faUser,
	]);

	export default {
		name: 'RegisterForm',
		components: { RevealPassword },
		meta: {
	        guestGuard: true
	    },
		directives: { focus },
		inject: {
			i18n: { from: 'i18n' },
		},

		props: {
			action: {
					required: true,
						type: String
				},
			route: {
					required: true,
						type: String
				}
		},

		data: () => ({
			first_name: '',
			last_name: '',
			email: '',
			errors: new Errors(),
			isSuccessful: false,
			loading: false,
			password: '',
			passwordMeta: {
				content: 'password',
			},
			password_confirmation: null,
			confirmationMeta: {
				content: 'password',
			},
			terms: 'true',
		}),

		computed: {
			...mapState(['meta']),
			hasPassword() {
				return this.password !== null && this.password.length;
			},
			match() {
				return this.hasPassword
						&& this.password === this.password_confirmation;
			},
			postParams() {
				return this.registerParams;
			},
			registerParams() {
				const { email, password, first_name, last_name, password_confirmation } = this;

				return { email, password, first_name, last_name, password_confirmation};
			},
			registerLink() {
				return '/api/register';
			},
		},

		methods: {
			submit() {
				this.loading = true;
				this.isSuccessful = false;
				this.$axios.post(this.registerLink, this.postParams)
					.then(({ data }) => {
						this.loading = false;
						this.isSuccessful = true;
						this.$emit('success', data);

					}).catch((error) => {
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