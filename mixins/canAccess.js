export default {
    methods: {
        canAccess(route) {
            return this.$store.getters.routes.includes(route);
        },
    },
};
