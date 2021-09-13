<template>
    <article class="media clickable">
        <figure class="media-left">
            <p class="image is-48x48">
                <img class="is-rounded"
                    :src="avatar">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <span class="has-text-weight-semibold">
                        {{ discussion.title }}
                    </span>
                <p class="preview">
                    <span class="has-text-info is-bold">
                        {{ discussion.owner.name }}
                    </span>
                    &bull;
                    <small class="has-text-muted">
                        {{ timeFromNow(discussion.updatedAt || discussion.createdAt) }}
                    </small>
                    &bull;
                    {{ body }}
                </p>
            </div>
        </div>
        <div class="media-right">
            <span class="tag is-info has-text-weight-bold is-rounded">
                {{ discussion.replies.length }}
            </span>
        </div>
    </article>
</template>

<script>
export default {
    name: 'DiscussionPreview',

    inject: ['route'],

    props: {
        discussion: {
            type: Object,
            required: true,
        },
        last: {
            type: Boolean,
            required: true,
        },
    },

    computed: {
        avatar() {
            return this.route(
                'core.avatars.show',
                this.discussion.owner.avatar.id || 'null',
            );
        },
        body() {
            const div = document.createElement('div');
            div.innerHTML = this.discussion.body;
            return div.textContent || div.innerText || '';
        },
    },

    methods: {
        timeFromNow(date) {
            return this.$formatDistance(date);
        },
    },
};
</script>

<style lang="scss">
    .media .preview {
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 3rem;
    }
</style>
