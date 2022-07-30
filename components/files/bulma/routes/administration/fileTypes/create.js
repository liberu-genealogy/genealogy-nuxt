const FileTypeCreate = () => import('../../../pages/fileTypes/Create.vue');

export default {
    name: 'administration.fileTypes.create',
    path: 'create',
    component: FileTypeCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create File Type',
    },
};
