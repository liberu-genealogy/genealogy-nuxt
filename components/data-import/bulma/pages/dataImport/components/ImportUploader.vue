<template>
    <div class="is-flex">
        <a class="button is-info mr-2"
            :href="templateLink">
            <span>{{ i18n('Template') }}</span>
            <span class="icon is-small">
                <fa icon="download"/>
            </span>
        </a>
        <enso-uploader :url="path"
            :params="params"
            :file-size-limit="fileSizeLimit"
            file-key="import"
            @upload-start="loading = true"
            @upload-error="loading = false"
            @upload-successful="uploaded"
            ref="uploader">
            <template #control="{ controlEvents }"
                v-if="!hasErrors">
                <a :class="['button is-success', { 'is-loading': loading }]"
                    v-on="controlEvents">
                    <slot>
                        <span>{{ i18n('Import') }}</span>
                        <span class="icon is-small">
                            <fa icon="upload"/>
                        </span>
                    </slot>
                </a>
            </template>
        </enso-uploader>
        <Summary :summary="summary"
            @close="summary = null"
            v-if="hasErrors"/>
    </div>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { EnsoUploader } from '@enso-ui/uploader/bulma';
import Summary from './Summary.vue';

library.add(faUpload);

export default {
    name: 'ImportUploader',

    components: { Fa, EnsoUploader, Summary },

    inject: ['canAccess', 'http', 'i18n', 'route'],

    props: {
        fileSizeLimit: {
            type: Number,
            default: 100 * 1000 * 1000,
        },
        params: {
            type: Object,
            required: true,
            validator: v => Object.keys(v).includes('type'),
        },
        path: {
            type: String,
            required: true,
        },
    },

    emits: ['upload-successful'],

    data: () => ({
        loading: false,
        summary: null,
    }),

    computed: {
        hasErrors() {
            return !!this.summary
                && !!this.summary.errors
                && Object.keys(this.summary.errors).length > 0;
        },
        templateLink() {
            return this.canAccess('import.template')
                && this.route('import.template', this.params.type);
        },
    },

    methods: {
        uploaded($event) {
            this.summary = $event;
            this.loading = false;
            this.$emit('upload-successful');
        },
        browseFiles() {
            this.$refs.uploader.browseFiles();
        },
    },
};
</script>
