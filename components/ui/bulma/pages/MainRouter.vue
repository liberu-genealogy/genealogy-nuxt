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
    inject: ['route'],
    computed: {
        keepAlive() {
            const keepAlive = this.route.meta.reduce((keepAlive, meta) => meta.keepAlive || keepAlive, false)
            return this.$route.meta && keepAlive;
        },
    },
};
</script>
