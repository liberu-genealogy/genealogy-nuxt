<template>
  <enso-table class="box is-paddingless raises-on-hover"
              id="dnamatching" ref="table" >
    <template v-slot:image="{ row }">
      <a :href="row.image" target="blank"><img :src="row.image" alt="" class="dna-image"></a>
    </template>
  </enso-table>
</template>

<router>
{
    name: 'dnamatching.index'
}
</router>
<script>
import { EnsoTable } from '@enso-ui/tables/bulma';
export default {
layout: 'auth',
    meta: {
        permission: { name: 'dnamatching menu' },
        title: 'DNA Matching - Index'
    },
    components: { EnsoTable },
  inject: ['canAccess', 'i18n'],
};
</script>

<style lang="scss">
.dna-image {
  max-width: 100px;
  max-height: 60px;
  object-fit: contain;
}
</style>
