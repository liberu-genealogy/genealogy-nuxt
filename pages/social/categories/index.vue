<template>
  <v-app>
    <div class="columns is-gapless is-multiline is-mobile">
      <div class="column is-12">
<h1><a href="https://www.facebook.com/groups/familytree365" target="_blank" class="button is-success">
Family Tree 365 Support</a></h1><br />
<h1><a href="https://www.facebook.com/groups/genealogychat" target="_blank" class="button is-success">
Genealogy Discussion</a></h1><br />
<h1><a href="https://www.facebook.com/groups/dna365" target="_blank" class="button is-success">
DNA & Genetics Discussion</a></h1>
      </div>
      </div>
      </div>
    </div>
  </v-app>
</template>
<router>
{
name: 'social.categories.index'
}
</router>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'auth',
  inject: ['errorHandler', 'route', 'toastr'],
  //middleware: ['permission', 'verification'],
  meta: {
    permission: { name: 'dashboard menu' },
    title: 'Groups',
  },
}
</script>
