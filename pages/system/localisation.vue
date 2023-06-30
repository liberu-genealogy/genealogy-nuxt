<template>
    <NuxtChild :key="$route.path"/>
</template>

<script setup>

    // key(route) {
    //     return route.path
    // },
    meta: {
        breadcrumb: 'localisation';
        route: 'system.localisation.index';
    };
</script>
