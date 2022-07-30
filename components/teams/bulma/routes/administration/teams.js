const TeamsIndex = () => import('../../pages/teams/Index.vue');

export default {
    name: 'administration.teams.index',
    path: '',
    component: TeamsIndex,
    meta: {
        breadcrumb: 'index',
        title: 'Teams',
    },
};
