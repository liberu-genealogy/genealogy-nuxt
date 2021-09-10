<template>
    <auth-form action="Send a reset password link"
        endpoint="password.email"
        icon="user"
        :payload="payload"
        @success="status = $event.status"
        @submitting="status = null">
        <p class="has-text-success is-size-7"
            v-if="status">
            {{ status }}
        </p>
        <email v-model="payload.email"/>
    </auth-form>
</template>
<router>
{
    name: 'password.email'
}
</router>

<script>
import AuthForm from '~/components/auth/AuthForm.vue';
import Email from '~/components/auth/fields/Email.vue';

export default {
    meta: {
        guestGuard: true,
        title: 'Email Reset Link',
    },
    components: { AuthForm, Email },

    data: () => ({
        payload: {
            email: '',
        },
        status: null,
    }),
};
</script>