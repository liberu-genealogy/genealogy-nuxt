import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./companies', false, /.*\.js$/));
const Router = () => import('@enso-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: 'companies',
    component: Router,
    meta: {
        breadcrumb: 'companies',
        route: 'administration.companies.index',
    },
    children: routes,
};
