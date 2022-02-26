<template>
    <register-form action="Register" route="register" @success="init"></register-form>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Errors from '@enso-ui/laravel-validation';
import RegisterForm from '~/components/auth/RegisterForm.vue';
import { ref, computed, useStore } from 'vue';
// import Email from '~/components/auth/fields/Email.vue';
// import Password from '~/components/auth/fields/Password.vue';
// import Remember from '~/components/auth/fields/Remember.vue';

    export default {
        meta: {
            guestGuard: true,
            title: 'Register',
        },
        components: { RegisterForm },
        
        setup() {
            const errors = new Errors()
            const payload = ref({
                email = '',
                password = '',
                remember = false
            })
            const store = useState()
            return{
                one: computed(() => store.getters['${isWebview}']),
                two: computed(() => store.state[meta])
            }
            function init(data) {
                return{
                    ...mapMutations('auth', ['login']),
                    ...mapMutations('layout', ['home']),
                    ...mapMutations(['setShowQuote', 'setCsrfToken']),
                }

                this.setShowQuote(this.meta.showQuote);

                if (data.csrfToken) {
                    this.setCsrfToken({token: data.csrfToken, $axios: this.$axios});
                }


                setTimeout(() => {
                    
                    this.$router.push('/verify');
                
                }, 500);

            }
        }
    }


</script>
