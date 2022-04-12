const Edit = () => import('../../pages/tasks/Edit.vue');

export default {
    name: 'tasks.edit',
    path: ':task/edit',
    component: Edit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Task',
    },
};
