<template>
    <auth-form action="Set a new password"
        endpoint="password.reset"
        icon="lock"
        :payload="payload"
        @success="success"
        @submitting="status = null">
        <p class="has-text-success is-size-7"
            v-if="status">
            {{ status }}
        </p>
        <email v-model="payload.email"/>
        <password v-model="payload.password"
            autocomplete="off"/>
        <p class="help">
            <password-strength :password="payload.password"/>
        </p>
        <confirmation v-model="payload.password_confirmation"
            :match="match"/>
    </auth-form>
</template>
<router>
{
    name: 'password.reset',
}
</router>
<script>
import AuthForm from '~/components/auth/AuthForm.vue';
import PasswordStrength from '~/components/auth/PasswordStrength.vue';
import Email from '~/components/auth/fields/Email.vue';
import Password from '~/components/auth/fields/Password.vue';
import Confirmation from '~/components/auth/fields/Confirmation.vue';

export default {
    // head: {
    //     title: 'Reset Password'
    // },
    meta: {
        guestGuard: true,
        title: 'Reset Password',
    },

    components: { AuthForm, Email, PasswordStrength, Password, Confirmation },

    inject: ['routerErrorHandler'],

    data: (v) => ({
        payload: {
            email: '',
            password: '',
            password_confirmation: '',
            token: v.$route.params.token,
        },
        status: null,
    }),

    computed: {
        match() {
            const { password, password_confirmation } = this.payload;

            return password.length > 0
                && password === password_confirmation;
        },
    },

    methods: {
        success({ status }) {
            this.status = status;
            setTimeout(() => this.$router.push({ name: 'login' })
                .catch(this.routerErrorHandler), 500);
        },
    },
};
</script>
