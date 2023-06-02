<template>
    <div>
        <loading :active.sync="isLoading" :color="color" :background-color="backgroundColor"> </loading>
        <div class="columns is-gapless is-multiline is-mobile">
            <div class="column is-12">
                <h1 class="is-size-4 has-text-black">
                    <span class="has-text-weight-medium">DNA Upload</span>
                </h1>
            </div>
            <div class="column is-12">
                <nav class="breadcrumb mt-1 mb-0" aria-label="breadcrumbs">
                    <ul>
                        <li><a class="is-size-7 has-text-weight-medium has-text-link"
                                href="/dashboard">Home</a></li>
                        <li class="is-size-7 has-text-weight-medium is-active"><a href="/dashboard"
                                aria-current="page">DNA Upload</a></li>
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
                            <input type="hidden" v-model="fileName">
                            <div class="field import_block">
                                <div class="file is-large is-boxed has-background-primary">
                                    <label class="file-label">
                                        <input class="file-input" type="file" @change="handleSelectedFiles" name="file" ref="fileInput">
                                        <span class="file-cta">
                                            <span class="file-label">
                                                <span class="file-icon">
                                                    <font-awesome-icon :icon="['fas', 'upload']"/>
                                                </span>
                                                Select DNA File
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                <p class="help"  :class="{ 'is-danger': $v.fileName.$error }" v-if="!$v.fileName.required">Field is required</p>
                            </div>
                            <button type="submit" class="button theme-button theme-button-xl has-background-primary is-uppercase has-text-weight-medium has-text-white">Submit</button>
                            <ul class="bullet_list mt-5">
                                <li>We value your privacy and do not share your DNA data with any third parties. Your DNA file is used by the website only for processing your matches to other DNA data uploaded. We do not use your DNA file for any other purpose.</li>
                                <li>We currently support exports from: Ancestry, Family Tree DNA, 23andMe, MyHeritage, DNA.Land, Codigo 46, Genes for Good, LivingDNA, Mapmygenome, Sano Genetics and tellmeGen.
                                </li>
                                <li>DNA uploading and matching is free for everyone.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<router>
{
    name: 'dna.create'
}
</router>
<script>
import { required } from 'vuelidate/lib/validators'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
layout: 'auth',
    meta: {
        permission: { name: 'dna menu' },
        title: 'DNA - Upload'
    },
    components: {
        Loading
    },
    data() {
        return {
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
        };
    },
    validations: {
        fileName: {
            required,
        },
    },
    methods: {
        handleSelectedFiles(event) {
            this.file = this.$refs.fileInput.files[0]
            this.fileName = this.file.name
        },
        submit() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                console.log("fail")
            } else {
                this.isLoading = true
                const formData = new FormData()
                formData.append('file',  this.file)
                this.$axios
                .$post("/api/dna", formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                })

                    this.isLoading = false
                    this.$router.push('/dna')
                .catch(error => {
                    this.error = true;
                    this.isLoading = false;
                    this.message = error.response.data[0];
                    this.errors =  error.response.data.errors;
                });
            }
        }
    }
}
</script>
