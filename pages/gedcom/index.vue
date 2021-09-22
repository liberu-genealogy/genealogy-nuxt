<template>
    <div>
        <loading :active.sync="isLoading" :color="color" :background-color="backgroundColor"> </loading>
            <div class="columns is-gapless is-multiline is-mobile">
                <div class="column is-12">
                    <h1 class="is-size-4 has-text-black">
                        <span class="has-text-weight-medium">Gedcoms</span>
                    </h1>
                </div>
                <div class="column is-12">
                    <nav class="breadcrumb mt-1 mb-0" aria-label="breadcrumbs">
                        <ul>
                            <li><a class="is-size-7 has-text-weight-medium has-text-link"
                                    href="/dashboard">Home</a></li>
                            <li class="is-size-7 has-text-weight-medium is-active"><a href="/dashboard"
                                    aria-current="page">Gedcoms</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <form @submit.prevent="submit()" enctype="multipart/form-data">
                <div class="columns is-variable is-3 is-desktop is-flex-desktop-only ai--s">
                    <div class="column is-12">

                        <div class="card has-background-white has-text-black" style="height: 500px;">
                            <div class="card-content">
                                <div v-if="response" class="notification is-success">
                                    {{ response }}
                                </div>
                                <div v-if="error" class="notification is-danger">
                                    {{ message }}
                                </div>
                                <div v-for="error in errors" class="notification is-danger">
                                    {{ error[0] }}
                                </div>
                                <input type="hidden" v-model="fileName" v-if="!isLoading">
                                <div class="field import_block" v-if="!isLoading">
                                    <div class="file is-large is-boxed has-background-primary">
                                        <label class="file-label">

                                            <input class="file-input" type="file" @change="handleSelectedFiles" name="file" ref="fileInput" accept=".ged">
                                            <span class="file-cta">
                                                <span class="file-label">
                                                    <span class="file-icon">
                                                        <font-awesome-icon :icon="['fas', 'upload']"/>
                                                    </span>
                                                    Select GEDCOM File
                                                </span>
                                            </span>
                                        </label>

                                    </div>
                                    <p class="help"  :class="{ 'is-danger': $v.fileName.$error }" v-if="!$v.fileName.required">Field is required</p>
                                </div>

                                <b-progress
                                  v-if="isLoading"
                                  type="is-success"
                                  :max="total"
                                  :value="complete"
                                  show-value
                                />

                                <button type="submit"
                                class="button theme-button theme-button-xl has-background-primary is-uppercase has-text-weight-medium has-text-white">
                                Submit
                            </button>
                                <ul class="bullet_list mt-5">
                                    <li>We value your privacy and do not share your GEDCOM data with any third parties. Your GEDCOM file is used by the website only for processing your data and importing into your tree that you have selected.</li>
                                    <li>One tree is free for life for everyone and if you require more you will need to subscribe which helps us continue to provide services and develop new features.</li>
                                    <li>Please select a GEDCOM file exported from your desktop software or online website and click upload. It should begin to process and show imported data processing. If it stops before fully importing contact <a href="mailto:support@familytree365.com" class="has-text-link">support@familytree365.com</a></li>
                                    <li>We do not use your GEDCOM file for any other purpose.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
    </div>
</template>
f
<script>
import { mapGetters } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { required } from 'vuelidate/lib/validators'

export default {
    layout: 'auth',

    components: {
      Loading
    },

    middleware: 'permission',

    meta: {
      permission: { name: 'gedcom import menu' }
    },

    data: () => ({
      error: false,
      message: "",
      errors:null,
      file: undefined,
      fileName: '',
      isLoading: false,
      fullPage: true,
      color: '#4fcf8d',
      backgroundColor: '#ffffff',
      response : null,
      total: 100,
      complete: 0,
    }),

    validations: {
      fileName: {
        required,
      },
    },

    computed: {
       ...mapGetters([
              'isAuthenticated',
              'loggedInUser','loggedInUser']),
    },

    mounted() {
      this.subscribeToUploadProgress()
    },

    methods: {
      handleSelectedFiles(event) {
        console.log(this.$refs.fileInput.files[0])
        this.file = this.$refs.fileInput.files[0]
        this.fileName = this.file.name
      },

      async submit() {
        this.$v.$touch();

        if (this.$v.$invalid) {
          return -1
        }

        this.total = 100
        this.complete = 0

        this.isLoading = true
        let formData = new FormData()
        formData.append('file',  this.file)

        try {
          const response = await this.$axios
            .$post("/api/gedcom", formData, {
                headers: {
                  'content-type': 'multipart/form-data',
                  'Access-Control-Allow-Origin': '*'
                }
            })

          this.isLoading = false
          this.response = response[0]
        } catch (error) {
          this.error = true
          this.message = error.response.data.message
          this.errors =  error.response.data.errors
        }
      },

      subscribeToUploadProgress() {
        this.$echo.channel(`user.${this.loggedInUser.id}`)
          .listen('.gedcomProgress', message => {
            this.total = message.total
            this.complete = message.complete
          })
      }
      }
    }

</script>
<style scoped>
    @import '~/assets/css/admin.css';
</style>
