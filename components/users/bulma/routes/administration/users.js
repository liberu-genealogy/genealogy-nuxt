import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./users', false, /.*\.js$/));
const Router = () => import('@enso-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: 'users',
    component: Router,
    meta: {
        breadcrumb: 'users',
        route: 'administration.users.index',
    },
    children: routes,
};
