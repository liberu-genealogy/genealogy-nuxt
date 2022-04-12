const LocalisationCreate = () => import('../../../pages/localisation/Create.vue');

export default {
    name: 'system.localisation.create',
    path: 'create',
    component: LocalisationCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Language',
    },
};
