const UserEdit = () => import('../../../pages/users/Edit.vue');

export default {
    name: 'administration.users.edit',
    path: ':user/edit',
    component: UserEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit User',
    },
};
