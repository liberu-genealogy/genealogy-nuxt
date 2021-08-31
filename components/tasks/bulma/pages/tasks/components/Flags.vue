<template>
    <div class="flags">
        <div class="vue-filter">
            <div class="tabs-wrapper">
                <div class="tabs is-toggle is-fullwidth filter-tabs">
                    <ul>
                        <li v-for="(flag, id) in enums.flags._all()"
                            :key="id"
                            :class="{ 'is-active': id === `${value}` }">
                            <a @click="$emit('input', id)">
                                <span class="icon"
                                    :class="`has-text-${flag.toLowerCase()}`">
                                    <fa icon="flag"/>
                                </span>
                            </a>
                        </li>
                        <li :class="{ 'is-active': !value }">
                            <a @click="$emit('input', null)">
                                <span class="icon has-text-black">
                                    <fa icon="times"/>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { faFlag, faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faFlag, faTimes);

export default {
    name: 'Flags',

    props: {
        value: {
            type: [Number, String],
            required: false,
            default: null,
        },
    },

    computed: mapState(['enums']),
};
</script>
<style lang="scss">
.flags {
    .tabs-wrapper {
        padding: 0;
    }
}
</style>
