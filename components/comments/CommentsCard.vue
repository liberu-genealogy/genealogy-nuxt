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
            <comments :id="id"
                ref="comments"
                :type="type"
                :query="query"
                @update="count = $refs.comments.count; $refs.card.resize()"/>
        </card-content>
    </card>
</template>

<script>
import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComments, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import {
    Card, CardHeader, CardRefresh, CardCollapse, CardBadge, CardContent,
} from '@enso-ui/card/bulma';
import Comments from './Comments.vue';

library.add(faComments, faPlusSquare);

export default {
    name: 'CommentsCard',

    components: {
        Card, CardHeader, CardRefresh, CardCollapse, CardBadge, CardContent, Comments,
    },

    inject: ['i18n'],

    props: {
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
        icon: {
            type: [String, Array, Object],
            default: () => faComments,
        },
    },

    data: () => ({
        count: 0,
        query: null,
    }),

    computed: {
        ...mapState('layout', ['isMobile']),
        displayTitle() {
            return !this.isMobile
                ? this.title || this.i18n('Comments')
                : null;
        },
        isEmpty() {
            return this.count === 0;
        },
    },

    watch: {
        count() {
            this.$refs.card.resize();
        },
    },

    methods: {
        addComment() {
            this.$refs.comments.create();
            this.$nextTick(() => this.$refs.card.expand());
        },
    },
};
</script>
