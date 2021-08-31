<template>
    <div class="is-flex avatar-list">
        <avatar class="image mr-1 mb-1"
            :class="isSmall ? 'is-24x24' : 'is-32x32'"
            v-for="user in users"
            :key="user.id"
            v-tooltip="user.name"
            :user="user"/>
    </div>
</template>

<script>
import { VTooltip } from 'v-tooltip';
import Avatar from '~/components/users/bulma/pages/users/components/Avatar.vue';

export default {
    name: 'AvatarList',

    directives: { tooltip: VTooltip },

    components: { Avatar },

    inject: ['route'],

    props: {
        users: {
            type: Array,
            required: true,
        },
        isSmall: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss">
    .avatar-list {
        margin-left: 1em;
        flex-flow: wrap;

        figure.avatar {
            margin: unset;
            transition: margin 0.2s;
            -webkit-transition: margin 0.2s;
            transition: transform .2s;
            -webkit-transition: transform 0.2s;
            margin-left: -1em;

            &:hover {
                margin-left: -0.5em;
                margin-right: 1em;
                transform: scale(1.3);
                z-index: 2;
            }

            img {
                border: 2px solid #f4f6fb;
                border-radius: 50%;

                &:hover {
                    border: none;
                }
            }
        }
    }
</style>
