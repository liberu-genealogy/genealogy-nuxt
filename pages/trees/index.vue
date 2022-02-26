<template>
  <enso-table class="box is-paddingless raises-on-hover" id="notes" />
</template>

<router>
{
    name: 'trees.show'
}
</router>
<script>
import { EnsoTable } from "@enso-ui/tables/bulma";
import { ref, computed } from 'vue';
export default {
  layout: "auth",
  meta: {
    permission: { name: "trees menu" },
    title: "Trees - Index",
  },

  components: { EnsoTable },
};
</script>

<style lang="scss">
</style>