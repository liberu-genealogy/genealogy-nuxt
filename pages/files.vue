<template>
    <enso-tabs>
        <template v-slot:label="{ tab }">
            <span>
                {{ i18n(tab) }}
            </span>
            <span class="tag is-dark file-counter ml-2">
                {{ content(tab).length }}
            </span>
        </template>
        <div class="files-index columns is-reverse-mobile">
            <div class="column is-two-thirds">
                <tab v-for="folder in folders"
                    :key="folder"
                    :id="folder">
                    <transition-group class="columns is-multiline is-mobile folder-content"
                        enter-active-class="fadeInUp"
                        leave-active-class="fadeOutDown"
                        tag="div"
                        @scroll="computeScrollPosition">
                        <div class="column is-half-mobile is-one-third-desktop animated"
                            v-for="file in content(folder)"
                            :key="file.id">
                            <file :file="file"
                                @delete="destroy(file.id)"/>
                        </div>
                    </transition-group>
                </tab>
            </div>
            <div class="column is-one-third">
                <div class="mt-1">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input is-rounded search-files"
                            :placeholder="i18n('Filter')"
                            v-model="query">
                        <span class="icon is-small is-left">
                            <fa icon="search"/>
                        </span>
                        <span class="icon is-small is-right clear-button"
                            v-if="query && !loading">
                            <a class="delete is-small"
                                @click="query = null"/>
                        </span>
                    </p>
                </div>
                <div class="field is-grouped mt-3">
                    <enso-uploader multiple
                        :url="uploadUrl"
                        file-key="upload"
                        @upload-successful="addUploadedFiles"/>
                    <a class="button is-fullwidth"
                        :class="{ 'is-loading': loading }"
                        @click="fetch()">
                        <span>
                            {{ i18n('Load More') }}
                        </span>
                        <span class="icon">
                            <fa icon="sync-alt"/>
                        </span>
                    </a>
                </div>
                <enso-date-filter class="box raises-on-hover mt-3"
                    value="today"
                    @update="interval = $event; reset()"/>
                <div class="box has-background-light raises-on-hover">
                    <h5 class="title is-5 has-text-centered">
                        {{ i18n('Storage Usage') }}:
                        <span :class="status">
                            {{ storageUsage }} %
                        </span>
                    </h5>
                    <chart :data="chartData"
                        :options="{ aspectRatio: 1 }"
                        type="doughnut"
                        v-if="!isMobile && stats.filteredSpaceUsed > 0"/>
                </div>
            </div>
        </div>
    </enso-tabs>
</template>
<router>
{
    name: 'core.files.index',
}
</router>

<script>
import { debounce } from 'lodash';
import { mapState, mapGetters } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faUndo, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { Tab, EnsoTabs } from '@enso-ui/tabs/bulma';
import { EnsoDateFilter } from '@enso-ui/filters/bulma';
import { Chart } from '@enso-ui/charts/bulma';
import { EnsoUploader } from '@enso-ui/uploader/bulma';
import { colors } from '@enso-ui/charts';
import File from '~/components/files/bulma/pages/files/components/File.vue';3
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

library.add(faSearch, faUndo, faSyncAlt);

export default {
    meta: {
        breadcrumb: 'files',
        title: 'Files',
    },

    components: {
        EnsoTabs, Tab, File, Chart, EnsoDateFilter, EnsoUploader
    },
    setup() {
        const inject = ref(['errorHandler', 'i18n', 'route']);
        const loading =ref(false);
        const files = ref([]);
        const folders = ref([]);
        const stats = ref({});
        const query = ref(null);
        const offset = ref(0);
        const interval = ref({
            min = null,
            max = null
        });

        const store = useStore();
        return {
            one: computed(() => store.getters['${preferences}/locale:lang']),
            two: computed(() => store.state[layout].isMobile),
        }
        const uploadUrl = computed(() => {
            return this.route('core.uploads.store');
        });
        const colors = computed(() => {
            return colors.slice(0, this.folders.length);
        });
        const foldersStats = computed(() => {
            return this.folders.map(folder => this.content(folder)
                .reduce((total, { size }) => (total += size), 0));
        });
        const chartData = computed(() => {
            return {
                labels: this.folders,
                datasets: [{
                    data: this.foldersStats,
                    backgroundColor: this.colors,
                    datalabels: {
                        backgroundColor: this.colors,
                        formatter: val => `${this.$numberFormat(val / 1000)} KB`,
                    },
                }],
            };  
        });
        const storageUsage = computed(() => {
            return this.stats.totalSpaceUsed
                && this.$numberFormat(this.stats.totalSpaceUsed * 100 / this.stats.storageLimit, 2);            
        });
        const status = computed(() => {
            return this.storageUsage < 95
                ? 'has-text-success'
                : 'has-text-danger';
        });
        const query = ref('');
        watch(query, () => {
            this.reset();
        });
        created(() => {
            this.fetch - debounce(this.fetch, 300);
        });
        function reset() {
            this.files = [];
            this.offset = 0;
            this.fetch();
        }
        function fetch() {
            this.loading = true;
            this.$axios.get(this.route('core.files.index'), {
                params: { interval: this.interval, query: this.query, offset: this.offset },
            }).then(({ data }) => {
                this.files.push(...data.data);
                this.offset += data.data.length;
                this.folders = data.folders;
                this.stats = data.stats;
                this.loading = false;
            }).catch(this.errorHandler);
        }
        function destroy(id) {
            this.loading = true;
            this.$axios.delete(this.route('core.files.destroy', id, false))
                .then(() => {
                    const index = this.files.findIndex(file => file.id === id);
                    this.files.splice(index, 1);
                    this.loading = false;
                }).catch(this.errorHandler);
        }
        function content(folder) {
            return this.files.filter(({ type }) => type === folder);
        }
        function addUploadedFiles(files) {
            this.files.push(...files);
        }
        function computeScrollPosition(event) {
            const position = event.target.scrollTop;
            const total = event.target.scrollHeight - event.target.clientHeight;
            if (position / total > 0.8) {
                this.fetch();
            }
        }
    }

}
</script>

<style lang="scss">
    .files-index {
        input.search-files {
            width: 100%;
        }

        .control.has-icons-right .icon.clear-button {
            pointer-events: all;
        }

        .tag.file-counter {
            height: unset;
        }
    }
</style>