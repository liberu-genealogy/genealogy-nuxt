import { createRouter, createWebHistory, isNavigationFailure } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [] // Define your routes here
});

export default {
  methods: {
    routerErrorHandler(error) {
      if (!isNavigationFailure(error)) {
        throw error;
      }
    },
  },
  created() {
    this.$router = router; // Assign the router instance to $router
  }
};

