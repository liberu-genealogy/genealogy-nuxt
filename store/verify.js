import store from '@root/store';
const Verify = () => import('../pages/auth/Verify.vue');

const redirect = (to, from, next) => {
	if (store.state.auth.isAuth) {
		next({ path: '/' });
	} else {
		next();
	}
};

export default [{
	name: 'verify',
	path: '/verify',
	component: Verify,
	beforeEnter: redirect,
	meta: {
		guestGuard: true,
		title: 'Activate Account',
	},
}];
