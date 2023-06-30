<template>
    <NuxtChild :key="$route.path"/>
</template>

<script setup>

    meta: {
        breadcrumb: 'menus';
        route: 'system.menus.index';
    };
</script>