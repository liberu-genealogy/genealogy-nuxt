import Router from 'vue-router';

const { isNavigationFailure } = Router;

export default {
    methods: {
        routerErrorHandler(error) {
            if (!isNavigationFailure(error)) {
                throw error;
            }
        },
    },
};
