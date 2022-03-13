<template>
    <NuxtChild :key="$route.path"/>
</template>

<script>
export default {
    // key(route) {
    //     return route.path
    // },
    meta: {
        breadcrumb: 'logs',
        route: 'system.logs.index',
        keepAlive: false,
    },
};
</script>
