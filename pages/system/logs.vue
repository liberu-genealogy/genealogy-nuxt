<template>
    <NuxtChild :key="$route.path"/>
</template>

<script setup>

    // key(route) {
    //     return route.path
    // },
    meta: {
        breadcrumb: 'logs';
        route: 'system.logs.index';
        keepAlive: false;
    };
</script>
