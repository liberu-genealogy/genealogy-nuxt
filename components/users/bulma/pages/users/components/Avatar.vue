<template>
    <figure class="image avatar"
        v-tooltip="label"
        :key="avatarKey">
        <img class="is-rounded"
            :src="link">
    </figure>
</template>

<script>
import 'v-tooltip/dist/v-tooltip.css';
import { VTooltip } from 'v-tooltip';
import { mapState } from 'vuex';

export default {
    name: 'Avatar',

    directives: { tooltip: VTooltip },

    inject: ['route'],

    props: {
        tooltip: {
            type: Boolean,
            default: false,
        },
        user: {
            type: Object,
            required: true,
        },
    },

    computed: {
        ...mapState(['avatarKey']),
        label() {
            return this.tooltip
                ? this.user.person?.appellative ?? this.user.person?.name
                : null;
        },
        link() {
            return this.route('core.avatars.show', this.user.avatar.id);
        },
    },
};
</script>

<style lang="scss">
    .avatar {
        margin: auto;
    }
</style>
