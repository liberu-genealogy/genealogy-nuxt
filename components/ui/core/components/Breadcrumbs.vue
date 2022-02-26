<script>
import { ref, computed, useStore, watch } from 'vue';
export default {
    name: 'CoreBreadcrumbs',
    setup() {
        const breadcrumbs = computed(() => {
            return this.$route.matched.reduce((breadcrumbs, element) => {
                breadcrumbs.push({
                    name: element.meta.breadcrumb,
                    route: element.meta.route,
                });
                return breadcrumbs;
            }, []);
        })
        function hasNavigation(breadcrumb) {
            return breadcrumb.name !== this.$route.meta.breadcrumb
                && breadcrumb.route !== this.$route.name
                && !!breadcrumb.route;
        }
    },

    render() {
        return this.$scopedSlots.default({
            breadcrumbs: this.breadcrumbs,
            hasNavigation: this.hasNavigation,
        });
    },
};
</script>
