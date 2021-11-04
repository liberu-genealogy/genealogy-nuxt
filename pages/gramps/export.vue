<template>
  <div>
    <loading :active.sync="isLoading" :color="color" :background-color="backgroundColor"></loading>
    <div class="columns is-gapless is-multiline is-mobile">
      <div class="column is-12">
        <h1 class="is-size-4 has-text-black">
          <span class="has-text-weight-medium">Export Gramps XML</span>
        </h1>
      </div>
      <div class="column is-12">
        <nav class="breadcrumb mt-1 mb-0" aria-label="breadcrumbs">
          <ul>
            <li><a class="is-size-7 has-text-weight-medium has-text-link"
                   href="/dashboard">Home</a></li>
            <li class="is-size-7 has-text-weight-medium is-active"><a href="/dashboard"
                                                                      aria-current="page">Export Gramps XML</a></li>
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
                          Generating a Gramps XML file
                      </span>
                  </span>
                </label>
              </div>
            </div>
            <a v-if="generatedFile" class="field import_block">
              <div class="file is-large is-boxed has-background-primary">
                <label class="file-label">
                  <span class="file-cta" @click="downloadFile">
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
<router>
{
  name: 'gramps.index'
}
</router>
<script>
  import {required} from 'vuelidate/lib/validators'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  import FileSaver  from 'file-saver';
  export default {
    layout: 'auth',
    components: {
      Loading
    },
    head: {
      title: 'Gramps XML Export'
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
        generatedFile: null,
        fileName: ''
      };
    },
    methods: {
      handleExportFiles() {
        this.$axios.$get('/api/gramps-export', {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }).then(res => {
          this.inProgress = true
          this.isLoading = false
          this.generatedFile =  new Blob([res.file])
          this.fileName = res.name
        }).catch(err => {
          console.log("error");
          console.log(err);
        })
      },
      downloadFile() {
        FileSaver.saveAs(this.generatedFile, this.fileName);
        this.generatedFile = null
        this.fileName = ''
      },
      async checkJobCompleted() {
        await this.$axios
           .$post("/api/check-gramps-export", {}, {
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
<style type="text/css" scoped>
.file.is-large.is-boxed{
    border-radius: 5px;
    padding:  5px 0;
}
.file-label {
    color: #fff;
    font-size: 1.25rem;
    background: transparent !important;
    border: none;
    width: 100%;
    text-align: center;
    flex-direction: row !important;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
}

.file-cta {
    padding:  0 !important;
    background-color: #4FCF8D !important;
}
</style>
