<template>
    <NuxtChild :key="$route.path"/>
</template>

<script>
export default {
    meta: {
        breadcrumb: 'menus',
        route: 'system.menus.index',
    },
};
</script>