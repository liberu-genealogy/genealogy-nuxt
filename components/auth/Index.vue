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

<style>
  @import "~/assets/css/bulma.css";
  @import "~/assets/css/fontawesome.min.css";
  .auth-form .cnt-g {
    width: 100%;
    border: 1px solid #e4e4e4;
    border-radius: 3px;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    margin-top: 13px;
    color: #707070;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
    box-shadow: none !important;
    text-align: center;
    cursor: pointer;
  }

  .auth-form .cnt-g img {
    max-height: 20px;
    float: left;
    margin-top: 15px;
  }

  .auth-form .divider {
    text-align: center;
    position: relative;
    margin-top: 20px;
    line-height: 1;
    color: #4f4e60;
    font-size: 10px;
    text-transform: uppercase;
  }

  .auth-form .divider:before,
  .auth-form .divider:after {
    content: "";
    position: absolute;
    top: 3px;
    width: 47%;
    height: 1px;
    background-color: #e4e4e4;
  }

  .auth-form .divider:before {
    left: 0;
  }

  .auth-form .divider:after {
    right: 0;
  }
</style>

