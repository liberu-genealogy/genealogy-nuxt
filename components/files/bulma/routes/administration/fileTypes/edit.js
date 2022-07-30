const FileTypeEdit = () => import('../../../pages/fileTypes/Edit.vue');

export default {
    name: 'administration.fileTypes.edit',
    path: ':type/edit',
    component: FileTypeEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit FileType',
    },
};
