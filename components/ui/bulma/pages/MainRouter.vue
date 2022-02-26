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
import { ref, computed, useStore, watch } from 'vue';
export default {
    name: 'MainRouter',
    setup() {
        const keepAlive = computed(() => {
            // return this.$route.meta?.keepAlive
            return this.$route.meta?keepAlive:''
        })
    }
};
</script>
