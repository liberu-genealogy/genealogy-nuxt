<template>
    <div class="level is-mobile mb-4">
        <div class="level-left">
            <div class="level-item">
                <div class="field has-addons has-addons-right">
                    <div class="control has-icons-left has-icons-right">
                        <input class="input filter"
                            :value="query"
                            @input="$emit('update:query', $event.target.value)"
                            type="text"
                            :placeholder="i18n('Filter files')">
                        <span class="icon is-small is-left">
                            <fa icon="search"/>
                        </span>
                        <span class="icon is-small is-right clear-button"
                            @click="$emit('clear')"
                            v-if="query">
                            <a class="delete is-small"/>
                        </span>
                    </div>
                </div>
            </div>
            <div class="level-item"
                v-if="count > 0">
                <span>
                    {{ count }} {{ i18n('files')}}
                </span>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <enso-uploader v-bind="$attrs"
                    compact
                    multiple
                    :url="route('core.uploads.store')"
                    file-key="upload"/>
            </div>
            <div class="level-item">
                <a class="button"
                    @click="$emit('refresh')">
                    <span class="icon">
                        <fa icon="sync"/>
                    </span>
                </a>
            </div>
        </div>
    </div>
    <enso-date-filter class="box raises-on-hover"
        v-bind="$attrs"
        v-model:filter="dateFilter"
        compact/>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faSync } from '@fortawesome/free-solid-svg-icons';
import { EnsoUploader } from '@enso-ui/uploader/bulma';
import { EnsoDateFilter } from '@enso-ui/filters/bulma';

library.add(faSearch, faSync);

export default {
    name: 'Top',

    components: { Fa, EnsoDateFilter, EnsoUploader },

    inject: ['i18n', 'route'],

    props: {
        count: {
            type: Number,
            required: true,
        },
        query: {
            type: String,
            required: true,
        },
    },

    emits: ['clear', 'refresh', 'update:query'],

    data: () => ({
        dateFilter: 'thisMonth',
    }),
};
</script>
