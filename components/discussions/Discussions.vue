<template>
    <div class="discussions-wrapper">
        <inputor class="raises-on-hover animated fadeIn"
            :message="discussion"
            placeholder="Share your idea..."
            title
            type="discussion"
            @store="store()"
            @update="update()"
            @cancel="
                inputor = false;
                discussion = discussion.id ? discussion : null
            "
            v-if="inputor"/>
        <discussion class="animated fadeIn"
            :discussion="discussion"
            @edit="inputor = true"
            @back="discussion = null; fetch()"
            @delete="destroy()"
            v-else-if="discussion"/>
        <template v-else>
            <div class="field is-grouped">
                <p class="control">
                    <a class="button is-rounded is-small is-bold is-info"
                        @click="discussion = factory(); inputor = true;">
                        <span>
                            {{ i18n('New Topic') }}
                        </span>
                        <span class="icon">
                            <fa icon="plus"/>
                        </span>
                    </a>
                </p>
                <p class="control has-icons-left has-icons-right is-expanded">
                    <input v-model="query"
                        class="input is-rounded is-small is-expanded"
                        type="text"
                        :placeholder="i18n('Filter')">
                    <span class="icon is-small is-left">
                        <fa icon="search"/>
                    </span>
                    <span v-if="query"
                        class="icon is-small is-right clear-button"
                        @click="query = ''">
                        <a class="delete is-small"/>
                    </span>
                </p>
                <p class="control">
                    <a class="button is-rounded is-small is-bold ml-2"
                        @click="fetch()">
                        <span>
                            {{ i18n('Reload') }}
                        </span>
                        <span class="icon">
                            <fa icon="sync"/>
                        </span>
                    </a>
                </p>
            </div>
            <div class="discussions p-1">
                <div class="box has-background-light raises-on-hover"
                    v-for="(topic, index) in filteredDiscussions"
                    :key="index">
                    <discussion-preview class="is-clickable"
                        :discussion="topic"
                        :last="index === discussions.length - 1"
                        @click.native="discussion = topic"/>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faSearch, faSync } from '@fortawesome/free-solid-svg-icons';
import Discussion from './Discussion.vue';
import DiscussionPreview from './DiscussionPreview.vue';
import Inputor from './Inputor.vue';

library.add(faPlus, faSearch, faSync);

export default {
    name: 'Discussions',

    components: { Discussion, DiscussionPreview, Inputor },

    inject: ['errorHandler', 'i18n', 'route'],

    props: {
        id: {
            type: [String, Number],
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },

    data: () => ({
        query: '',
        inputor: false,
        discussion: null,
        discussions: [],
        loading: false,
    }),

    computed: {
        filteredDiscussions() {
            return this.query
                ? this.discussions.filter((discussion) => this.containsQuery(discussion))
                : this.discussions;
        },
        count() {
            return this.filteredDiscussions.length;
        },
    },

    created() {
        this.fetch();
    },

    methods: {
        fetch() {
            this.loading = true;

            this.$axios.get(this.route('core.discussions.index'), {
                params: {
                    discussable_id: this.id,
                    discussable_type: this.type,
                },
            }).then(({ data }) => {
                this.discussions = data;
                this.$emit('update');
                this.loading = false;
            }).catch(this.errorHandler);
        },
        store() {
            this.$axios.post(this.route('core.discussions.store'), this.discussion)
                .then(({ data }) => {
                    this.discussion = data;
                    this.discussions.unshift(this.discussion);
                    this.$emit('update');
                    this.inputor = false;
                }).catch(this.errorHandler);
        },
        update() {
            this.$axios.patch(
                this.route('core.discussions.update', this.discussion.id),
                this.discussion,
            )
                .then(() => (this.inputor = false))
                .catch(this.errorHandler);
        },
        destroy() {
            this.$axios.delete(this.route('core.discussions.destroy', this.discussion.id))
                .then(() => {
                    const index = this.discussions.findIndex(({ id }) => id === this.discussion.id);
                    this.discussions.splice(index, 1);
                    this.$emit('update');
                    this.discussion = null;
                    this.fetch();
                }).catch(this.errorHandler);
        },
        factory() {
            return {
                id: null,
                discussable_id: this.id,
                discussable_type: this.type,
                title: null,
                body: null,
            };
        },
        containsQuery({ title, body }) {
            const query = this.query.toLowerCase();

            return title.toLowerCase().indexOf(query) >= 0
                || body.toLowerCase().indexOf(query) >= 0;
        },
    },
};
</script>

<style lang="scss">
    .discussions-wrapper {
        .header {
            border-bottom: 2px solid black;
            margin-bottom: 2rem;
            padding-top: 0.5em;
            padding-bottom: 0.5em;
        }

        .controls {
            display: flex;
            justify-content: center;
        }

        .discussions {
            max-height: 500px;
            overflow-y: auto;
        }
    }
</style>
