<template>
  <enso-table class="box is-paddingless raises-on-hover" id="notes" />
</template>

<!-- <router>
{
    name: 'trees.show'
}
</router> -->
<script setup>
import { EnsoTable } from "@enso-ui/tables/bulma";


  layout: "auth";
  meta: {
    permission: { name: "trees menu" };
    title: "Trees - Index";
  };

  components: { EnsoTable };
</script>

<style lang="scss">
</style>