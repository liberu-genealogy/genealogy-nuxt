<template>
    <div class="box has-background-light p-3 raises-on-hover">
        <article class="media"
            @mouseover="controls = true"
            @mouseleave="controls = !confirmation ? false : controls">
            <figure class="media-left">
                <p class="image is-32x32">
                    <img class="is-rounded"
                        :src="route('core.avatars.show', comment.owner.avatar.id)">
                </p>
            </figure>
            <div class="media-content">
                <div class="mb-2"
                    v-if="!isNew">
                    <a>
                        <strong>{{ comment.owner.person.name }}</strong>
                    </a>
                    <span class="has-text-muted"
                        v-tooltip="dateFormat(commentedAt)"
                        v-if="humanReadableDates">
                        {{ timeFromNow(commentedAt) }} {{ i18n('ago') }}
                    </span>
                    <span class="has-text-muted"
                        v-tooltip="`${timeFromNow(commentedAt)} ${i18n('ago')}`"
                        v-else>
                        {{ dateFormat(commentedAt) }}
                    </span>
                    <span v-if="comment.createdAt !== comment.updatedAt">
                        &bull; {{ i18n('edited') }}
                    </span>
                    <div class="is-pulled-right is-flex"
                        v-if="!isNew && !isEditing && controls">
                        <a class="button is-naked is-small mr-1"
                            @click="originalBody = comment.body;"
                            v-if="comment.isEditable">
                            <span class="icon is-small">
                                <fa icon="pencil-alt"/>
                            </span>
                        </a>
                        <confirmation placement="bottom-end"
                            @confirm="$emit('delete')"
                            @show="confirmation = true"
                            @hide="confirmation = controls = false"
                            v-if="comment.isDeletable">
                            <a class="button is-naked is-small"
                                @click="confirmation = true">
                                <span class="icon is-small">
                                    <fa icon="trash-alt"/>
                                </span>
                            </a>
                        </confirmation>
                    </div>
                </div>
                <div class="comment-body"
                    v-html="highlightTaggedUsers"
                    v-if="!isEditing && !isNew"/>
                <div v-else>
                    <inputor :comment="comment"
                        v-on="$listeners"/>
                    <div class="mt-2 has-text-right">
                        <a class="button is-rounded is-bold mr-1 is-small action"
                            @click="isNew ? $emit('cancel-add') : cancelAdd()">
                            <span>
                                {{ i18n('Cancel') }}
                            </span>
                            <span class="icon is-small">
                                <fa icon="ban"/>
                            </span>
                        </a>
                        <a v-tooltip.right="{
                                content: i18n('Shift + Enter to post'),
                                delay: 800
                            }"
                            class="button is-rounded is-bold is-success is-small action"
                            @click="isNew ? $emit('save') : update()">
                            <span v-if="isNew">
                                {{ i18n('Post') }}
                            </span>
                            <span v-else>
                                {{ i18n('Update') }}
                            </span>
                            <span class="icon is-small">
                                <fa icon="check"/>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faPencilAlt, faTrashAlt, faCheck, faBan,
} from '@fortawesome/free-solid-svg-icons';
import Confirmation from '@enso-ui/confirmation/bulma';
import Inputor from './Inputor.vue';

library.add(faPencilAlt, faTrashAlt, faCheck, faBan);

export default {
    name: 'Comment',

    directives: { tooltip: VTooltip },

    components: { Inputor, Confirmation },

    inject: ['i18n', 'route'],

    props: {
        comment: {
            type: Object,
            required: true,
        },
        humanReadableDates: {
            type: Boolean,
            default: true,
        },
        index: {
            type: Number,
            default: null,
        },
        isNew: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        controls: false,
        confirmation: false,
        originalBody: null,
    }),

    computed: {
        ...mapState(['meta', 'user']),
        highlightTaggedUsers() {
            let { body } = this.comment;

            this.comment.taggedUsers
                .forEach(({ name }) => {
                    const highlighted = `${'<span class="has-text-info">@'}${name}</span>`;
                    body = body.replace(`@${name}`, highlighted);
                });

            return body;
        },
        isEditing() {
            return this.originalBody !== null;
        },
        commentedAt() {
            return this.comment.updatedAt || this.comment.createdAt;
        },
    },

    methods: {
        cancelAdd() {
            this.comment.body = this.originalBody;
            this.controls = false;
            this.originalBody = null;
            this.$emit('cancel-edit');
        },
        update() {
            if (!this.comment.body.trim()) {
                return;
            }

            this.controls = false;

            if (this.comment.body === this.originalBody) {
                this.originalBody = null;
                return;
            }

            this.$emit('save');

            this.originalBody = null;
        },
        timeFromNow(date) {
            return this.$formatDistance(date);
        },
        dateFormat(date) {
            return this.$format(date, `${this.meta.dateFormat} H:i`);
        },
    },
};
</script>

<style lang="scss">
    .media {
        border-radius: inherit;
        .comment-body {
            word-break: break-all;
        }

        .media-content {
            overflow: unset;
        }
    }
</style>
