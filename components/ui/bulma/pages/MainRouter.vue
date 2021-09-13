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

<script>
export default {
    name: 'MainRouter',

    computed: {
        keepAlive() {
            return this.$route.meta?.keepAlive
        },
    },
};
</script>
