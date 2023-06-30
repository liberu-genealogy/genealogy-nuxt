<template>
    <NuxtChild :key="$route.path"/>
</template>

<script setup>

    meta: {
        breadcrumb: 'google';
    };
</script>
