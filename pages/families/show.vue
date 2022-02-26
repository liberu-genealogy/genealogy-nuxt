<template>
    <div/>
</template>
<router>
{
    name: 'families.show'
}
</router>
<script>
import { ref, computed, useStore } from 'vue'
export default {
layout: 'auth',
    meta: {
        permission: { name: 'families menu' },
        title: 'Families - Show'
    },
};
</script>

<style lang="scss">
</style>
