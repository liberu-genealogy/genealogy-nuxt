<template>
    <NuxtChild :key="$route.path"/>
</template>

<script setup>

    meta: {
        breadcrumb: 'administration';
    };

</script>