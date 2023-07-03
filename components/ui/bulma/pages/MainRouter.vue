<template>
    <div>
        <NuxtChild keep-alive class="animated fadeIn"
            :key="$route.path"
            v-if="keepAlive"/>
        <NuxtChild class="animated fadeIn"
            :key="$route.path"
            v-if="!keepAlive"/>
    </div>
</template>

<script setup>

    name: 'MainRouter';

    const computed = {
        keepAlive() {
            return this.$route.meta?.keepAlive
        },
    };
</script>
