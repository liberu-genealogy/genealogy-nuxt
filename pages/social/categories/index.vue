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
  </v-app>
</template>

<!-- <router>
{
  name: 'social.categories.index'
}
</router> -->

<script setup>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css';
import { mapGetters, mapActions } from 'vuex'


  layout: 'auth';
  inject: ['errorHandler', 'route', 'toastr'];
  //middleware: ['permission', 'verification'],
  meta: {
    permission: { name: 'dashboard menu' };
    title: 'Groups';
  };

</script>
