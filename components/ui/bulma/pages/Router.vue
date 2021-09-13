<template>
    <NuxtChild :key="$route.path"/>
</template>

<script>
export default {
    name: 'Router',
};
</script>