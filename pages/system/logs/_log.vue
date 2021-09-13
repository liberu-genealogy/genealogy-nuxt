<template>
    <card class="is-rounded raises-on-hover"
        @remove="$router.push({ name: 'system.logs.index' })
            .catch(routerErrorHandler)"
        v-if="log">
        <card-header class="has-background-light">
            <template v-slot:title>
                <p>
                    {{ i18n('The log file') }}
                    <code>{{ log.name }}</code>
                    {{ i18n('was last updated') }}
                    {{ log.modified ? timeFromNow(log.modified) : null }}
                    {{ i18n('ago') }}.
                    {{ i18n('Current file size is') }} {{ log.size }} {{ i18n('MB') }}
                </p>
            </template>
            <template v-slot:controls>
                <card-control>
                    <a class="icon is-small has-text-info"
                        :href="route('system.logs.download', log.name)">
                        <fa icon="cloud-download-alt"/>
                    </a>
                </card-control>
                <card-control>
                    <confirmation placement="bottom"
                        @confirm="empty(log)">
                        <span class="icon is-small has-text-danger">
                            <fa icon="trash-alt"/>
                        </span>
                    </confirmation>
                </card-control>
                <card-refresh @refresh="fetch()"/>
                <card-remove/>
            </template>
        </card-header>
        <card-content class="is-paddingless"
            :key="log.modified">
            <pre class="log" v-hljs>
                <code class="php">
                    {{ log.content || i18n('The log file is empty') }}
                </code>
            </pre>
        </card-content>
    </card>
</template>
<router>
{
    name: 'system.logs.show',
}
</router>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCloudDownloadAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
    Card, CardHeader, CardRefresh, CardRemove, CardControl, CardContent,
} from '@enso-ui/card/bulma';
import Confirmation from '@enso-ui/confirmation/bulma';
import { hljs } from '@enso-ui/directives';

library.add(faCloudDownloadAlt, faTrashAlt);

export default {
    meta: {
        breadcrumb: 'show',
        title: 'Show Log',
    },

    inject: ['errorHandler', 'i18n', 'route', 'routerErrorHandler', 'toastr'],

    directives: { hljs },

    components: {
        Card, CardHeader, CardRefresh, CardRemove, CardControl, CardContent, Confirmation,
    },

    data: () => ({
        log: null,
        content: null,
    }),

    created() {
        this.fetch();
    },

    methods: {
        fetch() {
            this.$axios.get(this.route('system.logs.show', this.$route.params.log))
                .then(({ data }) => {
                    this.log = data;
                }).catch(this.errorHandler);
        },
        empty() {
            this.$axios.delete(this.route('system.logs.destroy', this.log.name)).then(({ data }) => {
                this.log = data.log;
                this.toastr.success(data.message);
            }).catch(this.errorHandler);
        },
        timeFromNow(date) {
            return this.$formatDistance(date);
        },
    },
};
</script>

<style src="highlight.js/styles/atom-one-light.css"></style>

<style lang="scss">
    pre.log {
        background-color: unset;
        padding: 0;
    }
</style>
