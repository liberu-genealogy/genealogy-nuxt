<template>
  <div class="columns">
    <div class="column is-two-thirds-desktop">
        <img v-if=imageUrl :src="imageUrl" alt=""/>
    </div>
  </div>

</template>
<router>
{
name: 'dnamatching.show'
}
</router>

<script>

export default {
layout: 'auth',
  meta: {
    breadcrumb: 'show',
    title: 'DNA Matching - Show',
    permission: { name: 'dnamatching menu' }
  },

  inject: ['route', 'routerErrorHandler'],

  data() {
    return {
      imageUrl: null
    }
  },

  methods: {
    fetchData() {
      if (!this.$route.params.dnaMatching)
        return

      this.$axios.get(this.route(this.$route.name, this.$route.params.dnaMatching))
        .then((response) => {
          this.imageUrl = response.data.dnamatching.image
        })
        .catch(this.errorHandler);
    }
  },

  created() {
    this.fetchData();
  },
};

</script>

