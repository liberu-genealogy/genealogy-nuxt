<template>
    <NuxtChild :key="$route.path"/>
</template>

<script>
export default {
    meta: {
        breadcrumb: 'google',
    },
};
</script>
