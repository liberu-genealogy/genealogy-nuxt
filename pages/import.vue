<template>
    <div class="wrapper">
        <div class="columns is-variable is-2 is-mobile is-multiline">
            <div class="column is-3-desktop is-half-touch">
                <enso-select v-model="type"
                    :options="enums.importTypes._select()"
                    placeholder="Import Type"
                    @input="type ? template() : null"/>
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
            <template v-slot:type="{ column, row }">
                <span class="tag is-table-tag is-info">
                    {{ column.enum._get(row.type) }}
                </span>
            </template>
            <template v-slot:entries="{ row }">
                <strong class="has-text-info">
                    {{ row.entries || '-' }}
                </strong>
            </template>
            <template v-slot:successful="{ row }">
                <strong class="has-text-success">
                    {{ row.successful === null ? '-' : row.successful }}
                </strong>
            </template>
            <template v-slot:failed="{ row }">
                <strong class="has-text-danger">
                    {{ row.failed === null ? '-' : row.failed }}
                </strong>
            </template>
            <template v-slot:status="{ column, row }">
                <span :class="['tag is-table-tag', enums.importCssClasses._get(row.status)]">
                    {{ column.enum._get(row.status) }}
                </span>
            </template>
            <template v-slot:createdBy="{ row }">
                <avatar class="is-24x24"
                    :user="row.createdBy"/>
            </template>
        </enso-table>
    </div>
</template>
<router>
{
    name: 'import.index',
}
</router>

<script>
import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faDownload, faTrashAlt, faFileExcel, faBan, faSync,
} from '@fortawesome/free-solid-svg-icons';
import { EnsoTable } from '@enso-ui/tables/bulma';
import { EnsoSelect } from '@enso-ui/select/bulma';
import Avatar from '~/components/users/bulma/pages/users/components/Avatar.vue';
import ImportUploader from '~/components/data-import/bulma/pages/dataImport/components/ImportUploader.vue';
import Param from '~/components/data-import/bulma/pages/dataImport/components/Param.vue';

library.add(faDownload, faTrashAlt, faFileExcel, faBan, faSync);

export default {
    meta: {
        breadcrumb: 'data import',
        title: 'Data Import',
    },

    inject: ['canAccess', 'errorHandler', 'i18n', 'route'],

    components: {
        Avatar,
        EnsoSelect,
        EnsoTable,
        ImportUploader,
        Param,
    },

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
            this.$axios.get(this.route('import.show', this.type))
                .then(({ data: { params } }) => (this.params = params))
                .catch(this.errorHandler);
        },
        //  eslint-disable-next-line camelcase
        rejected({ rejected_id }) {
            window.location.href = this.route('import.rejected', rejected_id);
        },
    },
};
</script>
