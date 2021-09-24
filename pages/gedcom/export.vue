<template>
  <div>
    <loading :active.sync="isLoading" :color="color" :background-color="backgroundColor"></loading>
    <div class="columns is-gapless is-multiline is-mobile">
      <div class="column is-12">
        <h1 class="is-size-4 has-text-black">
          <span class="has-text-weight-medium">Export Gedcom</span>
        </h1>
      </div>
      <div class="column is-12">
        <nav class="breadcrumb mt-1 mb-0" aria-label="breadcrumbs">
          <ul>
            <li><a class="is-size-7 has-text-weight-medium has-text-link"
                   href="/dashboard">Home</a></li>
            <li class="is-size-7 has-text-weight-medium is-active"><a href="/dashboard"
                                                                      aria-current="page">Export Gedcom</a></li>
          </ul>
        </nav>
      </div>
    </div>
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
            <div class="field import_block">
              <div class="file is-large is-boxed has-background-primary">
                <label class="file-label">
                  <span class="file-cta" @click="handleExportFiles">
                      <span class="file-label">
                          <span class="file-icon">
                              <font-awesome-icon :icon="['fas', 'download']"/>
                          </span>
                          Generating a GEDCOM file
                      </span>
                  </span>
                </label>
              </div>
            </div>
            <a v-if="generatedFile" :href="generatedFile" class="field import_block">
              <div class="file is-large is-boxed has-background-primary">
                <label class="file-label">
                  <span class="file-cta" @click="handleExportFiles">
                      <span class="file-label">
                          <span class="file-icon">
                              <font-awesome-icon :icon="['fas', 'download']"/>
                          </span>
                          Download
                      </span>
                  </span>
                </label>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {required} from 'vuelidate/lib/validators'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    layout: 'auth',
    components: {
      Loading
    },
    middleware: 'permission',
    meta: {
      permission: {name: 'gedcom import menu'}
    },
    data() {
      return {
        error: false,
        message: "",
        errors: null,
        file: undefined,
        fileName: '',
        isLoading: false,
        fullPage: true,
        color: '#4fcf8d',
        backgroundColor: '#ffffff',
        response: null,
        inProgress: 0,
        interval: null,
        generatedFile: null
      };
    },
    methods: {
      async handleExportFiles() {
        const response = this.$axios
          .$post("/api/gedcom-export", {}, {
            headers: {
              'content-type': 'multipart/form-data',
              'Access-Control-Allow-Origin': '*'
            },
          },)
        this.inProgress = true;
        this.isLoading = false;
        this.generatedFile = response.file;


        // this.interval = setInterval(() => {
        //   this.checkJobCompleted();
        // }, 3000)

        (error => {
          this.error = true;
          this.inProgress = false;
          this.errors = error.response.data.errors;
        });
      },

      async checkJobCompleted() {
        await this.$axios
           .$post("/api/check-gedcom-export", {}, {
            headers: {
              'content-type': 'multipart/form-data',
              'Access-Control-Allow-Origin': '*'
            }
          })
          console.log(response);
      }
    }
  }

</script>
