<template>
    <div/>
</template>
<router>
{
    name: 'familyevents.show'
}
</router>
<script>
import { ref, computed, useStore } from 'vue'
export default {

layout: 'auth',
    meta: {
        permission: { name: 'familyevents menu' },
        title: 'Family Events - Show'
    },

};
</script>

<style lang="scss">
</style>
