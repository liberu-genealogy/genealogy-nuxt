<template>
    <div/>
</template>
<router>
{
    name: 'chan.show'
}
</router>
<script>
import { ref, computed, useStore } from 'vue'
export default {
layout: 'auth',
    meta: {
        permission: { name: 'chan menu' },
        title: 'Chan - Show'
    },
};
</script>

<style lang="scss">
</style>
