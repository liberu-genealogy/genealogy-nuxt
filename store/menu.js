import { hasActiveChild, organize } from '~/utils/menuOrganizer';

export const state = () => ({
    menus: [],
    editable: false,
});

export const getters = {
    hasActiveChild: () => menu => hasActiveChild(menu),
};

export const mutations = {
    set: (state, menus) => (state.menus = menus),
    activate: (state, { menu, active }) => (menu.active = active),
    toggle: (state, menu) => (menu.expanded = !menu.expanded),
    expand: (state, menu) => (menu.expanded = true),
    collapse: (state, menu) => (menu.expanded = false),
    edit: (state, status) => (state.editable = status),
    organize: (state, organizedMenus) => {
        state.children = state.menus;
        organize(state, organizedMenus);
        state.menus = state.children;
        delete state.children;
    },
};

export const actions = {
    refresh: ({
        state, getters, commit, dispatch,
    }, menus = null) => {
        const shouldRefresh = menus || state.menus;

        shouldRefresh.filter(menu => menu.children)
            .forEach(menu => {
                dispatch('refresh', menu.children);

                if (!menu.expanded && getters.hasActiveChild(menu)) {
                    commit('expand', menu);
                }
            });
    },
};
