const levelMatches = (menus, menuId) => menus.some(({ id }) => id === menuId);

const changeLevel = (menus, organizedMenus) => menus.filter(({ children }) => children)
    .find(menu => organize(menu, organizedMenus)) !== undefined;

const organize = (menu, organizedMenus) => {
    if (levelMatches(menu.children, organizedMenus[0].id)) {
        menu.children = organizedMenus;
        return true;
    }

    return changeLevel(menu.children, organizedMenus);
};

const hasActiveChild = ({ children }) => children
    .some(child => child.active || child.children && hasActiveChild(child));

export { hasActiveChild, organize };
