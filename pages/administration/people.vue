<template>
    <NuxtChild :key="$route.path"/>
</template>

<script>
export default {
    // key(route) {
    //     return route.path
    // },
    meta: {
        breadcrumb: 'people',
        route: 'administration.people.index',
    },
};
</script>
