<template>
    <figure class="image avatar"
        v-tooltip="tooltip">
        <img class="is-rounded"
            :src="route('core.avatars.show', user.avatar.id)">
    </figure>
</template>

<script setup>
import { VTooltip } from 'v-tooltip';


    name: 'Avatar';

    directives: { tooltip: VTooltip };

    inject: ['route'];

    props: {
        user: {
            type: Object;
            required: true;
        };
    };

   const computed = {
        tooltip() {
            return this.user.person?.appellative
                ?? this.user.person?.name;
        }
    };
</script>

<style lang="scss">
    .avatar {
        margin: auto;
    }
</style>
