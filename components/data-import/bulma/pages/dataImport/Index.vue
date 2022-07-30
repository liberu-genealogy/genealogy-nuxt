<template>
    <div class="wrapper">
        <div class="columns is-variable is-2 is-mobile is-multiline">
            <div class="column is-3-desktop is-half-touch">
                <enso-select v-model="type"
                    :options="enums.importTypes._select()"
                    placeholder="Import Type"
                    @update:model-value="type ? template() : null"/>
            </div>
            <template v-if="type">
                <div v-for="param in params"
                    class="column is-3-desktop is-half-touch"
                    :key="param.name">
                    <slot :name="param.name"
                        v-if="param.type === 'slot'"/>
                    <Param :param="param"
                        v-else/>
                </div>
                <div class="column"/>
                <div class="column is-narrow">
                    <import-uploader :path="importLink"
                        :params="uploadParams"
                        @upload-successful="$refs.imports.fetch()"/>
                </div>
            </template>
        </div>
        <enso-table class="box is-paddingless raises-on-hover"
            id="dataImports"
            :filters="filters"
            @download-rejected="rejected"
            ref="imports">
            <template #type="{ column, row }">
                <span class="tag is-table-tag is-info">
                    {{ column.enum._get(row.type) }}
                </span>
            </template>
            <template #entries="{ row }">
                <strong class="has-text-info">
                    {{ row.entries || '-' }}
                </strong>
            </template>
            <template #successful="{ row }">
                <strong class="has-text-success">
                    {{ row.successful === null ? '-' : row.successful }}
                </strong>
            </template>
            <template #failed="{ row }">
                <strong class="has-text-danger">
                    {{ row.failed === null ? '-' : row.failed }}
                </strong>
            </template>
            <template #status="{ column, row }">
                <span :class="['tag is-table-tag', enums.importCssClasses._get(row.status)]">
                    {{ column.enum._get(row.status) }}
                </span>
            </template>
            <template #createdBy="{ row }">
                <avatar class="is-24x24"
                    :user="row.createdBy"/>
            </template>
        </enso-table>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faDownload, faTrashAlt, faFileExcel, faBan, faSync,
} from '@fortawesome/free-solid-svg-icons';
import { EnsoTable } from '@enso-ui/tables/bulma';
import { EnsoSelect } from '@enso-ui/select/bulma';
import { Avatar } from '@enso-ui/users';
import ImportUploader from './components/ImportUploader.vue';
import Param from './components/Param.vue';

library.add(faDownload, faTrashAlt, faFileExcel, faBan, faSync);

export default {
    name: 'Index',

    components: {
        Avatar,
        EnsoSelect,
        EnsoTable,
        ImportUploader,
        Param,
    },

    inject: ['canAccess', 'errorHandler', 'http', 'i18n', 'route'],

    data: () => ({
        type: null,
        params: [],
    }),

    computed: {
        ...mapState(['enums']),
        filters() {
            return { data_imports: { type: this.type } };
        },
        importLink() {
            return this.canAccess('import.store')
                && this.type
                && this.route('import.store');
        },
        uploadParams() {
            return this.params.reduce((params, param) => {
                params[param.name] = param.value;
                return params;
            }, { type: this.type });
        },
    },

    methods: {
        template() {
            this.http.get(this.route('import.show', this.type))
                .then(({ data: { params } }) => (this.params = params))
                .catch(error => {
                    this.type = null;
                    this.errorHandler(error);
                });
        },
        rejected({ rejected: { id } }) {
            window.location.href = this.route('import.rejected', id);
        },
    },
};
</script>
