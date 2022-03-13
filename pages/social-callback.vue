<template>
    <div class="container">
        <div class="loader"></div>
        <p v-if="status == 'success'">Please wait while we're logging you in...</p>
        <p v-if="status != 'success'">Something went wrong, redirecting into login...</p>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
	layout: 'index',
	meta: {
        guestGuard: true,
        title: 'Login',
    },
    data() {
        return {
            token: this.$route.query.token ? this.$route.query.token : null,
            status: this.$route.query.status ? this.$route.query.status : null
        }
    },
    methods: {
        ...mapMutations('auth', ['login']),
        ...mapMutations('layout', ['home']),
        ...mapMutations(['setShowQuote', 'setCsrfToken'])
    },
    mounted() {
        
        if(this.status == 'success'){
            if (this.token) {
                this.setCsrfToken({token: this.token, $axios: this.$axios});
            }

            setTimeout(() => {                
                this.$router.push('/dashboard');
                this.login();
                this.home(true);
            }, 500);        
        }else{
            setTimeout(() => {                
                this.$router.push('/login');                
            }, 500);        
        }
        
    }
}
</script>

<style lang="scss" scoped>
.container {
    text-align: center;
}
.loader {
    margin: 20px auto;
    border: 8px solid #f3f3f3;
    border-radius: 50%;
    border-top: 8px solid #3B5998;
    border-bottom: 8px solid #3B5998;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 1.2s linear infinite;
    animation: spin 1.2s linear infinite;
}
@-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>