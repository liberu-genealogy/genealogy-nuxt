const LocalisationEdit = () => import('../../../pages/localisation/Edit.vue');

export default {
    name: 'system.localisation.edit',
    path: ':language/edit',
    component: LocalisationEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Language',
    },
};
