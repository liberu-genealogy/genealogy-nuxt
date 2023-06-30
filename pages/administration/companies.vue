<template>
    <NuxtChild :key="$route.path"/>
</template>

<script setup>

    // key(route) {
    //     return route.path
    // },
    meta: {
        breadcrumb: 'companies';
        route: 'administration.companies.index';
    };
</script>
