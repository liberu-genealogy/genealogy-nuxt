<template>
    <article class="media box has-background-light p-2 raises-on-hover">
        <figure class="media-left mt-1">
            <p class="image is-32x32">
                <img class="is-rounded is-clickable"
                    :src="route('core.avatars.show', event.owner.avatar.id)"
                    @click="$router.push({
                        name: 'administration.users.show',
                        params: { user: event.owner.id },
                    })">
            </p>
        </figure>
        <div class="event">
            <p class="heading">
                {{ event.time }}
            </p>
            <p v-html="message"/>
        </div>
    </article>
</template>

<script>
import { ref, computed, useStore } from 'vue';
export default {
    name: 'Event',
    inject: ['i18n', 'route', 'routerErrorHandler'],
    props: {
        event: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const message = computed(() => {
            return Object.keys(this.event.meta.attributes)
                .reduce((message, attribute) => message.split(`:${attribute}`)
                    .join(this.label(attribute)),
                this.parsedMessage);
        })
        const parsedMessage = computed(() => {
            return Array.isArray(this.event.meta.message)
                ? this.event.meta.message
                    .map((segment) => this.i18n(segment))
                    .join(' ')
                : this.event.meta.message;
        })
        function label(attribute) {
            const { attributes } = this.event.meta;
            return ['user', 'label'].includes(attribute)
                ? `<strong>${attributes[attribute]}</strong>`
                : attributes[attribute];
        }
    }
};
</script>