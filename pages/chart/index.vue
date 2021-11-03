<template>
  <enso-table class="box is-paddingless raises-on-hover" id="notes" />
</template>

<router>
{
    name: 'trees.index'
}
</router>
<script>
import { EnsoTable } from "@enso-ui/tables/bulma";

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
