<template>
    <nuxt-child :key="$route.path"/>
</template>

<script>
export default {
    name: 'Router',
};
</script>