import store from '@root/store';
const Register = () => import('../pages/auth/Register.vue');
const redirect = (to, from, next) => {
    if (store.state.auth.isAuth) {
        next({ path: '/' });
    } else {
        next();
    }
};

export default [{
    name: 'register',
    path: '/register',
    component: Register,
    beforeEnter: redirect,
    meta: {
        guestGuard: true,
        title: 'Register',
    },
}];