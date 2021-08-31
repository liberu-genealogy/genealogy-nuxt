<template>
    <NuxtChild :key="$route.path"/>
</template>

<script>
export default {
    meta: {
        breadcrumb: 'tasks',
        route: 'tasks.index',
    },
};
</script>