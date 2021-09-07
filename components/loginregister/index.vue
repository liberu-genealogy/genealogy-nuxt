<template>
  <div>
    <div class="container auth is-fluid px-0">is is compoenn</div>
  </div>
</template>

<script>
  import Loading from "vue-loading-overlay";
  export default {
    data() {
      return {
        error: false,
        message: "",
        errors: null,
        isLoading: false,
        fullPage: true,
        color: "#4fcf8d",
        backgroundColor: "#ffffff",
        registration: {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password_confirmation: "",
          conditions_terms: false,
        },
      };
    },
  };
</script>

<style></style>
