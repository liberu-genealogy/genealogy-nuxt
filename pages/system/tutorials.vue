<template>
    <NuxtChild :key="$route.path"/>
</template>

<script setup>

    // key(route) {
    //     return route.path
    // },
    meta: {
        breadcrumb: 'tutorials';
        route: 'system.tutorials.index';
    };
</script>
