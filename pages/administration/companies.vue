<template>
    <NuxtChild :key="$route.path"/>
</template>

<script>
export default {
    // key(route) {
    //     return route.path
    // },
    meta: {
        breadcrumb: 'companies',
        route: 'administration.companies.index',
    },
};
</script>
