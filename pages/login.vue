<template>
    <auth-form action="Login"
        icon="user"
        endpoint="login"
        :payload="payload"
        @success="init">
        <email v-model="payload.email"/>
        <password v-model="payload.password"/>
        <remember v-model="payload.remember"
            v-if="!isWebview"/>
        <template v-slot:footer>
            <nuxt-link class="is-pulled-right"
                :to="{ name: 'password.email' }">
                {{ i18n('Forgot password') }}
            </nuxt-link>
            <div class="is-clearfix"/>
            <div class="buttons">
                <button class="button is-dark"
                        :class="{ 'is-loading': loading }"
                        type="button"
                        @click.prevent="socialLogin('github')">
                        <span class="icon is-small">
                            <fa :icon="['fab', 'github']"/>
                        </span>
                        <span>{{ i18n('Github') }}</span>
                </button>
                
                <button class="button is-info"
                        :class="{ 'is-loading': loading }"
                        type="button"
                        @click.prevent="socialLogin('facebook')">
                        <span class="icon is-small">
                            <fa :icon="['fab', 'facebook']"/>
                        </span>
                        <span>{{ i18n('Facebook') }}</span>
                </button>

                <button class="button is-white"
                        :class="{ 'is-loading': loading }"
                        type="button"
                        @click.prevent="socialLogin('google')">
                        <span class="icon is-small">
                            <fa :icon="['fab', 'google']"/>
                        </span>
                        <span>{{ i18n('Google') }}</span>
                </button>
            </div>

            </div>
        </template>
    </auth-form>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Errors from '@enso-ui/laravel-validation';
import AuthForm from '~/components/auth/AuthForm.vue';
import Submit from '~/components/auth/Submit.vue';
import Email from '~/components/auth/fields/Email.vue';
import Password from '~/components/auth/fields/Password.vue';
import Remember from '~/components/auth/fields/Remember.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
library.add(faFacebook, faGithub, faGoogle);
export default {
    name: 'login',

    inject: ['i18n', 'route'],

    meta: {
        guestGuard: true,
        title: 'Login',
    },

    head: {
        title: "Login"
    },

    components: { AuthForm, Email, Password, Remember, Submit },

    data: () => ({
        errors: new Errors(),
        payload: {
            email: '',
            password: '',
            remember: false,
        }
    }),

    computed: {
        ...mapState(['meta']),
        ...mapGetters(['isWebview']),
    },

    methods: {
        ...mapMutations('auth', ['login']),
        ...mapMutations('layout', ['home']),
        ...mapMutations(['setShowQuote', 'setCsrfToken']),
        init(data) {
            this.setShowQuote(this.meta.showQuote);

            if (data.csrfToken) {
                this.setCsrfToken({token: data.csrfToken, $axios: this.$axios});
            }

            setTimeout(() => {
                this.login();
                this.home(true);
                this.$router.push("/dashboard");
            }, 500);
        },

        socialLogin(service) {
            this.$axios.get(`api/login/${service}`).then(response=>{
                // console.log(response.data);
                window.location.href = response.data;
            })
        }
    },
};
</script>
<style lang="scss">
 @import '~/assets/css/bulma.css';
 @import '~/assets/css/fontawesome.min.css';
</style>