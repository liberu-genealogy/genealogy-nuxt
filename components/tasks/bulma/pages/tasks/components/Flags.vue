<template>
    <div class="flags">
        <div class="vue-filter">
            <div class="tabs-wrapper">
                <div class="tabs is-toggle is-fullwidth filter-tabs">
                    <ul>
                        <li v-for="(flag, id) in enums.flags._all()"
                            :key="id"
                            :class="{ 'is-active': id === `${modelValue}` }">
                            <a @click="$emit('update:modelValue', id)">
                                <span class="icon"
                                    :class="`has-text-${flag.toLowerCase()}`">
                                    <fa icon="flag"/>
                                </span>
                            </a>
                        </li>
                        <li :class="{ 'is-active': !modelValue }">
                            <a @click="$emit('update:modelValue', null)">
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
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFlag, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faFlag, faTimes);

export default {
    name: 'Flags',

    components: { Fa },

    props: {
        modelValue: {
            type: [Number, String],
            required: false,
            default: null,
        },
    },

    emits: ['update:modelValue'],

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
