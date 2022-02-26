<template>
    <card collapsible
        :collapsed="collapsed">
        <card-header class="has-background-light">
            <template v-slot:title>
                <span class="icon is-small mr-1">
                    <fa :icon="icon"/>
                </span>
                {{ displayTitle }}
            </template>
            <template v-slot:controls>
                <card-refresh @refresh="fetch"/>
                <card-badge :label="count"/>
                <card-collapse/>
            </template>
        </card-header>
        <card-content class="is-paddingless">
            <documents v-bind="$attrs"
                :id="id"
                :type="type"
                :query="query"
                @update="count = $refs.documents.count; $refs.card.resize()"
                v-on="$listeners"
                ref="documents"/>
        </card-content>
    </card>
</template>

<script>
import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import {
    Card, CardHeader, CardRefresh, CardCollapse, CardBadge, CardContent,
} from '@enso-ui/card/bulma';
import Documents from './Documents.vue';
import { ref, computed, useStore, watch } from 'vue';

library.add(faCopy, faPlusSquare);

export default {
    name: 'DocumentsCard',

    components: {
        Card, CardHeader, CardRefresh, CardCollapse, CardBadge, CardContent, Documents,
    },

    inject: ['i18n', 'route'],

    props: {
        icon: {
            type: [String, Array, Object],
            default: () => faCopy,
        },
        collapsed: {
            type: Boolean,
            default: false,
        },
        id: {
            type: [String, Number],
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            default: '',
        },
    },
    setup() {
        const query = ref('')
        const count = ref(0)
        const store = useStore()
        return {
            one: computed(() => store.state[layout].isMobile)
        }
        const isEmpty = computed(() => {
            return this.count === 0;
        })
        const uploadLink = computed(() => {
            return this.route('core.documents.store');
        })
        const displayTitle = computed(() => {
            return !this.isMobile
                ? this.title || this.i18n('Documents')
                : null;
        })
        const count = ref('')
        watch(count, () => {
            this.$refs.card.resize();
        })
    },
};
</script>
