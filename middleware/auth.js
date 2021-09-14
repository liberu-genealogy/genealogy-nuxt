const exceptions = ['notFound', 'unauthorized', 'maintenanceMode'];

const authorized = (store, to) => !store.state.appState
    || store.getters.routes.includes(to.name)
    || exceptions.includes(to.name);

export default function ({ store, redirect, route, from }) {
    const guestGuard = route.meta.reduce((guestGuard, meta) => meta.guestGuard || guestGuard, false)

    if (store.state.auth.isAuth) {
        if (guestGuard) {
            redirect({ name: 'dashboard.index' });
        } else if (store.state.appUpdate) {
            redirect(from)
        } else if (!authorized(store, route)) {
            redirect({ name: 'unauthorized' });
        }
    }
    else {
        if (!guestGuard) {
            if (!['login', 'register'].includes(window.location.pathname)) {
                store.commit('auth/setIntendedPath', window.location.pathname);
            }

            redirect({ name: 'login' });
        }
    }
}