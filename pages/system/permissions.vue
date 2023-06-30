<template>
    <NuxtChild :key="$route.path"/>
</template>

<script setup>

    // key(route) {
    //     return route.path
    // },
    meta: {
        breadcrumb: 'permissions';
        route: 'system.permissions.index';
    };
</script>
