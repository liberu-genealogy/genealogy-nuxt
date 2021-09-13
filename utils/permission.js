const cssClass = (permissionEnum, { type }) => {
    switch (type) {
        case permissionEnum.Read:
            return 'is-success';
        case permissionEnum.Write:
            return 'is-warning';
        case permissionEnum.Delete:
            return 'is-danger';
        case permissionEnum.Link:
            return 'is-info';
        case permissionEnum.Menu:
            return 'is-primary';
        default:
            return '';
    }
};

export default cssClass;
