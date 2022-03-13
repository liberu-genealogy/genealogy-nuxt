<template>
    <NuxtChild :key="$route.path"/>
</template>

<script>
export default {
    // key(route) {
    //     return route.path
    // },
    meta: {
        breadcrumb: 'users',
        route: 'administration.users.index',
    },
};
</script>
