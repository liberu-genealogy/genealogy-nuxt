<script>
export default {
    name: 'CoreBreadcrumbs',

    computed: {
        breadcrumbs() {
            return this.$route.matched.reduce((breadcrumbs, element) => {
                breadcrumbs.push({
                    name: element.meta.breadcrumb,
                    route: element.meta.route,
                });
                return breadcrumbs;
            }, []);
        },
    },

    methods: {
        hasNavigation(breadcrumb) {
            return breadcrumb.name !== this.$route.meta.breadcrumb
                && breadcrumb.route !== this.$route.name
                && !!breadcrumb.route;
        },
    },

    render() {
        return this.$scopedSlots.default({
            breadcrumbs: this.breadcrumbs,
            hasNavigation: this.hasNavigation,
        });
    },
};
</script>
