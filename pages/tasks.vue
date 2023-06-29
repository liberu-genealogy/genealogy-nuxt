<template>
    <NuxtChild :key="$route.path"/>
</template>

<script setup>

    meta: {
        breadcrumb: 'tasks';
        route: 'tasks.index';
    };
</script>