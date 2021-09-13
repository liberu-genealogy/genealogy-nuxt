<template>
    <NuxtChild :key="$route.path"/>
</template>

<script>
export default {
    // key(route) {
    //     return route.path
    // },
    meta: {
        breadcrumb: 'tutorials',
        route: 'system.tutorials.index',
    },
};
</script>
