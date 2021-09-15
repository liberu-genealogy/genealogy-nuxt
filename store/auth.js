export const state = () => ({
    isAuth: localStorage.getItem('isAuth') === 'true',
    intendedRoute: null,
    intendedPath: null,
});

export const mutations = {
    login(state) {
        state.isAuth = true;
        localStorage.setItem('isAuth', true);
    },
    logout(state) {
        state.isAuth = false;
        localStorage.setItem('isAuth', false);
        localStorage.removeItem('authorization');
    },
    setIntendedRoute: (state, value) => (state.intendedRoute = value),
    setIntendedPath: (state, value) => (state.intendedPath = value),
};

export const actions = {
    logout({ commit }) {
        this.$axios.post('/api/logout').then(() => {
            this.$router.push({ name: 'default.index' });
            commit('appState', false, { root: true });
            commit('logout');
        });
    },
};