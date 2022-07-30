<template>    
    <a class="button is-naked"
        @click="$emit('selected')">
        <span class="icon">
            <fa :icon="folder.icon"
                size="sm"/>
        </span>
        <span>
            {{ i18n(folder.name) }}
        </span>
    </a>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';

export default {
    name: 'Folder',

    components: { Fa },

    inject: ['i18n'],

    props: {
        folder: {
            type: Object,
            required: true,
        },
    },

    emits: ['selected'],
}
</script>