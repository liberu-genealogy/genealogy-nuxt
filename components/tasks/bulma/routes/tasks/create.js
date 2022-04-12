const Create = () => import('../../pages/tasks/Create.vue');

export default {
    name: 'tasks.create',
    path: 'create',
    component: Create,
    meta: {
        breadcrumb: 'create',
        title: 'Create Task',
    },
};
