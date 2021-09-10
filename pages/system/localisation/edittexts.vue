<template>
    <div class="wrapper">
        <div class="columns is-multiline">
            <div class="column">
                <div class="columns is-multiline">
                    <div class="column is-half">
                        <enso-select :options="locales"
                            v-model="selectedLocale"
                            @input="getLangFile()"
                            :placeholder="i18n('Choose language')"/>
                    </div>
                    <div class="column is-half has-text-right animated fadeIn is-hidden-mobile"
                        v-if="selectedLocale">
                        <p class="pt-1">
                            <b>{{ keysCount }}</b> {{ i18n('keys found') }}
                        </p>
                    </div>
                    <div class="column animated fadeIn"
                        v-if="selectedLocale">
                        <div class="field">
                            <p class="control has-icons-left has-icons-right">
                                <input type="text"
                                    class="input is-rounded"
                                    v-focus
                                    v-select-on-focus
                                    :placeholder="i18n('Search')"
                                    v-model="query"
                                    @keyup.enter="isNewKey ? addKey() : focusIt(null)">
                                <span class="icon is-small is-left">
                                    <fa icon="search"/>
                                </span>
                                <span class="icon is-small is-right clear-button"
                                    v-if="query"
                                    @click="query = null">
                                    <a class="delete is-small"/>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="columns is-mobile has-text-centered">
                    <div class="column is-half"
                        v-if="selectedLocale">
                        <button class="button is-success is-fullwidth"
                            v-if="isNewKey"
                            @click="addKey()">
                            {{ i18n('Add Key') }}
                        </button>
                    </div>
                    <div class="column is-half"
                        v-if="!selectedLocale && meta.env === 'local'">
                        <button class="button is-warning"
                            @click="merge()"
                            v-if="canAccess('system.localisation.merge')">
                            {{ i18n('Merge all localisation files') }}
                        </button>
                    </div>
                    <div class="column is-half"
                        v-if="selectedLocale">
                        <button @click="saveLangFile()"
                            class="button is-success is-fullwidth"
                            :class="{ 'is-loading': loading }">
                            {{ i18n('Update') }}
                        </button>
                    </div>
                </div>
                <div class="columns is-mobile has-text-right"
                    v-if="selectedLocale">
                    <div class="column">
                        <label class="label">
                            {{ i18n('Core') }}
                            <vue-switch class="mx-2"
                                v-model="filterCore"
                                size="is-large"/>
                            {{ i18n('App') }}
                        </label>
                    </div>
                    <div class="column">
                        <label class="label">
                            {{ i18n('Only missing') }}
                            <vue-switch class="ml-2"
                                v-model="filterMissing"
                                size="is-large"/>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="box has-background-light raises-on-hover mt-3"
            v-if="selectedLocale">
            <div class="columns is-hidden-mobile has-shadow-bottom"
                v-if="filteredKeys.length">
                <div class="column is-half has-text-centered">
                    <h6 class="title is-6">
                        {{ i18n('Key') }}
                    </h6>
                </div>
                <div class="column is-half has-text-centered">
                    <h6 class="title is-6">
                        {{ i18n('Value') }}
                    </h6>
                </div>
            </div>
            <div class="has-text-centered"
                v-else>
                <h5 class="subtitle is-5">
                    {{ i18n('No keys found') }}
                </h5>
            </div>
            <div :style="styleObject">
                <div class="columns"
                    :key="index"
                    v-for="(key, index) in filteredKeys">
                    <div class="column is-half">
                        <input type="text" class="input" readonly :value="key">
                    </div>
                    <div class="column is-half">
                        <div class="field has-addons">
                            <p class="control is-expanded">
                                <input type="text"
                                    v-select-on-focus
                                    v-model="langFile[key]"
                                    :id="key"
                                    class="input"
                                    @keyup.enter="focusIt('search-input')">
                            </p>
                            <p class="control">
                                <a class="button is-outlined is-danger"
                                    @click="removeKey(key)">
                                    <span class="icon is-small">
                                        <fa icon="trash-alt"/>
                                    </span>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<router>
{
    name: 'system.localisation.editTexts',
}
</router>

<script>
import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { focus, selectOnFocus } from '@enso-ui/directives';
import { EnsoSelect } from '@enso-ui/select/bulma';
import VueSwitch from '@enso-ui/switch/bulma';

library.add(faSearch, faTrashAlt);

export default {
    meta: {
        breadcrumb: 'edit texts',
        title: 'Edit Texts',
    },

    inject: ['canAccess', 'errorHandler', 'i18n', 'route', 'toastr'],

    directives: { focus, selectOnFocus },

    components: { EnsoSelect, VueSwitch },

    data: () => ({
        langFile: {},
        originalLangFile: {},
        locales: [],
        selectedLocale: null,
        query: null,
        boxHeight: 0,
        loading: false,
        filterMissing: false,
        filterCore: true,
    }),

    computed: {
        ...mapState('layout', ['isMobile']),
        ...mapState(['meta']),
        styleObject() {
            return {
                'max-height': this.boxHeight,
                'overflow-y': 'auto',
                'overflow-x': 'hidden',
            };
        },
        langKeys() {
            return this.filterMissing
                ? Object.keys(this.originalLangFile).filter(key => !this.originalLangFile[key])
                : Object.keys(this.langFile);
        },
        filteredKeys() {
            if (!this.query) {
                return this.sortedKeys();
            }

            const query = this.query.toLowerCase();

            return this.langKeys.filter(key => (key.toLowerCase().indexOf(query) > -1
                || (this.langFile[key] && this.langFile[key].toLowerCase().indexOf(query) > -1)));
        },
        isNewKey() {
            return this.selectedLocale
                && this.query && this.filteredKeys.indexOf(this.query) === -1;
        },
        keysCount() {
            return this.langKeys.length;
        },
        subDir() {
            return this.filterCore ? 'app' : 'enso';
        },
    },

    watch: {
        isMobile: {
            handler: 'setBoxHeight',
        },
        filterCore: {
            handler: 'getLangFile',
        },
    },

    created() {
        this.init();
        this.setBoxHeight();
    },

    methods: {
        init() {
            this.loading = true;

            this.$axios.get(this.route('system.localisation.editTexts'))
                .then(({ data }) => {
                    this.loading = false;
                    this.locales = data;
                }).catch(this.errorHandler);
        },
        getLangFile() {
            if (!this.selectedLocale) {
                this.langFile = {};
                this.updateOriginal();
                return;
            }

            this.loading = true;

            this.$axios.get(this.route('system.localisation.getLangFile', {
                subDir: this.subDir,
                language: this.selectedLocale,
            })).then(({ data }) => {
                this.loading = false;
                this.langFile = data;
                this.updateOriginal();
            }).catch(this.errorHandler);
        },
        saveLangFile() {
            this.loading = true;

            this.$axios.patch(this.route('system.localisation.saveLangFile', {
                subDir: this.subDir,
                language: this.selectedLocale,
            }), {
                langFile: this.langFile,
            }).then(({ data }) => {
                this.loading = false;
                this.toastr.success(data.message);
            }).catch(this.errorHandler);
        },
        addKey() {
            this.$set(this.langFile, this.query, null);
            this.updateOriginal();
            this.focusIt();
        },
        removeKey(key) {
            this.$delete(this.langFile, key);
            this.updateOriginal();
        },
        focusIt(id = null) {
            id = id || this.query;

            this.$nextTick(() => {
                document.getElementById(id).focus();
            });
        },
        setBoxHeight() {
            this.boxHeight = document.body.clientHeight - (this.isMobile ? 420 : 388);
        },
        updateOriginal() {
            this.originalLangFile = JSON.parse(JSON.stringify(this.langFile));
        },
        merge() {
            this.$axios.patch(this.route('system.localisation.merge'))
                .then(({ data }) => {
                    this.loading = false;
                    this.toastr.success(data.message);
                }).catch(this.errorHandler);
        },
        sortedKeys() {
            return this.langKeys.sort((a, b) => {
                if (a.toLowerCase() < b.toLowerCase()) {
                    return -1;
                }

                if (a.toLowerCase() > b.toLowerCase()) {
                    return 1;
                }

                return 0;
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .has-shadow-bottom {
        -webkit-box-shadow: 0px 3px 5px -4px lightgray;
        box-shadow: 0px 3px 5px -4px lightgray;
    }

    .icon.clear-button {
        pointer-events: all;
    }
</style>
