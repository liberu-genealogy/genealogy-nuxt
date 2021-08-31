<template>
    <article class="media media-reply"
        :class="{'box has-background-light raises-on-hover': !edit && reply.id}"
        @mouseover="controls = true"
        @mouseleave="controls = !confirmation ? false : controls">
        <figure class="media-left">
            <p class="image is-48x48">
                <img class="is-rounded"
                    :src="avatar">
            </p>
        </figure>
        <div class="media-content">
            <inputor class="raises-on-hover animated fadeIn"
                :message="reply"
                placeholder="Share your opinion..."
                type="reply"
                @update="$emit('update'); edit = false;"
                @store="$emit('store')"
                @cancel="$emit('cancel'); edit = false;"
                v-if="edit || !reply.id"/>
            <div class="content" v-else>
                <span class="has-text-info is-bold">
                    {{ reply.owner.name }}
                </span>
                &bull;
                <small class="has-text-muted">
                    {{ timeFromNow(reply.updatedAt || reply.createdAt) }}
                </small>
                <span v-if="edited">
                    &bull;
                    <small class="has-text-muted">
                        {{ i18n('edited') }}
                    </small>
                </span>
                <br>
                <span v-html="format(reply.body)"/>
            </div>
        </div>
        <div class="media-right">
            <div class="is-flex is-pulled-right"
                v-if="controls && reply.isEditable && !edit">
                <a class="button is-naked is-small mr-1"
                    @click="edit = true">
                    <span class="icon is-small">
                        <fa icon="pencil-alt"/>
                    </span>
                </a>
                <confirmation placement="bottom-end"
                    @show="confirmation = true"
                    @hide="confirmation = controls = false"
                    @confirm="$emit('delete')">
                    <a class="button is-naked is-small">
                        <span class="icon is-small">
                            <fa icon="trash-alt"/>
                        </span>
                    </a>
                </confirmation>
            </div>
        </div>
    </article>
</template>

<script>

import Confirmation from '@enso-ui/confirmation/bulma';
import Inputor from './Inputor.vue';

export default {
    name: 'Reply',

    inject: ['i18n', 'route'],

    components: { Inputor, Confirmation },

    props: {
        reply: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        controls: false,
        confirmation: false,
        edit: false,
    }),

    computed: {
        avatar() {
            return this.route(
                'core.avatars.show',
                this.reply.owner.avatar.id,
            );
        },
        edited() {
            return this.reply.createdAt !== this.reply.updatedAt;
        },
    },

    methods: {
        timeFromNow(date) {
            return this.$formatDistance(date);
        },
        format(html) {
            return html.replace(/<p>/gm, '<p class="is-marginless">')
                .replace(/<h1>/gm, '<h1 class="is-marginless">')
                .replace(/<h2>/gm, '<h2 class="is-marginless">');
        },
    },
};
</script>

<style lang="scss">

    .media-reply {
        padding: 1rem;

        .mention {
            img {
                width: 1.4rem;
                height: 1.4rem;
                margin-bottom: -0.3rem;
                border-radius: 290486px;
            }
        }

    }
</style>
