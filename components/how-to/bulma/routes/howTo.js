const HowToIndex = () => import('../pages/howTo/Index.vue');

export default {
    name: 'howTo.videos.index',
    path: '/howTo/videos',
    component: HowToIndex,
    meta: {
        breadcrumb: 'how to',
        title: 'How To',
    },
};
