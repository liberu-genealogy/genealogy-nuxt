<template>
    <NuxtChild :key="$route.path"/>
</template>

<script setup>

    meta: {
        breadcrumb: 'integrations';
    };

</script>