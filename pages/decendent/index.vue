<template></template>

<router>
{
    name: 'decendent.index'
}
</router>
<script>
import { ref, computed, useStore } from 'vue'
export default {
  layout: "auth",
  meta: {
    permission: { name: "decendent menu" },
    title: "Decendent - Index",
  },
};
</script>

<style lang="scss">
</style>