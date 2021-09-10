<template>
  <div class="container auth is-fluid px-0">
    <div class="columns is-multiline is-gapless">
      <div class="column is-6-tablet is-5-desktop is-5-fullhd">
        <div class="auth has-background-primary">
          <div class="auth-content">
            <div class="has-text-centered">
              <NuxtLink to="/"
                ><img src="~assets/images/logo1.svg" alt="" width="300px"
              /></NuxtLink>
            </div>
            <div class="auth-inner-content my-6">
              <div
                class="
                  has-text-white has-text-weight-regular
                  is-flex
                  ai--fs
                  mb-5
                "
              >
                <img
                  src="~assets/images/bcheckmark.webp"
                  alt=""
                  class="bullet mt-1 mr-3"
                />
                Family Tree 365 is a secure online website which you can use to
                create your own family tree(s) with.
              </div>
              <div
                class="
                  has-text-white has-text-weight-regular
                  is-flex
                  ai--fs
                  mb-5
                "
              >
                <img
                  src="~assets/images/bcheckmark.webp"
                  alt=""
                  class="bullet mt-1 mr-3"
                />
                It has a tree viewer and DNA support more features are planned
                such as the inclusion of archive databases and collections
              </div>
              <div
                class="has-text-white has-text-weight-regular is-flex ai--fs"
              >
                <img
                  src="~assets/images/bcheckmark.webp"
                  alt=""
                  class="bullet mt-1 mr-3"
                />
                Set up your first family tree free of charge. We offer different
                pricing levels with optional subscriptions if you need to create
                extra trees.
              </div>
            </div>

            <slot name="footerImageForm" />
          </div>
        </div>
      </div>

      <slot name="form" />
    </div>
  </div>
</template>

<script>
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
