<template>
    <div class="discussion-wrapper">
        <div class="box has-background-light raises-on-hover p-3"
            @mouseover="controls = true"
            @mouseleave="controls = !confirmation ? false : controls">
            <article class="media">
                <figure class="media-left">
                    <p class="image is-48x48">
                        <img class="is-rounded"
                            :src="avatar">
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                        <h4 class="title is-4 is-marginless">
                            {{ discussion.title }}
                        </h4>
                        <span class="has-text-info is-bold">
                            {{ discussion.owner.name }}
                        </span>
                        &bull;
                        <small class="has-text-muted">
                            {{ timeFromNow(discussion.updatedAt || discussion.createdAt) }}
                        </small>
                        <span v-if="edited">
                            &bull;
                            <small class="has-text-muted">
                                {{ i18n('edited') }}
                            </small>
                        </span>
                    </div>
                </div>
                <div class="media-right">
                    <div>
                        <a class="button is-small is-rounded"
                            @click="$emit('back')">
                            <span>
                                {{ i18n('Back') }}
                            </span>
                            <span class="icon is-small">
                                <fa icon="arrow-left"/>
                            </span>
                        </a>
                    </div>
                </div>
            </article>
            <div class="discussion-body p-2"
                v-html="discussion.body"/>
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <reactions class="mt-2"
                            :reactable="discussion"
                            type="discussion"/>
                    </div>
                </div>
                <div class="level-left">
                    <div class="level-item">
                        <div class="is-flex controls is-right"
                            v-if="controls && discussion.isEditable">
                            <a class="button is-naked is-small"
                                @click="$emit('edit')">
                                <span class="icon">
                                    <fa icon="pencil-alt"/>
                                </span>
                            </a>
                            <confirmation placement="top"
                                @show="confirmation = true"
                                @hide="confirmation = controls = false"
                                @confirm="$emit('delete')">
                                <a class="button is-naked is-small">
                                    <span class="icon">
                                        <fa icon="trash-alt"/>
                                    </span>
                                </a>
                            </confirmation>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h5 class="title is-5 is-flex">
            <span class="tag is-info is-rounded has-text-weight-bold">
                {{ discussion.replies.length }}
            </span>
            <span class="ml-2">
                {{ i18n('Replies') }}
            </span>
        </h5>
        <reply v-for="(re, index) in discussion.replies"
            :key="index"
            :reply="re"
            @delete="destroy(re, index)"
            @update="update(re, index)"/>
        <reply :reply="reply"
            @store="store()"
            @cancel="reply = null;"
            v-if="reply"/>
        <button class="button is-small is-rounded is-info"
            @click="reply = replyFactory()"
            v-else>
            <span>
                {{ i18n('Reply') }}
            </span>
            <span class="icon is-small">
                <fa icon="plus"/>
            </span>
        </button>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Confirmation from '@enso-ui/confirmation/bulma';
import Reply from './Reply.vue';
import Reactions from './Reactions.vue';

library.add(faArrowLeft, faTrashAlt, faPencilAlt);

export default {
    name: 'Discussion',

    components: { Reply, Reactions, Confirmation },

    inject: ['i18n', 'route'],

    props: {
        discussion: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        controls: false,
        confirmation: false,
        reply: null,
    }),

    computed: {
        ...mapState(['user']),
        avatar() {
            return this.route(
                'core.avatars.show',
                this.discussion.owner.avatar.id,
            );
        },
        edited() {
            return this.discussion.createdAt !== this.discussion.updatedAt;
        },
    },

    methods: {
        store() {
            this.$axios.post(this.route('core.discussions.storeReply'), this.reply)
                .then(({ data }) => {
                    this.discussion.replies.push(data);
                    this.reply = null;
                })
                .catch((error) => this.handleErorr(error));
        },
        update(reply, index) {
            this.$axios.patch(this.route('core.discussions.updateReply', reply.id), reply)
                .then(({ data }) => this.discussion.replies.splice(index, 1, data))
                .catch((error) => this.handleErorr(error));
        },
        destroy(reply, index) {
            this.$axios.delete(this.route('core.discussions.destroyReply', reply.id))
                .then(() => this.discussion.replies.splice(index, 1))
                .catch((error) => this.handleErorr(error));
        },
        timeFromNow(date) {
            return this.$formatDistance(date);
        },
        replyFactory() {
            return {
                discussion_id: this.discussion.id,
                body: null,
                owner: {
                    name: this.user.name,
                    avatar: {
                        id: this.user.avatar.id,
                    },
                },
            };
        },
    },
};
</script>

<style lang="scss">

    .discussion-wrapper {
        .controls.is-right {
            justify-content: flex-end;
        }

        .discussion-body {
            h1 {
                font-size: 2em;
            }

            h2 {
                font-size: 1.5em;
            }

            .ql-align-center {
                text-align: center;
            }

            ol, ul {
                padding-left: 3em;
            }

            img {
                width: 1.4rem;
                height: 1.4rem;
                margin-bottom: -0.3rem;
                border-radius: 290486px;
            }
        }
    }
</style>
