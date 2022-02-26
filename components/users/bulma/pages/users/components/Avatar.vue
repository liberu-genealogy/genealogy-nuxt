<template>
    <figure class="image avatar"
        v-tooltip="tooltip">
        <img class="is-rounded"
            :src="route('core.avatars.show', user.avatar.id)">
    </figure>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import { ref, computed, useStore } from 'vue';

export default {
    name: 'Avatar',

    directives: { tooltip: VTooltip },

    inject: ['route'],

    props: {
        user: {
            type: Object,
            required: true,
        },
    },

    setup() {
        const tooltip = computed(() => {
            return this.user.person?appellative:''||this.user.person?name:''
            // return this.user.person?.appellative
            //     ?? this.user.person?.name;
        })
    }
};
</script>

<style lang="scss">
    .avatar {
        margin: auto;
    }
</style>
