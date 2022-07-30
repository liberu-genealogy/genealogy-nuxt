import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./fileTypes', false, /.*\.js$/));
const Router = () => import('@enso-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: 'fileTypes',
    component: Router,
    meta: {
        breadcrumb: 'fileTypes',
        route: 'administration.fileTypes.index',
    },
    children: routes,
};
